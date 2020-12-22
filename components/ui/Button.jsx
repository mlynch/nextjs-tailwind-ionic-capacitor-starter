import classNames from 'classnames';

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={classNames(
      'inline-block text-xs font-medium leading-6 text-center uppercase transition rounded-lg ripple focus:outline-none',
      className
    )}
  >
    {children}
  </button>
);

export default Button;
