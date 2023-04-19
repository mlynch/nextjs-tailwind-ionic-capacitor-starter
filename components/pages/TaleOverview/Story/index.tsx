import React, { useMemo } from 'react';
import { IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import { StoryResponse } from '../../../../types/types';

type StoryProps = {
  story: StoryResponse;
};

function Story({ story }: StoryProps) {
  const destinations = useMemo(
    () =>
      story.destinations.map(dest => {
        const destActivities = story.activities
          .filter(act => act.destination_id === dest.id)
          .sort((act1, act2) => act1.sequential_number - act2.sequential_number);
        const activities = destActivities.map((act, index) => (
          <IonItem key={act.id} lines={index === destActivities.length - 1 ? 'none' : 'inset'}>
            <IonLabel>{act.name}</IonLabel>
          </IonItem>
        ));
        return (
          <IonItemGroup key={dest.id}>
            <IonItemDivider>
              <IonLabel>{dest.name}</IonLabel>
            </IonItemDivider>
            {...activities}
          </IonItemGroup>
        );
      }),
    [story]
  );

  return <>{...destinations}</>;
}
export default Story;
