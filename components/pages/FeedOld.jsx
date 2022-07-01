// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButton,
//   IonButtons,
//   IonContent,
//   IonText,
//   IonItem,
//   IonModal,
//   IonIcon,
//   IonImg,
//   IonFooter,
//   IonList,
//   IonLabel,
//   IonNote
// } from '@ionic/react';
// import { useState, useRef } from 'react';
// import { chevronBackOutline, heart, heartOutline, closeOutline, optionsOutline, swapVerticalOutline  } from 'ionicons/icons';
// import { InstantSearch } from 'react-instantsearch-hooks-web';
// import '@algolia/autocomplete-theme-classic';
// import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
// import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
// import axios from 'axios';

// import Notifications from './Notifications';
// import CustomInfiniteHits from '../CustomInfiniteHits';
// import CustomRefinementList from '../CustomRefinementList';
// import SearchBoxWithHistory from '../SearchBoxWithHistory';

// const FILTER_FACETS = [
//     {
//         title: 'Division',
//         value: 'division',
//         selected: [],
//     },
//     {
//         title: 'Size',
//         value: 'sizes',
//         selected: [],
//     },
//     {
//         title: 'Brand',
//         value: 'brand',
//         selected: [],
//     },
//     {
//         title: 'Color',
//         value: 'colors',
//         selected: [],
//     },
//     {
//         title: 'Era',
//         value: 'eras',
//         selected: [],
//     },
//     {
//         title: 'Price',
//         value: 'priceBucket',
//         selected: [],
//     }
// ];

// const sendFavorites = async (product) => {
// 	console.log(product)
// 	const userLoggedin = true;

// 	if (userLoggedin){

// 		const data = JSON.stringify({
// 			"attributes": [
// 			  {
// 				"external_id": "zzzz@zzz.com",
// 				"favorites": [
// 				  {
// 					"id": 33,
// 					"date": "2011-10-10T14:48:00",
// 					"link": "https://shopthrilling.com/products/80s-rainbow-stripe-sleeve-blue-retro-crewneck-sweater",
// 					"sku": "DKSIESD"
// 				  },
// 				  {
// 					"id": 3,
// 					"date": "2011-10-10T14:48:00",
// 					"link": "https://shopthrilling.com/products/90s-st-john-sport-marie-gray-sleeveless-sweater-petite-by-st-john",
// 					"sku": "DJSISAE"
// 				  }
// 				]
// 			  }
// 			]
// 		  });
	
// 		const config = {
// 			method: 'post',
// 			url: 'https://rest.iad-05.braze.com/users/track',
// 			headers: { 
// 			  'Content-Type': 'application/json', 
// 			  'Authorization': 'Bearer 5412080e-83f1-4c4e-8d6a-9ef38d0847dd'
// 			},
// 			data
// 		  };
	
// 		axios(config)
// 			.then(function (response) {
// 			console.log(JSON.stringify(response.data));
// 			})
// 			.catch(function (error) {
// 			console.log(error);
// 			});


// 	}else {
// 		console.log("add module to prompt user to sign up or log in")
// 	}

// }

// const Hits = ({ hits }) => (
//   <ul className='grid grid-cols-2 gap-2'>
//     {hits.map(hit => (
//       <li key={hit.objectID} className='w-full rounded overflow-hidden p-2 bg-gray-100 relative'>
//         <IonImg src={hit.images
//           ? imgixUtil.getImgSrc({
//             url: hit.images[0].src,
//             ratio: 'square',
//             opts: {
//               bg: 'f3f4f6',
//               fit: 'fill',
//             },
//           })
//           : 'https://s3.amazonaws.com/logos.ecountabl.com/49c44803-4f5d-4d4c-a943-d98ed18254a9-thrilling.png'}
//           className='w-full'
//         />

//         <IonButton
//           fill='clear'
//           size='small'
//           className='absolute right-0 bottom-1 text-black'
// 		  onClick={() => sendFavorites(hit)}
//         >
//           <IonIcon icon={heartOutline} size='small' />
//         </IonButton>
//       </li>
//     ))}
//   </ul>
// );

// const CustomHits = connectHits(Hits);

// const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
//     server: {
//         apiKey: "tnSic3TuqlLH6QoPzXragHKPZXSh6AZV", // Be sure to use a Search API Key
//         nodes: [
//             {
//                 host: 'tlez1uhkagf3rvi9p-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
//                 port: '443',
//                 protocol: 'https'
//             },
//         ],
//     },
//     // The following parameters are directly passed to Typesense's search API endpoint.
//     //  So you can pass any parameters supported by the search endpoint below.
//     //  queryBy is required.
//     additionalSearchParameters: {
//         query_by: "title,description",
//     },
// })

// const searchClient = typesenseInstantsearchAdapter.searchClient

// const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
//     key: 'RECENT_SEARCH',
//     limit: 5,
// });

// const Feed = () => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [selectedFacet, setSelectedFacet] = useState(null);

//   const modal = useRef(null);

//   const FilterRoot = () => (
//     <>
//       <IonHeader translucent={true}>
//         <IonToolbar>
//           <IonButtons slot='start'>
//             <IonButton color='dark' onClick={() => modal.current?.dismiss()}>
//               <IonIcon slot='icon-only' icon={closeOutline} />
//             </IonButton>
//           </IonButtons>
  
//           <IonTitle>Filter</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className='ion-padding'>
//         <IonList>
//           {FILTER_FACETS.map(filter => (
//             <IonItem
//               key={filter.value}
//               detail={false}
//               button
//               onClick={() => setSelectedFacet(filter)}
//             >
//               <IonLabel>{filter.title}</IonLabel>

//               <IonNote>All</IonNote>
//             </IonItem>
//           ))}
//         </IonList>
//       </IonContent>
//     </>
//   );

//   const FilterFacet = () => (
//     <>
//       <IonHeader translucent={true}>
//         <IonToolbar>
//           <IonButtons slot='start'>
//             <IonButton color='dark' onClick={() => setSelectedFacet(null)}>
//               <IonIcon slot='icon-only' icon={chevronBackOutline} />
//             </IonButton>
//           </IonButtons>
  
//           <IonTitle>{selectedFacet.title}</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className='ion-padding'>
//         <CustomRefinementList attribute={selectedFacet.value} limit={30} />
//       </IonContent>
//     </>
//   )

//   return (
//     <InstantSearch searchClient={searchClient} indexName='products'>
//       <IonPage>
//         <IonHeader collapse='condense'>
//           <IonToolbar>
//             <IonTitle>New Arrivals</IonTitle>
//           </IonToolbar>

//           <section className='flex bg-white py-2 divide-x divide-solid border-t border-b'>
//             {['Sort', 'Filter'].map(v => (
//               <IonButton
//                 key={v}
//                 id={v === 'Filter' && 'open-modal'}
//                 fill='clear'
//                 className='w-full font-semibold text-black m-0 h-7 rounded-none'
//               >
//                 <IonIcon slot='start' icon={v === 'Sort' ? swapVerticalOutline : optionsOutline} size='small' />
    
//                 <IonText>
//                   {v}
//                 </IonText>
//               </IonButton>
//             ))}
//           </section>

//           <SearchBoxWithHistory
//             openOnFocus={true}
//             plugins={[recentSearchesPlugin]}
//           />
//         </IonHeader>

//         <IonContent className='ion-padding' fullscreen>
//           <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

//           <CustomInfiniteHits />

//           <IonModal ref={modal} trigger='open-modal'>
//             {selectedFacet ? FilterFacet() : FilterRoot()}

//             <IonFooter className='ion-no-border'>
//               <IonToolbar>
//                 <IonButton expand='full' color='dark' className='square-border' onClick={() => modal.current?.dismiss()}>
//                   View Items
//                 </IonButton>
//               </IonToolbar>
//             </IonFooter>
//           </IonModal>
//         </IonContent>
//       </IonPage>
//     </InstantSearch>
//   );
// };

// export default Feed;
