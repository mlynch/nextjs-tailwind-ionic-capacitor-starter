import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonItem,
  IonInput,
} from '@ionic/react';
import Notifications from '../Notifications';
import { useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import TripCard from '../../TripCard';
import { useRecoilValue } from 'recoil';
import { trips } from '../../../states/explore';

const Explore = () => {
  const tripList = useRecoilValue(trips);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Explore</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Explore</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        <IonItem>
          <IonInput placeholder="Where you wanna go?"></IonInput>
        </IonItem>
        {tripList.map((i, index) => (
          <TripCard {...i} key={index} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Explore;
