import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDrag } from 'react-use-gesture';

const Menu = ({ open, onClose, children }) => {
  const ref = useRef();
  const [x, setX] = useState(-100000);
  const [rect, setRect] = useState(null);

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

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    setX(mx > 0 ? 0 : mx);

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
  });

  return (
    <div
      {...bind()}
      ref={ref}
      style={{
        transform: `translateX(${x}px)`,
      }}
      className={classNames(
        'fixed z-40 transform transform-gpu translate w-48 h-full bg-gray-100 transition-transform',
        {
          '-translate-x-full': !open,
          '-translate-x-0': open,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
