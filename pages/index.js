import { Virtuoso } from 'react-virtuoso';

import Store from '../store';

import App from '../components/App';
import Backdrop from '../components/Backdrop';
import Menu from '../components/Menu';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import Home from '../components/pages/Home';
import Feed from '../components/pages/Feed';
import Settings from '../components/pages/Settings';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';
import List from '../components/List';
import ListItem from '../components/ListItem';
import { useState } from 'react';
import Button from '../components/Button';

const pages = [
  { id: 'home', title: 'Home', icon: 'home-outline', selectedIcon: 'home', component: Home },
  {
    id: 'feed',
    title: 'Feed',
    icon: 'flash-outline',
    selectedIcon: 'person',
    component: Feed,
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
    <div className="flex-1 z-0 overflow-hidden relative">
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

const FakeNotification = ({ i }) => (
  <ListItem className="flex align-center">
    <img
      src={`/img/faces/image-${(i % 66) + 1}.png`}
      alt="Notification"
      className="block rounded-full w-8 h-8 mr-4"
    />
    <div className="flex-1">
      <span className="p-0 m-0 align-middle">You have a new friend request</span>
    </div>
    <div>
      <Button className="background-transparent px-1 py-1 text-green-400 text-lg">
        <ion-icon name="checkmark-outline" />
      </Button>
      <Button className="background-transparent px-1 py-1 text-red-400 text-lg">
        <ion-icon name="close-outline" />
      </Button>
    </div>
  </ListItem>
);

const NotificationsContent = () => (
  <div className="w-full h-full flex flex-col">
    <div className="p-4">
      <h2 className="text-xl">Notifications</h2>
    </div>
    <List className="flex-1">
      <Virtuoso
        totalCount={1000}
        overscan={200}
        style={{ height: '100%', width: '100%' }}
        itemContent={index => <FakeNotification i={index} />}
      />
    </List>
  </div>
);

export default function Index() {
  const [page, setPage] = useState(pages[0]);

  const showMenu = Store.useState(s => s.showMenu);
  const showNotifications = Store.useState(s => s.showNotifications);

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

  // This is an example app layout. We've got a hidden menu that will be toggled
  //
  return (
    <App>
      <Menu open={showMenu} onClose={closeMenu}>
        <MenuContent />
      </Menu>
      <Nav page={page} />
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
