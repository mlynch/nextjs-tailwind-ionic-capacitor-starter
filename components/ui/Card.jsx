import classNames from 'classnames';

const Card = ({ children, className, ...props }) => (
  <div {...props} className={classNames('m-auto px-4 py-4 max-w-xl', className)}>
    <div className="bg-white shadow-md rounded-b-xl">{children}</div>
  </div>
);

export default Card;
