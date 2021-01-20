import {
  IonApp,
  IonContent,
  IonHeader,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Tabs from './pages/Tabs';

const AppShell = ({ page, pageProps }) => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu side="start" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent></IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs />} />
          <Route exact path="/" render={() => <Redirect to="/tabs" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
