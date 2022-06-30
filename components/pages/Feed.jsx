import Image from 'next/image';
import Card from '../ui/Card';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"

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
} from '@ionic/react';
import Notifications from './Notifications';
import { useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getHomeItems } from '../../store/selectors';
import Store from '../../store';
import { Hits, InstantSearch, SearchBox, Stats } from 'react-instantsearch-dom';

const Hit = ({ hit: { brand, title, description, sizes, images }}) => (
  <Card className="my-4 mx-auto">
    <div className="h-32 w-full relative">
      <Image className="rounded-t-xl" objectFit="cover" src={images[0].src} alt="" layout='fill' />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{brand}</h4>
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{description}</p>
      <div className="flex items-center space-x-4">
        <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{sizes.join(', ')}</h3>
      </div>
    </div>
  </Card>
);

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "tnSic3TuqlLH6QoPzXragHKPZXSh6AZV", // Be sure to use a Search API Key
    nodes: [
      {
        host: 'tlez1uhkagf3rvi9p-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
        port: '443',
        protocol: 'https'
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    query_by: "title,description",
	// include_fields: "images"
  },
})

const searchClient = typesenseInstantsearchAdapter.searchClient

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
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
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        <InstantSearch searchClient={searchClient} indexName="products">
			<SearchBox />
			<Stats />
			<Hits hitComponent={Hit} />
      	</InstantSearch>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
