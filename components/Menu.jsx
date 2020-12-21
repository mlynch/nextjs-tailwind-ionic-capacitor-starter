import classNames from 'classnames';

const Menu = ({ open, onClose }) => (
  <div
    className={classNames(
      'fixed z-40 transform transform-gpu translate w-48 h-full bg-gray-100 transition-transform',
      {
        '-translate-x-full': !open,
        '-translate-x-0': open,
      }
    )}
  >
    <div className="p-4">
      <h2 className="text-xl select-none">Menu</h2>
    </div>
    <ul>
      <li>
        <a
          href="#"
          className="text-gray-800 hover:text-gray-400 block px-4 py-2 rounded-md text-base font-medium"
        >
          Calendar
        </a>
      </li>
    </ul>
  </div>
);

export default Menu;
