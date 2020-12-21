import { useCallback, useState } from 'react';

import App from '../components/App';
import Backdrop from '../components/Backdrop';
import Menu from '../components/Menu';
import Nav from '../components/Nav';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import Settings from '../components/pages/Settings';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';

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

const MenuContent = () => (
  <>
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
  </>
);

export default function Index() {
  const [page, setPage] = useState(pages[0]);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  return (
    <App>
      <Menu open={showMenu} onClose={() => setShowMenu(false)}>
        <MenuContent />
      </Menu>
      <Nav page={page} onShowMenu={openMenu} />
      <CurrentPage page={page} />
      <TabBar>
        {pages.map(p => (
          <Tab key={p.id} {...p} onClick={() => setPage(p)} selected={p.id === page.id} />
        ))}
      </TabBar>
      <Backdrop open={showMenu} onClose={() => setShowMenu(false)} />
    </App>
  );
}
