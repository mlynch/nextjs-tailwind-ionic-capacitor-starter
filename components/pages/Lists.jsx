import Link from '../../components/Link';

import Store from '../../store';
import * as selectors from '../../store/selectors';

import VirtualScroll from '../ui/VirtualScroll';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useEffect, useState } from 'react';

const ListEntry = ({ list, ...props }) => (
  <IonItem href={`/tabs/lists/${list.id}`}>
    <IonLabel>{list.name}</IonLabel>
  </IonItem>
);

const AllLists = ({ onSelect }) => {
  const lists = Store.useState(selectors.getLists);

  return (
    <VirtualScroll
      data={lists}
      totalCount={lists.length}
      style={{ height: '100%', width: '100%' }}
      itemContent={(i, list) => <ListEntry list={list} />}
    />
  );
};

const Lists = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AllLists />
      </IonContent>
    </IonPage>
  );
};

export default Lists;
