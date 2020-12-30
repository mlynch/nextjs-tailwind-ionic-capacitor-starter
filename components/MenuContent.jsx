import useLocation from '../hooks/useLocation';
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
  const [location, setLocation] = useLocation();

  const go = page => {
    actions.setMenuOpen(false);
    setLocation(page);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl select-none dark:text-gray-500">Menu</h2>
      </div>
      <ul>
        <MenuItem onClick={() => go('/')}>Home</MenuItem>
        <MenuItem onClick={() => go('/lists')}>Lists</MenuItem>
        <MenuItem onClick={() => go('/settings')}>Settings</MenuItem>
      </ul>
    </>
  );
};

export default MenuContent;
