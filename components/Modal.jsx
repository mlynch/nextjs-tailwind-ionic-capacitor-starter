import classNames from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';

const Modal = ({ open, onClose, children }) => {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [rect, setRect] = useState(null);
  const [y, setY] = useState(100000);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    setRect(rect);
    setY(-rect.width);
  }, []);

  useLayoutEffect(() => {
    if (open) {
      setY(0);
    } else if (rect) {
      setY(rect.height);
    }
  }, [rect, open]);

  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      setY(my < 0 ? 0 : my);

      if (down) {
        setDragging(true);
      } else {
        setDragging(false);
      }

      // If the drag ended, snap the menu back
      if (!down) {
        const mid = rect.height;
        if (y > mid / 2) {
          // Close
          setY(rect.height);
          onClose();
        } else {
          // Re-open
          setY(0);
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
        'fixed z-40 top-5 transform transform-gpu translate w-full h-full bg-white rounded-t-lg',
        {
          'transition-transform': !dragging,
        }
      )}
      style={{
        height: `calc(100% - 1.25rem)`,
        touchAction: 'pan-y',
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
