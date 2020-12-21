const Content = ({ className, children }) => (
  <div
  className={`${className} flex-1 overflow-auto"`}
  style={{
    paddingTop: `calc(env(safe-area-inset-top, 0px) + 16px)`, // Care for the notch
  }}>
    {children}
  </div>
);

export default Content;