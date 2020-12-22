import { Plugins } from '@capacitor/core';
import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDrag } from 'react-use-gesture';

const Menu = ({ open, onClose, children, className, ...props }) => {
  const ref = useRef();
  const [x, setX] = useState(-100000);
  const [rect, setRect] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (open) {
      Plugins.StatusBar.setStyle({
        style: 'LIGHT',
      }).catch(() => {});
    } else {
      Plugins.StatusBar.setStyle({
        style: 'DARK',
      }).catch(() => {});
    }
  }, [open]);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    setRect(rect);
    setX(-rect.width);
  }, []);

  useLayoutEffect(() => {
    if (open) {
      setX(0);
    } else if (rect) {
      setX(-rect.width);
    }
  }, [rect, open]);

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      setX(mx > 0 ? 0 : mx);

      if (down) {
        setDragging(true);
      } else {
        setDragging(false);
      }

      // If the drag ended, snap the menu back
      if (!down) {
        const mid = -rect.width;
        if (x < mid / 2) {
          // Close
          setX(-rect.width);
          onClose();
        } else {
          // Re-open
          setX(0);
        }
      }
    },
    {
      axis: 'x',
    }
  );

  return (
    <div
      {...props}
      {...bind()}
      ref={ref}
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 8px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 8px)`,
        touchAction: 'pan-x',
        transform: `translateX(${x}px)`,
      }}
      className={classNames(
        'fixed z-40 transform transform-gpu translate w-48 h-full bg-gray-100',
        className,
        {
          'transition-transform': !dragging,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
