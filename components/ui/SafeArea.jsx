import { createContext, useEffect, useState } from 'react';

export const SafeAreaContext = createContext({ top: 0, bottom: 0 });

// This provider reads and stores the computed safe area
// on devices with notches/etc. (iPhone X, for example)
//
// This is done by reading the CSS Properties --safe-area-top and --safe-area-bottom
// and then storing them as state values.
//
// These values are useful for JS-driven interactions, such as a modal that
// will drag in and out but needs to offset for the safe region.
export const SafeAreaProvider = ({ children }) => {
  const [safeArea, setSafeArea] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    // I don't know why, but we can't get the value of this CSS variable
    // until a bit of a delay, maybe something with Next?
    setTimeout(() => {
      const safeAreaTop = parseInt(
        window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top')
      );
      const safeAreaBottom = parseInt(
        window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-bottom')
      );
      const safeAreaLeft = parseInt(
        window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-left')
      );
      const safeAreaRight = parseInt(
        window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-right')
      );

      setSafeArea({
        top: safeAreaTop,
        right: safeAreaRight,
        bottom: safeAreaBottom,
        left: safeAreaLeft,
      });
    }, 500);
  }, []);

  return <SafeAreaContext.Provider value={safeArea}>{children}</SafeAreaContext.Provider>;
};
