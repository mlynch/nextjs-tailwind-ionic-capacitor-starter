import { IonCheckbox, IonItem, IonLabel, IonList, IonNote } from '@ionic/react';
import { useRefinementList } from 'react-instantsearch-hooks-web';

const CustomRefinementList = (props) => {
  const { items, refine } = useRefinementList(props);

  return (
    <IonList>
      {items.map((item) => (
        <IonItem key={item.value}>
          <IonLabel>{item.label}</IonLabel>
          <IonNote>{item.count}</IonNote>
          <IonCheckbox
            slot="start"
            value={item.value}
            checked={item.isRefined}
            onIonChange={() => refine(item.value)}
          />
        </IonItem>
      ))}
    </IonList>
  );
};

export default CustomRefinementList;
