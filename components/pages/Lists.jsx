import Link from '../../components/Link';

import Store from '../../store';
import * as selectors from '../../store/selectors';

import VirtualScroll from '../ui/VirtualScroll';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const ListEntry = ({ list, ...props }) => (
  <Link href={`/lists/${list.id}`}>
    <a
      {...props}
      className="p-4 border-solid dark:border-gray-800 border-b cursor-pointer dark:text-gray-200 block"
    >
      <span className="text-md">{list.name}</span>
    </a>
  </Link>
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

const Lists = ({ selected, ...props }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
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

export default Lists;
