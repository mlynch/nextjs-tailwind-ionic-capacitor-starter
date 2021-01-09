import Store from '../../store';
import * as selectors from '../../store/selectors';

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
        <List className="h-full w-full">
          <AllLists />
        </List>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
