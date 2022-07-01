import { IonSearchbar } from "@ionic/react";
import { useSearchBox } from 'react-instantsearch-hooks-web';

const CustomSearchBox = (props) => {
  const { query, refine, isSearchStalled } = useSearchBox(props);

  return (
		<IonSearchbar
			value={query}
			debounce={300}
			disabled={isSearchStalled}
			onIonChange={e => refine(e.detail.value)}
		></IonSearchbar>
	);
}

export default CustomSearchBox;