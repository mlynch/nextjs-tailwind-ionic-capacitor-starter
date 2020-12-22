import { createContext, useEffect, useState } from 'react';

export const SafeAreaContext = createContext({ top: 0, bottom: 0 });

export const SafeAreaProvider = ({ children }) => {
  const [safeAreaTop, setSafeAreaTop] = useState(0);
  const [safeAreaBottom, setSafeAreaBottom] = useState(0);

  useEffect(() => {
    // I don't know why, but we can't get the value of this CSS variable
    // until a bit of a delay, maybe something with Next?
    setTimeout(() => {
      const safeAreaTop = parseInt(
        window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top')
      );
      const safeAreaBottom = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-bottom');

      setSafeAreaTop(safeAreaTop);
      setSafeAreaBottom(safeAreaBottom);
    }, 500);
  }, []);

  return (
    <SafeAreaContext.Provider value={{ top: safeAreaTop, bottom: safeAreaBottom }}>
      {children}
    </SafeAreaContext.Provider>
  );
};
