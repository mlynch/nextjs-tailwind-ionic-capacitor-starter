import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, list } from 'ionicons/icons';

import Home from './Feed';
import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';

const Tabs = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tabs/feed" component={Home} exact={true} />
          <Route path="/tabs/lists" component={Lists} exact={true} />
          <Route path="/tabs/lists/:listId" component={ListDetail} exact={true} />
          <Route path="/tabs/settings" component={Settings} exact={true} />
          <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
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
  );
};

export default Tabs;
