import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useRecoilValue } from 'recoil';
import { tales } from '../../states/explore';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  useIonRouter,
} from '@ionic/react';

const ListEntry = ({ list, ...props }) => (
  <IonItem routerLink={`/tabs/tale/${list.trip_id}`} className="list-entry">
    <IonLabel>{list.title}</IonLabel>
  </IonItem>
);

const AllLists = ({ onSelect }) => {
  const lists = useRecoilValue(tales);
  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
  const router = useIonRouter();
  

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AllLists />
        </IonList>
      </IonContent>
      <IonButton href={"/tabs/tale/create"}>Create New Tale</IonButton>
    </IonPage>
  );
};

export default Lists;
