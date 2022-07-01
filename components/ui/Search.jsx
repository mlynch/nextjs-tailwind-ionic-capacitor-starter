import Image from 'next/image';
import { ClearRefinements, Hits, InstantSearch, RefinementList, SearchBox, Stats } from 'react-instantsearch-dom';
import Card from './Card';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"
import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';


const Hit = ({ hit: { brand, title, description, sizes, images } }) => (
	<Card className="my-4 mx-auto">
		<div className="h-32 w-full relative">
			<Image className="rounded-t-xl" objectFit="cover" src={images ? images[0].src : 'https://s3.amazonaws.com/logos.ecountabl.com/49c44803-4f5d-4d4c-a943-d98ed18254a9-thrilling.png'} alt="" layout='fill' />
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
		apiKey: "tnSic3TuqlLH6QoPzXragHKPZXSh6AZV",
		nodes: [
			{
				host: 'tlez1uhkagf3rvi9p-1.a1.typesense.net',
				port: '443',
				protocol: 'https'
			},
		],
		cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
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

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
	key: 'RECENT_SEARCH',
	limit: 5,
  });
  

const Search = () => {
	autocomplete({
		container: '#autocomplete',
		plugins: [recentSearchesPlugin],
		openOnFocus: true,
	});

	return (
		<InstantSearch searchClient={searchClient} indexName="products">
			<SearchBox />
			<Stats />
			<ClearRefinements />
			<h1>Brand</h1>
			<RefinementList attribute="brand" />
			<h1>Colors</h1>
			<RefinementList attribute="colors" />
			<h1>Eras</h1>
			<RefinementList attribute="eras" />
			<h1>Price</h1>
			<RefinementList attribute="priceBucket" />
			<Hits hitComponent={Hit} />
		</InstantSearch>
	);
}

export default Search;