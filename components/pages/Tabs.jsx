import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonBadge} from '@ionic/react';
import { bagOutline, heartOutline, shirtOutline } from 'ionicons/icons';

import Home from './Feed';
import Settings from './Settings';
import Cart from './Cart';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/feed" component={Home} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/" render={() => <Redirect to="/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="feed" href="/feed">
          <IonIcon icon={shirtOutline} />
        </IonTabButton>

        <IonTabButton tab="cart" href="/cart">
          <IonIcon icon={bagOutline} />
          <IonBadge color="primary"> 100 </IonBadge>
        </IonTabButton>

        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={heartOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
