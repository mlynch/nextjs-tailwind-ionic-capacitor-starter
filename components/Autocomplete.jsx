import {
  createElement,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { render } from 'react-dom';

import {
  useHierarchicalMenu,
  usePagination,
  useSearchBox,
} from 'react-instantsearch-hooks';
import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { debounce } from '@algolia/autocomplete-shared';

import '@algolia/autocomplete-theme-classic';

export function Autocomplete({
  searchClient,
  className,
  ...autocompleteProps
}) {
  const autocompleteContainer = useRef(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [
    instantSearchUiState,
    setInstantSearchUiState,
  ] = useState({ query });
  const debouncedSetInstantSearchUiState = debounce(
    setInstantSearchUiState,
    500
  );

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'SAVED_SEARCHES',
      limit: 5,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.label,
              category: item.category,
            });
          },
        };
      },
    });

    return [recentSearches];
  });

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      plugins,
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
    //   onStateChange({ prevState, state }) {
    //     if (prevState.query !== state.query) {
    //       debouncedSetInstantSearchUiState({
    //         query: state.query,
    //       });
    //     }
    //   },
      renderer: { createElement, Fragment, render },
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]);

  return <div className={className} ref={autocompleteContainer} />;
}
