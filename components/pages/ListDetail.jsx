import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

const ListItems = ({ list }) => {
  return (
    <IonList>
      {(list?.items || []).map((item, key) => (
        <ListItemEntry list={list} item={item} />
      ))}
    </IonList>
  );
};

const ListItemEntry = ({ list, item }) => (
  <IonItem onClick={() => actions.setDone(list, item, !item.done)}>
    <IonLabel>{item.name}</IonLabel>
    <IonCheckbox checked={item.done || false} slot="end" />
  </IonItem>
);

const ListDetail = ({ match }) => {
  const lists = Store.useState(selectors.getLists);
  const {
    params: { listId },
  } = match;
  const loadedList = lists.find(l => l.id === listId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/lists" />
          </IonButtons>
          <IonTitle>{loadedList.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{loadedList.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ListItems list={loadedList} />
      </IonContent>
    </IonPage>
  );
};

export default ListDetail;
