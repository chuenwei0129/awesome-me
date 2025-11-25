import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type QueryStatus = 'loading' | 'success' | 'error';

interface QueryResult<TData> {
  status: QueryStatus;
  data?: TData;
  error?: any;
}

class Observer<TData> {
  private queryClient: QueryClient;
  private queryKey: string;
  private onChange: () => void;

  constructor(queryClient: QueryClient, queryKey: string, onChange: () => void) {
    this.queryClient = queryClient;
    this.queryKey = queryKey;
    this.onChange = onChange;
    this.subscribe();
  }

  subscribe() {
    this.queryClient.subscribe(this.queryKey, this.onChange);
  }

  unsubscribe() {
    this.queryClient.unsubscribe(this.queryKey, this.onChange);
  }
}

class QueryClient {
  private queries: Record<string, QueryResult<any>>;
  private subscribers: Record<string, Array<() => void>>;

  constructor() {
    this.queries = {};
    this.subscribers = {};
  }

  fetchQuery<TData>(queryKey: string, queryFn: () => Promise<TData>): QueryResult<TData> {
    if (!this.queries[queryKey]) {
      this.queries[queryKey] = { status: 'loading' };
      queryFn().then(
        (data) => {
          this.queries[queryKey] = { status: 'success', data };
          this.notify(queryKey);
        },
        (error) => {
          this.queries[queryKey] = { status: 'error', error };
          this.notify(queryKey);
        },
      );
    }

    return this.queries[queryKey];
  }

  subscribe(queryKey: string, onChange: () => void) {
    if (!this.subscribers[queryKey]) {
      this.subscribers[queryKey] = [];
    }
    this.subscribers[queryKey].push(onChange);
  }

  unsubscribe(queryKey: string, onChange: () => void) {
    this.subscribers[queryKey] = this.subscribers[queryKey].filter((sub) => sub !== onChange);
  }

  private notify(queryKey: string) {
    if (this.subscribers[queryKey]) {
      this.subscribers[queryKey].forEach((onChange) => onChange());
    }
  }
}

// Context 以便在组件中访问 QueryClient
const QueryClientContext = createContext<QueryClient | undefined>(undefined);

interface QueryClientProviderProps {
  client: QueryClient;
  children: ReactNode;
}

export function QueryClientProvider({ client, children }: QueryClientProviderProps) {
  return <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>;
}

export function useQuery<TData>(queryKey: string, queryFn: () => Promise<TData>): QueryResult<TData> {
  const queryClient = useContext(QueryClientContext);
  const [, forceUpdate] = useState(0);

  if (!queryClient) {
    throw new Error('useQuery must be used within a QueryClientProvider');
  }

  useEffect(() => {
    const observer = new Observer(queryClient, queryKey, () => forceUpdate((x) => x + 1));
    return () => observer.unsubscribe();
  }, [queryClient, queryKey]);

  return queryClient.fetchQuery(queryKey, queryFn);
}
