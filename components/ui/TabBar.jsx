const TabBar = ({ children }) => (
  <nav
    id="tab-bar"
    className="py-2 h-16 w-full flex justify-center items-start bg-gray-50 z-10 dark:bg-gray-800"
    style={{
      height: `calc(env(safe-area-inset-bottom, 0px) + 56px)`,
    }}
  >
    {children}
  </nav>
);

export default TabBar;
