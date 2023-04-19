import React, { useEffect, useMemo, useState } from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonTextarea,
} from '@ionic/react';
import { StoryResponse } from '../../../../types/types';
import { parseDuration } from '../../../../utils/converters';
import { time } from 'ionicons/icons';

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
          <IonItemGroup key={act.id}>
            <IonItem>
              <IonLabel>
                <span className={'text-lg font-medium'}>{act.name}</span>
              </IonLabel>
              <div slot="end" className={'flex flex-row gap-1 items-center'}>
                <IonLabel>{parseDuration(act.duration)}</IonLabel>
                <IonIcon color={'primary'} icon={time} />
              </div>
            </IonItem>
            <IonItem>
              <IonTextarea readonly={true}>{act.description}</IonTextarea>
            </IonItem>
          </IonItemGroup>
        ));
        return (
          <IonAccordion key={dest.id} value={dest.name}>
            <IonItem slot="header">
              <h1>{dest.name}</h1>
            </IonItem>

            <IonItem slot="content">{...activities}</IonItem>
          </IonAccordion>
        );
      }),
    [story]
  );

  return <IonAccordionGroup>{...destinations}</IonAccordionGroup>;
}
export default Story;
