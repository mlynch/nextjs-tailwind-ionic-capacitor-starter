import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';

const SortFilterButtons = () => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed" id='open-modal'>
      <IonFabButton>
        <IonIcon icon={optionsOutline} />
      </IonFabButton>
    </IonFab>
  );
};

export default SortFilterButtons;
