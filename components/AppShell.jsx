import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon  } from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import Lists from './pages/Lists';
import ListDetail from './pages/ListDetail';
import Settings from './pages/Settings';

setupIonicReact({});

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tabs/feed" exact={true}>
              <Feed />
            </Route>
            <Route path="/tabs/lists" exact={true}>
              <Lists />
            </Route>
            <Route path="/tabs/lists/:listId" exact={true}>
              <ListDetail />
            </Route>
            <Route path="/tabs/settings" exact={true}>
              <Settings />
            </Route>
            <Route path="/" render={() => <Redirect to="/tabs/feed" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs/feed">
              <IonIcon icon={flash} />
              <IonLabel>Feed</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tabs/lists">
              <IonIcon icon={list} />
              <IonLabel>Lists</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tabs/settings">
              <IonIcon icon={cog} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
