import classNames from 'classnames';

const Content = ({ className, visible, children }) => (
  <div className={classNames(`h-full overflow-auto py-2 absolute top-0`, className, {
    visible,
    invisible: !visible
  })}>
    {children}
  </div>
);

export default Content;