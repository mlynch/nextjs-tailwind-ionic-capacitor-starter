import classNames from 'classnames';
import Icon from './Icon';

const Tab = ({ title, icon, selected, selectedIcon, onClick }) => (
  <a
    onClick={onClick}
    href="#"
    className={classNames('px-6 rounded-md text-sm text-center font-medium cursor-pointer', {
      'text-gray-500 dark:text-white': !selected,
      'text-gray-800 dark:text-gray-600': selected,
    })}
  >
    {icon && (
      <Icon
        icon={selected ? selectedIcon : icon}
        className="cursor-pointer"
        style={{ fontSize: '18px' }}
      />
    )}
    <label className="block cursor-pointer">{title}</label>
  </a>
);

export default Tab;
