import Store from '../../store';
import * as selectors from '../../store/selectors';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';

const Settings = () => {
  const enableNotifications = Store.useState();
  const settings = Store.useState(selectors.getSettings);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList></IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
