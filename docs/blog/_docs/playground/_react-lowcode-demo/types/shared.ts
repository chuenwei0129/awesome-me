import { PropsWithChildren } from 'react';

export interface Component {
  id: number;
  name: string;
  props: unknown;
  children?: Component[];
  parentId?: number;
}

// component 名字和 Component 实例的映射。
export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, unknown>;
  component: any;
}

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  [key: string]: any;
}
