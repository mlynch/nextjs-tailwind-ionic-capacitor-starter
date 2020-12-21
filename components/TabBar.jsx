const TabBar = ({ children }) => (
  
  <nav id="tab-bar" className="h-16 bg-white fixed bottom-0 w-full flex justify-center items-center bg-gray-50">
    {children}
  </nav>
  
)

export default TabBar;