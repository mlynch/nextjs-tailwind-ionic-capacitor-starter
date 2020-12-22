import classNames from 'classnames';
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import Store from '../../store';
import { SafeAreaContext } from './SafeArea';

// A Modal window that slides in from offscreen and can be closed
// by dragging.
const Modal = ({ open, onClose, children }) => {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState(null);
  const [y, setY] = useState(100000);

  const { top: safeAreaTop } = useContext(SafeAreaContext);

  const _open = useCallback(() => {
    setY(safeAreaTop);
  }, [safeAreaTop]);

  const _close = useCallback(() => {
    if (!rect) {
      return;
    }
    setY(rect.height + safeAreaTop);
  }, [safeAreaTop, rect]);

  // Get the layout rectangle for the modal
  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    setRect(rect);
    _close();
  }, [safeAreaTop]);

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
        'fixed z-40 top-5 transform transform-gpu w-full h-full bg-white rounded-t-xl',
        {
          'ease-in-out duration-300 transition-transformation': !dragging,
        }
      )}
      style={{
        '--safe-area-top': `env(safe-area-inset-top, 0px)`,
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
