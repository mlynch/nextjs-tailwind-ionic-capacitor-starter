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
import { useCallback, useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import TripCard from '../../TripCard';
import { useRecoilValue } from 'recoil';
import { currentTale, tales } from '../../../states/explore';
import { useIonRouter } from '@ionic/react';

const Explore = () => {
  const tripList = useRecoilValue(tales);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useIonRouter();

  const selectTale = useCallback((id: number) => {
    router.push(`/tabs/tale/${id}`);
  }, []);

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
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tripList.map((tale, index) => (
            <TripCard {...tale} key={index} onClick={() => selectTale(tale.trip_id)} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Explore;
