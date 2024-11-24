import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import React from 'react';

const darkModeAtom = atomWithStorage('darkModeJotai', false);

const App = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
      <button type="button" onClick={toggleDarkMode}>
        toggle theme
      </button>
    </>
  );
};
export default App;
