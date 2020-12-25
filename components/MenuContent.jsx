import Store from '../store';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

const MenuItem = ({ children, ...props }) => (
  <li {...props}>
    <a
      href="#"
      className="text-gray-800 hover:text-gray-400 dark:text-gray-400 block px-4 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  </li>
);

const MenuContent = () => {
  const menuLinks = Store.useState(selectors.getMenuLinks);

  const go = page => {
    actions.setPage(page);
    actions.setMenuOpen(false);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl select-none dark:text-gray-500">Menu</h2>
      </div>
      <ul>
        {menuLinks.map(p => {
          const title = typeof p.title === 'function' ? p.title() : p.title;

          return (
            <MenuItem key={p.id} onClick={() => go(p)}>
              {title}
            </MenuItem>
          );
        })}
      </ul>
    </>
  );
};

export default MenuContent;
