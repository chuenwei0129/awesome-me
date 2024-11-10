// 测试 context 自动优化

import React, { ReactNode, createContext, useContext, useReducer } from 'react';

type StateType = {
  firstName: string;
  familyName: string;
};

type ActionType = { type: 'setFirstName'; firstName: string } | { type: 'setFamilyName'; familyName: string };

const initialState: StateType = {
  firstName: '',
  familyName: '',
};

const personReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      return state;
  }
};

const PersonContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return <PersonContext.Provider value={{ state, dispatch }}>{children}</PersonContext.Provider>;
};

const PersonFirstName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  console.log('PersonFirstName rendered');

  return (
    <div>
      First Name:
      <input value={state.firstName} onChange={(event) => dispatch({ type: 'setFirstName', firstName: event.target.value })} />
    </div>
  );
};

const PersonFamilyName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  console.log('PersonFamilyName rendered');

  return (
    <div className="container">
      Family Name:
      <input value={state.familyName} onChange={(event) => dispatch({ type: 'setFamilyName', familyName: event.target.value })} />
    </div>
  );
};

const Greeting: React.FC = () => {
  const { state } = useContext(PersonContext);

  console.log('Greeting rendered');

  return (
    <h2>
      Hi, {state.firstName} {state.familyName}!
    </h2>
  );
};

const App: React.FC = () => (
  <PersonProvider>
    <PersonFirstName />
    <PersonFamilyName />
    <Greeting />
  </PersonProvider>
);

export default App;
