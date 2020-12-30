import classNames from 'classnames';

const Content = ({ className, children, ...props }) => (
  <div
    {...props}
    className={classNames(`h-full w-full overflow-auto py-2 absolute top-0`, className)}
  >
    {children}
  </div>
);

export default Content;
