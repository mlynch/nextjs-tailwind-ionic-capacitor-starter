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
  IonNote
} from '@ionic/react';
import { useState, useRef } from 'react';
import { chevronBackOutline, closeOutline, optionsOutline, swapVerticalOutline  } from 'ionicons/icons';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { autocomplete } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

import Notifications from './Notifications';
import CustomSearchBox from '../CustomSearchBox';
import CustomInfiniteHits from '../CustomInfiniteHits';
import CustomRefinementList from '../CustomRefinementList';

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
    },
})

const searchClient = typesenseInstantsearchAdapter.searchClient

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'RECENT_SEARCH',
    limit: 5,
});

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedFacet, setSelectedFacet] = useState(null);

  const modal = useRef(null);

  autocomplete({
    container: '#autocomplete',
    plugins: [recentSearchesPlugin],
    openOnFocus: true,
});

  const FilterRoot = () => (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton color='dark' onClick={() => modal.current?.dismiss()}>
              <IonIcon slot='icon-only' icon={closeOutline} />
            </IonButton>
          </IonButtons>
  
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonList>
          {FILTER_FACETS.map(filter => (
            <IonItem
              key={filter.value}
              detail={false}
              button
              onClick={() => setSelectedFacet(filter)}
            >
              <IonLabel>{filter.title}</IonLabel>

              <IonNote>All</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );

  const FilterFacet = () => (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton color='dark' onClick={() => setSelectedFacet(null)}>
              <IonIcon slot='icon-only' icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
  
          <IonTitle>{selectedFacet.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <CustomRefinementList attribute={selectedFacet.value} />
      </IonContent>
    </>
  )

  return (
    <InstantSearch searchClient={searchClient} indexName='products'>
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

          <CustomSearchBox />
        </IonHeader>

        <IonContent className='ion-padding' fullscreen>
          <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

          <CustomInfiniteHits />

          <IonModal ref={modal} trigger='open-modal'>
            {selectedFacet ? FilterFacet() : FilterRoot()}

            <IonFooter className='ion-no-border'>
              <IonToolbar>
                <IonButton expand='full' color='dark' className='square-border' onClick={() => modal.current?.dismiss()}>
                  View Items
                </IonButton>
              </IonToolbar>
            </IonFooter>
          </IonModal>
        </IonContent>
      </IonPage>
    </InstantSearch>
  );
};

export default Feed;
