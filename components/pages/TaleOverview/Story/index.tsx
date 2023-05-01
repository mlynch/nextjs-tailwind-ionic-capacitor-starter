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
import { time, todayOutline } from 'ionicons/icons';
import PostgresInterval from 'postgres-interval';
import ImageTape from '../../../ui/ImageTape';
import { Activity } from './Activity';

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
          <Activity key={act.id} activity={act} />
        ));
        return (
          <IonAccordion key={dest.id} value={dest.name}>
            <IonItem slot="header">
              <h1>{dest.name}</h1>
              <div
                className={'h-full -mb-4 flex flex-row items-center gap-1 mx-4 text-lg font-medium'}
              >
                <span className={'underline italic'}>
                  days: {dest.first_day}-{dest.last_day}
                </span>
                <IonIcon color={'tertiary'} icon={todayOutline} />
              </div>
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
