import classNames from 'classnames';

const ListItem = ({ children, className, ...props }) => (
  <div className={classNames('p-4', className)} {...props}>
    {children}
  </div>
);

export default ListItem;
