import { TodoListItem } from '../../mock';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

const ListEntry = ({ list }: { list: TodoListItem }) => {
  return (
    <IonItem routerLink={`/lists/${list.id}`} className="list-entry">
      <IonLabel>{list.name}</IonLabel>
    </IonItem>
  );
};

const AllLists = () => {
  const lists = Store.useState(selectors.selectLists);

  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
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
    </IonPage>
  );
};

export default Lists;
