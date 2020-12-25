import classNames from 'classnames';

const Card = ({ children, className, ...props }) => (
  <div {...props} className={classNames('max-w-xl', className)}>
    <div className="bg-white shadow-md rounded-b-xl dark:bg-black">{children}</div>
  </div>
);

export default Card;
