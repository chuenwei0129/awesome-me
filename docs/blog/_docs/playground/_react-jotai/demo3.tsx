import React from 'react';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
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
