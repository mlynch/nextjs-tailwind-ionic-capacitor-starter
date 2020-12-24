import Store from '../store';

import App from '../components/ui/App';
import Backdrop from '../components/ui/Backdrop';
import Menu from '../components/ui/Menu';
import Modal from '../components/ui/Modal';
import Nav from '../components/ui/Nav';
import PageStack from '../components/ui/PageStack';
import Tab from '../components/ui/Tab';
import TabBar from '../components/ui/TabBar';
import { SafeAreaProvider } from '../components/ui/SafeArea';

import { useDrag } from 'react-use-gesture';

import Notifications from '../components/Notifications';
import MenuContent from '../components/MenuContent';

const CurrentPage = ({ page }) => {
  const pages = Store.useState(s => s.pages);

  return (
    <PageStack>
      {pages.map(p => {
        const Page = p.component;
        return <Page selected={page.id === p.id} key={p.id} />;
      })}
    </PageStack>
  );
};

export default function Index() {
  const showMenu = Store.useState(s => s.showMenu);
  const showNotifications = Store.useState(s => s.showNotifications);
  const currentPage = Store.useState(s => s.currentPage);
  const pages = Store.useState(s => s.pages);

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

  // To enable edge drag detection to open the side menu
  const bind = useDrag(
    ({ down, movement: [mx], xy: [x, y], cancel }) => {
      if (mx > 5 && x < 50 && down) {
        Store.update(s => {
          s.showMenu = true;
        });
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
          {pages.map(p => (
            <Tab
              key={p.id}
              {...p}
              onClick={() =>
                Store.update(s => {
                  s.currentPage = p;
                })
              }
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
