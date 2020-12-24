import Store from '../store';

const MenuItem = ({ children, ...props }) => (
  <li {...props}>
    <a
      href="#"
      className="text-gray-800 hover:text-gray-400 block px-4 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  </li>
);

const MenuContent = () => {
  const pages = Store.useState(s => s.pages);

  const go = page => {
    Store.update(s => {
      console.log('Going to', page);
      s.currentPage = page;
      s.showMenu = false;
    });
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl select-none">Menu</h2>
      </div>
      <ul>
        {pages.map(p => (
          <MenuItem key={p.id} onClick={() => go(p)}>
            {p.title}
          </MenuItem>
        ))}
      </ul>
    </>
  );
};

export default MenuContent;
