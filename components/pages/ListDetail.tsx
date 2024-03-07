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
import { useParams } from 'react-router-dom';

import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import { ListItem, TodoListItem } from '../../mock';

type ListDetailParams = {
  listId: string;
};

const ListItems = ({ list }: { list: TodoListItem }) => {
  return (
    <IonList>
      {(list?.items || []).map((item, key) => (
        <ListItemEntry list={list} item={item} key={key} />
      ))}
    </IonList>
  );
};

const ListItemEntry = ({
  list,
  item,
}: {
  list: TodoListItem;
  item: ListItem;
}) => (
  <IonItem onClick={() => actions.setDone(list, item, !item.done)}>
    <IonLabel>{item.name}</IonLabel>
    <IonCheckbox
      aria-label={item.name}
      checked={item.done || false}
      slot="end"
    />
  </IonItem>
);

const ListDetail = () => {
  const lists = Store.useState(selectors.selectLists);
  const params = useParams<ListDetailParams>();
  const { listId } = params;
  const loadedList = lists.find(l => l.id === listId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/lists" />
          </IonButtons>
          <IonTitle>{loadedList?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{loadedList && <ListItems list={loadedList} />}</IonContent>
    </IonPage>
  );
};

export default ListDetail;
