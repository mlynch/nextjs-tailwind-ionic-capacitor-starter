const TabBar = ({ children }) => (
  <nav
    id="tab-bar"
    className="py-2 h-16 bg-white bottom-0 w-full flex justify-center items-start bg-gray-50"
    style={{
      height: `calc(env(safe-area-inset-bottom, 0px) + 56px)`
    }}>
    {children}
  </nav>
)

export default TabBar;