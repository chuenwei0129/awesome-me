import React from 'react';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
