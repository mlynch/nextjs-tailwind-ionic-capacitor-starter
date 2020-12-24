import classNames from 'classnames';

const PageStack = ({ children, className, ...props }) => (
  <div {...props} className={classNames('flex-1 z-0 overflow-hidden relative', className)}>
    {children}
  </div>
);

export default PageStack;
