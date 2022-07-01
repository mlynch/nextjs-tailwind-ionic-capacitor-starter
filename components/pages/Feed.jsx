import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonText,
  IonItem,
  IonModal,
  IonIcon,
  IonFooter,
  IonList,
  IonLabel,
  IonNote
} from '@ionic/react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { chevronBackOutline, closeOutline, optionsOutline, swapVerticalOutline  } from 'ionicons/icons';
import { Hits, InstantSearch, SearchBox, useSearchBox } from 'react-instantsearch-hooks-web';
import '@algolia/autocomplete-theme-classic';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import qs from 'qs';
import Notifications from './Notifications';
import CustomInfiniteHits from '../CustomInfiniteHits';
import CustomRefinementList from '../CustomRefinementList';
import SearchBoxWithHistory, { Autocomplete } from '../Autocomplete';

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

function createURL(searchState) {
    return qs.stringify(searchState, { addQueryPrefix: true });
  }
  
  function searchStateToUrl({ location }, searchState) {
    if (Object.keys(searchState).length === 0) {
      return '';
    }
  
    // Remove configure search state from query parameters
    const { configure, ...rest } = searchState;
    return `${location.pathname}${createURL(rest)}`;
  }
  
  function urlToSearchState({ search }) {
    return qs.parse(search.slice(1));
  }


const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedFacet, setSelectedFacet] = useState(null);

  const modal = useRef(null);

  const [searchState, setSearchState] = useState(() =>
  urlToSearchState(window.location)
);
const timerRef = useRef(null);

useEffect(() => {
  clearTimeout(timerRef.current);

  timerRef.current = setTimeout(() => {
    window.history.pushState(
      searchState,
      null,
      searchStateToUrl({ location: window.location }, searchState)
    );
  }, 400);
}, [searchState]);
  

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
        <CustomRefinementList attribute={selectedFacet.value} limit={30} />
      </IonContent>
    </>
  )
  const onSubmit = useCallback(({ state }) => {
    setSearchState((searchState) => ({
      ...searchState,
      query: state.query,
    }));
  }, []);

  const onReset = useCallback(() => {
    setSearchState((searchState) => ({
      ...searchState,
      query: '',
    }));
  }, []);

  const plugins = useMemo(() => {
    return []; // add more plugins here
  }, []); 

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName='products'
        searchState={searchState}
        onSearchStateChange={setSearchState}
        createURL={createURL}
        render
      >
          <Autocomplete
              placeholder="Search products"
              detachedMediaQuery="none"
              initialState={{
                query: searchState.query,
              }}
              openOnFocus
              onSubmit={onSubmit}
              onReset={onReset}
              plugins={plugins}
            />
          <CustomInfiniteHits />
    </InstantSearch>
    </div>
  );
};

export default Feed;
