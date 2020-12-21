import classNames from 'classnames';

const Tab = ({ title, icon, selected, selectedIcon, onClick }) => (
  <a onClick={onClick} href="#" className={classNames('px-6 rounded-md text-sm text-center font-medium cursor-pointer', {
    'text-gray-500': !selected,
    'text-gray-800': selected
  })}>
    {icon && <ion-icon name={selected ? selectedIcon : icon } className="cursor-pointer" style={{ fontSize: '18px' }}/>}
    <label className="block cursor-pointer">{title}</label>
  </a>
)

export default Tab;