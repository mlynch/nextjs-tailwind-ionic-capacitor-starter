import classNames from 'classnames';

import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const PageStack = ({ children, className, ...props }) => (
  <div {...props} className={classNames('flex-1 z-0 overflow-hidden relative', className)}>
    <Transition in={true} duration={duration}>
      {state => (
        <div
          className="w-full h-full"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  </div>
);

export default PageStack;
