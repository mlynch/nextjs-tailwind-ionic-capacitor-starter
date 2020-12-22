import { useCallback, useState } from 'react';

import App from '../components/App';
import Backdrop from '../components/Backdrop';
import Menu from '../components/Menu';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import Settings from '../components/pages/Settings';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';
import Store from '../store';

const pages = [
  { id: 'home', title: 'Home', icon: 'home-outline', selectedIcon: 'home', component: Home },
  {
    id: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    selectedIcon: 'person',
    component: Profile,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'cog-outline',
    selectedIcon: 'cog',
    component: Settings,
  },
];

const CurrentPage = ({ page }) => {
  return (
    <div className="flex-1 overflow-hidden relative">
      {pages.map(p => {
        const Page = p.component;
        return <Page selected={page.id === p.id} />;
      })}
    </div>
  );
};

const MenuItem = ({ children }) => (
  <li>
    <a
      href="#"
      className="text-gray-800 hover:text-gray-400 block px-4 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  </li>
);
const MenuContent = () => (
  <>
    <div className="p-4">
      <h2 className="text-xl select-none">Menu</h2>
    </div>
    <ul>
      <MenuItem>Home</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
    </ul>
  </>
);

const NotificationsContent = () => (
  <div className="p-4">
    <h2 className="text-xl">Notifications</h2>
  </div>
);

export default function Index() {
  const [page, setPage] = useState(pages[0]);

  const showMenu = Store.useState(s => s.showMenu);
  const showNotifications = Store.useState(s => s.showNotifications);

  const openMenu = () => {
    Store.update(s => {
      s.showMenu = true;
    });
  };

  const closeMenu = () => {
    Store.update(s => {
      s.showMenu = false;
    });
  };

  const backdropClose = () => {
    Store.update(s => {
      s.showMenu = false;
      s.showNotifications = false;
    });
  };

  const closeNotifications = () => {
    Store.update(s => {
      s.showNotifications = false;
    });
  };

  return (
    <App>
      <Menu open={showMenu} onClose={closeMenu}>
        <MenuContent />
      </Menu>
      <Nav page={page} onShowMenu={openMenu} />
      <CurrentPage page={page} />
      <TabBar>
        {pages.map(p => (
          <Tab key={p.id} {...p} onClick={() => setPage(p)} selected={p.id === page.id} />
        ))}
      </TabBar>
      <Backdrop open={showMenu || showNotifications} onClose={backdropClose} />
      <Modal open={showNotifications} onClose={closeNotifications}>
        <NotificationsContent />
      </Modal>
    </App>
  );
}
