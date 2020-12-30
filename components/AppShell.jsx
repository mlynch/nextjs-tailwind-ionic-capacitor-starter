import { useCallback, useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { Router, Route, Switch, useRoute } from 'wouter';
import { cog, cogOutline, home, homeOutline, list, listOutline } from 'ionicons/icons';

import Store from '../store';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

import App from '../components/ui/App';
import Backdrop from '../components/ui/Backdrop';
import Menu from '../components/ui/Menu';
import Modal from '../components/ui/Modal';
import Nav from '../components/ui/Nav';
import PageStack from '../components/ui/PageStack';
import Tab from '../components/ui/Tab';
import TabBar from '../components/ui/TabBar';
import { SafeAreaProvider } from '../components/ui/SafeArea';
import Notifications from '../components/Notifications';
import MenuContent from '../components/MenuContent';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Settings from './pages/Settings';
import useLocation from '../hooks/useLocation';
import ListDetail from './pages/ListDetail';

const CurrentPage = ({ page, pageProps = {} }) => {
  const currentPage = Store.useState(selectors.getCurrentPage);

  const Page = page;

  const [local, setLocal] = useState(false);

  useEffect(() => {
    setLocal(true);
  }, []);

  return (
    <PageStack>
      {local ? (
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/lists" component={Lists} />
          <Route path="/lists/:listId" component={ListDetail} />
          <Route path="/settings" component={Settings} />
        </Switch>
      ) : (
        <Page selected={true} {...pageProps} />
      )}
    </PageStack>
  );
};

const AppShell = ({ page, pageProps }) => {
  const [location, setLocation] = useLocation();

  const showMenu = Store.useState(selectors.getMenuOpen);
  const showNotifications = Store.useState(selectors.getNotificationsOpen);
  const currentPage = Store.useState(selectors.getCurrentPage);

  const closeMenu = () => actions.setMenuOpen(false);

  const backdropClose = () => {
    actions.setMenuOpen(false);
    actions.setNotificationsOpen(false);
  };

  const closeNotifications = () => actions.setNotificationsOpen(false);

  // To enable edge drag detection to open the side menu
  const bind = useDrag(
    ({ down, movement: [mx], xy: [x, y], cancel }) => {
      if (mx > 5 && x < 50 && down) {
        actions.setMenuOpen(true);
        cancel();
      }
    },
    {
      axis: 'x',
    }
  );

  console.log('Got location', location, '/settings' === location);

  // This is an example app layout. We've got a hidden menu that will be toggled
  //
  return (
    <App
      {...bind()}
      style={{
        touchAction: 'pan-x',
      }}
    >
      <SafeAreaProvider>
        <Router hook={useLocation}>
          <Menu open={showMenu} onClose={closeMenu}>
            <MenuContent />
          </Menu>
          <Nav page={currentPage} />
          {/*<CurrentPage page={currentPage} />*/}
          <CurrentPage page={page} pageProps={pageProps} />
          <TabBar>
            <Tab
              icon={homeOutline}
              selectedIcon={home}
              title="Home"
              href="/"
              selected={'/home' === location}
            />
            <Tab
              icon={listOutline}
              selectedIcon={list}
              title="Lists"
              href="/lists"
              selected={location.indexOf('/lists') === 0}
            />
            <Tab
              icon={cogOutline}
              selectedIcon={cog}
              title="Settings"
              href="/settings"
              selected={'/settings' === location}
            />
          </TabBar>
          <Backdrop open={showMenu || showNotifications} onClose={backdropClose} />
          <Modal open={showNotifications} onClose={closeNotifications}>
            <Notifications />
          </Modal>
        </Router>
      </SafeAreaProvider>
    </App>
  );
};

export default AppShell;
