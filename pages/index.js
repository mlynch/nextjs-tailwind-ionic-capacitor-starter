import { useState } from 'react';

import Card from '../components/Card';
import Nav from '../components/Nav';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import Settings from '../components/pages/Settings';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';

const pages = [
  { id: 'home', title: 'Home', icon: "home-outline", selectedIcon: "home", component: Home },
  { id: 'profile', title: 'Profile', icon: "person-outline", selectedIcon: "person", component: Profile },
  { id: 'settings', title: 'Settings', icon: "cog-outline", selectedIcon: "cog", component: Settings },
]

const CurrentPage = ({ page }) => {
  const Page = page.component;
  return <Page />;
}

export default function Index() {
  const [page, setPage] = useState(pages[0]);

  return (
    <>
      <Nav page={page} />
      <CurrentPage page={page} />
      <TabBar>
        {pages.map(p => (
          <Tab key={p.id} {...p} onClick={() => setPage(p)} selected={p.id === page.id} />
        ))}
      </TabBar>
    </>
  );
}
