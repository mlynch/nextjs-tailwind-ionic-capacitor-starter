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
import PostgresInterval from 'postgres-interval';
import ImageTape from '../../../ui/ImageTape';

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
          <div
            className={
              'border border-gray-400 rounded-md bg-blue-50 lg:shadow-lg md:shadow-lg px-4 mx-2 py-4'
            }
            key={act.id}
          >
            <div className={'flex flex-row gap-2 text-lg font-medium'}>
              <IonLabel>{act.name}</IonLabel>
              <div className={'flex flex-row gap-1 items-center'}>
                <IonLabel>
                  {parseDuration(act.duration as PostgresInterval.IPostgresInterval)}
                </IonLabel>
                <IonIcon color={'primary'} icon={time} />
              </div>
            </div>
            <div className={'mb-4'}>
              <p>{act.description}</p>
            </div>
            <ImageTape media={act.media} />
          </div>
        ));
        return (
          <IonAccordion key={dest.id} value={dest.name}>
            <IonItem slot="header">
              <h1>{dest.name}</h1>
            </IonItem>

            <div className="flex flex-col gap-8 bg-gray-50 py-4" slot="content">
              {...activities}
            </div>
          </IonAccordion>
        );
      }),
    [story]
  );

  return <IonAccordionGroup>{...destinations}</IonAccordionGroup>;
}
export default Story;
