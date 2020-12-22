import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

const Backdrop = ({ open, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={classNames('fixed z-10 inset-0 bg-black transition-opacity w-full h-full', {
        'pointer-events-none': !open,
        'opacity-10': open,
        'opacity-0': !open,
      })}
    ></div>
  );
};

export default Backdrop;
