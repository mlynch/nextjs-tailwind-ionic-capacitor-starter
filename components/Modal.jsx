import classNames from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';

const Modal = ({ open, onClose, children }) => {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState(null);
  const [y, setY] = useState(100000);
  const [safeAreaTop, setSafeAreaTop] = useState(0);

  const _open = useCallback(() => {
    setY(safeAreaTop);
  }, [safeAreaTop]);

  const _close = useCallback(() => {
    if (!rect) {
      return;
    }
    setY(rect.height + safeAreaTop);
  }, [safeAreaTop, rect]);

  // Get pixel value of safe area insets
  useEffect(() => {
    const safeAreaTop = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top')
    );
    setSafeAreaTop(safeAreaTop);
  }, []);

  // Get the layout rectangle for the modal
  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    setRect(rect);
    _close();
  }, []);

  // If open changes, open/close the modal
  useLayoutEffect(() => {
    if (open) {
      _open();
    } else {
      _close();
    }
  }, [rect, open, _open, _close]);

  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      setY(my < 0 ? safeAreaTop : my + safeAreaTop);

      if (down) {
        setDragging(true);
      } else {
        setDragging(false);
      }

      // If the drag ended, snap the menu back open or close it
      if (!down) {
        const mid = rect.height;
        if (y > mid / 2) {
          // Close
          _close();
          onClose();
        } else {
          // Re-open
          _open();
        }
      }
    },
    {
      axis: 'y',
    }
  );

  return (
    <div
      ref={ref}
      {...bind()}
      className={classNames(
        'fixed z-40 top-5 transform transform-gpu ranslate w-full h-full bg-white rounded-t-xl',
        {
          'ease-in-out duration-300 transition-transformation': !dragging,
        }
      )}
      style={{
        height: `calc(100% - env(safe-area-inset-top, 0px) - 1.25rem)`,
        touchAction: 'pan-y',
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
