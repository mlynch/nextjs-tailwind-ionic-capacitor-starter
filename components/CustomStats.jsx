import { useConnector } from 'react-instantsearch-hooks-web';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import { IonText } from '@ionic/react';

export function useStats(props) {
  return useConnector(connectStats, props);
}

const CustomStats = (props) => {
  const { nbHits, processingTimeMS } = useStats(props);

  return (
    <IonText color="danger" className="ion-padding-start ion-padding-end">
      {nbHits} results fround in {processingTimeMS} ms
    </IonText>
  );
};

export default CustomStats;
