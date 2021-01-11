import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';
import VirtualScroll from '../ui/VirtualScroll';

const Notifications = ({ open, onDidDismiss }) => {
  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <VirtualScroll
            totalCount={1000}
            overscan={200}
            style={{ height: '100%', width: '100%' }}
            itemContent={index => <NotificationItem i={index} />}
          />
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
