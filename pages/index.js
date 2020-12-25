import { useDrag } from 'react-use-gesture';

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

const CurrentPage = ({ page }) => {
  const pages = Store.useState(selectors.getPages);
  const currentPage = Store.useState(selectors.getCurrentPage);

  const Page = currentPage.component;

  return (
    <PageStack>
      {/*pages.map(p => {
        const Page = p.component;
        return <Page selected={page.id === p.id} key={p.id} />;
      })*/}
      <Page selected={true} />
    </PageStack>
  );
};

export default function Index() {
  const showMenu = Store.useState(selectors.getMenuOpen);
  const showNotifications = Store.useState(selectors.getNotificationsOpen);
  const currentPage = Store.useState(selectors.getCurrentPage);
  const tabs = Store.useState(selectors.getTabs);

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
        <CurrentPage page={currentPage} />
        <TabBar>
          {tabs.map(p => (
            <Tab
              key={p.id}
              {...p}
              onClick={() => actions.setPage(p)}
              selected={p.id === currentPage.id}
            />
          ))}
        </TabBar>
        <Backdrop open={showMenu || showNotifications} onClose={backdropClose} />
        <Modal open={showNotifications} onClose={closeNotifications}>
          <Notifications />
        </Modal>
      </SafeAreaProvider>
    </App>
  );
}
