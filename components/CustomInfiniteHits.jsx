import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { useInfiniteHits } from 'react-instantsearch-hooks-web';
import Product from './Product';

const CustomInfiniteHits = (props) => {
  const { hits, isFirstPage, isLastPage, showPrevious, showMore } = useInfiniteHits(props);

  return (
    <>
      {!isFirstPage && (
        <IonButton
          expand="full"
          color="dark"
          className="mb-4 square-border"
          onClick={() => showPrevious()}
        >
          Show Previous
        </IonButton>
      )}

      <ul className="grid grid-cols-2 gap-2">
        {hits.map((hit) => (
          <Product hit={hit} key={hit.objectId}/>
        ))}
      </ul>

      {!isLastPage && (
        <IonButton
          expand="full"
          color="dark"
          className="mt-4 square-border"
          onClick={() => showMore()}
        >
          Show More
        </IonButton>
      )}
    </>
  );
};

export default CustomInfiniteHits;
