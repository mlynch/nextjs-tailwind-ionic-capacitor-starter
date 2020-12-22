import classNames from 'classnames';

const App = ({ children, className, ...props }) => (
  <div {...props} className={classNames('flex h-screen flex-col', className)}>
    {children}
  </div>
);

export default App;
