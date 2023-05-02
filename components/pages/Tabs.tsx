import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { cog, list, search } from 'ionicons/icons';

import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';
import Explore from './Explore';
import { Suspense } from 'react';
import TaleOverview from './TaleOverview';
import CreateTale from './CreateTale';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/tabs/explore"
          render={() => (
            <Suspense>
              <Explore />
            </Suspense>
          )}
          exact={true}
        />
        <Route
          path="/tabs/tale/:taleId"
          render={() => (
            <Suspense>
              <TaleOverview />
            </Suspense>
          )}
          exact={true}
        />
        <Route path="/tabs/tale/create" exact={true} render={() => <CreateTale />} />
        <Route
          path="/tabs/lists"
          render={() => (
            <Suspense>
              <Lists />
            </Suspense>
          )}
          exact={true}
        />
        <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/explore" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/explore">
          <IonIcon icon={search} />
          <IonLabel>Explore</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/lists">
          <IonIcon icon={list} />
          <IonLabel>My Tales</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
