
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonText,
  IonModal,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useRef } from 'react';
import { closeOutline } from 'ionicons/icons';

import '@algolia/autocomplete-theme-classic';
import Search from "../ui/Search";


const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const modal = useRef(null);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Arrivals</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <section>
          <IonButton><IonText>Sort</IonText></IonButton>
          <IonButton id='open-modal'>
            <IonText>
              Filter
            </IonText>
          </IonButton>
        </section>

        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

		<Search />
		
      </IonContent>

      <IonModal ref={modal} trigger='open-modal'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon slot='start' icon={closeOutline}></IonIcon>
              </IonButton>
            </IonButtons>

            <IonTitle>Filter</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
        </IonContent>

        <IonFooter className='ion-no-border'>
          <IonToolbar>
            <IonButton>
              View Items
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default Feed;
