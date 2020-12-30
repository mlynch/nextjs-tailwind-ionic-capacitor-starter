import { useDrag } from 'react-use-gesture';
import { Route, Switch } from 'wouter';

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
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { cog, cogOutline, home, homeOutline, list, listOutline } from 'ionicons/icons';

const CurrentPage = ({ page }) => {
  const currentPage = Store.useState(selectors.getCurrentPage);

  // const Page = currentPage.component;
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
        </Switch>
      ) : (
        <Page selected={true} />
      )}
      {/*pages.map(p => {
        const Page = p.component;
        return <Page selected={page.id === p.id} key={p.id} />;
      })*/}
      {/*<Page selected={true} />*/}
    </PageStack>
  );
};

const AppShell = ({ page }) => {
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
        <Menu open={showMenu} onClose={closeMenu}>
          <MenuContent />
        </Menu>
        <Nav page={currentPage} />
        {/*<CurrentPage page={currentPage} />*/}
        <CurrentPage page={page} />
        <TabBar>
          <Tab
            icon={homeOutline}
            selectedIcon={home}
            title="Home"
            onClick={() => actions.setPage(p)}
            selected={'home' === currentPage?.id}
          />
          <Tab
            icon={listOutline}
            selectedIcon={list}
            title="Lists"
            onClick={() => actions.setPage(p)}
            selected={'lists' === currentPage?.id}
          />
          <Tab
            icon={cogOutline}
            selectedIcon={cog}
            title="settings"
            onClick={() => actions.setPage(p)}
            selected={'settings' === currentPage?.id}
          />
        </TabBar>
        <Backdrop open={showMenu || showNotifications} onClose={backdropClose} />
        <Modal open={showNotifications} onClose={closeNotifications}>
          <Notifications />
        </Modal>
      </SafeAreaProvider>
    </App>
  );
};

export default AppShell;
