// import { IonSearchbar } from "@ionic/react";
// import { useSearchBox } from 'react-instantsearch-hooks-web';

// const CustomSearchBox = (props) => {
//   const { query, refine, isSearchStalled } = useSearchBox(props);

//   return (
// 		<IonSearchbar
// 			value={query}
// 			debounce={300}
// 			disabled={isSearchStalled}
// 			onIonChange={e => refine(e.detail.value)}
// 			id='autocomplete'
// 		></IonSearchbar>
// 	);
// }

// export default CustomSearchBox;


import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const SearchBoxWithHistory = (props) => {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}

export default SearchBoxWithHistory;
