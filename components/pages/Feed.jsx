import Image from 'next/image';
import Card from '../ui/Card';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonText,
  IonSearchbar,
  IonItem,
  IonModal,
  IonIcon,
  IonFooter,
  IonList,
  IonLabel,
  IonNote,
  IonImg,
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useRef } from 'react';
import { closeOutline, handRight, heartOutline, notificationsOutline, optionsOutline, swapVerticalOutline  } from 'ionicons/icons';
import { ClearRefinements, InstantSearch, SearchBox, Stats, connectHits } from 'react-instantsearch-dom';
import imgixUtil from '../../util/imgixUtil';

const FILTER_FACETS = [
  {
    title: 'Division',
    value: 'division',
    selected: [],
  },
  {
    title: 'Size',
    value: 'sizes',
    selected: [],
  },
  {
    title: 'Brand',
    value: 'brand',
    selected: [],
  },
  {
    title: 'Color',
    value: 'colors',
    selected: [],
  },
  {
    title: 'Era',
    value: 'eras',
    selected: [],
  },
  {
    title: 'Price',
    value: 'priceBucket',
    selected: [],
  }
];

const Hits = ({ hits }) => (
  <ul className='grid grid-cols-2 gap-2'>
    {hits.map(hit => (
      <li key={hit.objectID} className='w-full rounded overflow-hidden p-2 bg-gray-100 relative'>
        <IonImg src={hit.images
          ? imgixUtil.getImgSrc({
            url: hit.images[0].src,
            ratio: 'square',
            opts: {
              bg: 'f3f4f6',
              fit: 'fill',
            },
          })
          : 'https://s3.amazonaws.com/logos.ecountabl.com/49c44803-4f5d-4d4c-a943-d98ed18254a9-thrilling.png'}
          className='w-full'
        />

        <IonButton
          fill='clear'
          size='small'
          className='absolute right-0 bottom-1 text-black'
        >
          <IonIcon icon={heartOutline} size='small' />
        </IonButton>
      </li>
    ))}
  </ul>
);

const CustomHits = connectHits(Hits);

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

  const modal = useRef(null);

  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle>New Arrivals</IonTitle>
        </IonToolbar>

        <section className='flex bg-white py-2 divide-x divide-solid border-t border-b'>
          {['Sort', 'Filter'].map(v => (
            <IonButton
              key={v}
              id={v === 'Filter' && 'open-modal'}
              fill='clear'
              className='w-full font-semibold text-black m-0 h-7 rounded-none'
            >
              <IonIcon slot='start' icon={v === 'Sort' ? swapVerticalOutline : optionsOutline} size='small' />
  
              <IonText>
                {v}
              </IonText>
            </IonButton>
          ))}
        </section>
      </IonHeader>

      <IonContent className='ion-padding' fullscreen>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        
        <InstantSearch searchClient={searchClient} indexName='products'>
          <SearchBox />

          <CustomHits />
        </InstantSearch>
      </IonContent>

      <IonModal ref={modal} trigger='open-modal'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon slot='icon-only' icon={closeOutline} />
              </IonButton>
            </IonButtons>

            <IonTitle>Filter</IonTitle>

            <IonButtons slot='end'>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            {FILTER_FACETS.map(filter => (
              <IonItem
                key={filter.value}
                detail={false}
                button
                onClick={() => console.log('facet selected')}
              >
                <IonLabel>{filter.title}</IonLabel>
                <IonNote>All</IonNote>
              </IonItem>
            ))}
          </IonList>
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
