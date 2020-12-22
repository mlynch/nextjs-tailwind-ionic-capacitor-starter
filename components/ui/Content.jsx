import classNames from 'classnames';

const Content = ({ className, visible, children, ...props }) => (
  <div
    {...props}
    className={classNames(`h-full w-full overflow-auto py-2 absolute top-0`, className, {
      visible,
      invisible: !visible,
    })}
  >
    {children}
  </div>
);

export default Content;
