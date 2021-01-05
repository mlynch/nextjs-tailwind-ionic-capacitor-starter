import classNames from 'classnames';
import Icon from './Icon';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

const Tab = ({ title, href, icon, selected, selectedIcon, onClick }) => {
  return (
    <Link href={href}>
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
    </Link>
  );
};

export default Tab;
