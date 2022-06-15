import React, { useState, useEffect } from 'react';

function ThemeChanger() {
  const [themeState, setThemeState] = useState(false);

  const handleChange = () => {
    setThemeState(!themeState);
    if (themeState) {
      localStorage.setItem('Theme', 'light');
      document.body.classList.remove('dark-mode');
    } else {
      localStorage.setItem('Theme', 'dark');
      document.body.classList.add('dark-mode');
    }
  };
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme');
    if (getTheme === 'dark') return document.body.classList.add('dark-mode');
    return document.body.classList.remove('dark-mode');
  });
  return (
    <div>
      <button onClick={handleChange}>{themeState ? 'Light Mode' : 'Dark Mode'}</button>
    </div>
  );
}

export default ThemeChanger;
