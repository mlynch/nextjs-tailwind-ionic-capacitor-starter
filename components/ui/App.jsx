import classNames from 'classnames';
import { Plugins } from '@capacitor/core';
import { useEffect, useState } from 'react';

const { DarkMode } = Plugins;

const App = ({ children, className, ...props }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(async () => {
    try {
      let darkmodeConfig = await DarkMode.isDarkModeOn();
      setDarkMode(darkmodeConfig.isDarkModeOn);
      DarkMode.addListener('darkModeStateChanged', state => {
        setDarkMode(state.isDarkModeOn);
      });
    } catch (e) {}
  }, []);

  return (
    <div
      {...props}
      className={classNames('flex h-screen flex-col', className, {
        dark: darkMode,
      })}
    >
      {children}
    </div>
  );
};

export default App;
