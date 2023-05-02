import { IonIcon, IonLabel } from '@ionic/react';
import { parseDuration } from '../../../../utils/converters';
import PostgresInterval from 'postgres-interval';
import { time } from 'ionicons/icons';
import ImageTape from '../../../ui/ImageTape';
import React from 'react';
import { ActivitiesWithMedia } from '../../../../types/types';

interface ActivityProps {
  activity: ActivitiesWithMedia;
}

export function Activity({ activity }: ActivityProps) {
  return (
    <div
      className={
        'border border-gray-400 rounded-md bg-blue-50 lg:shadow-lg md:shadow-lg px-4 mx-2 py-4'
      }
      key={activity.id}
    >
      <div className={'flex flex-row gap-2 text-lg font-medium'}>
        <IonLabel>{activity.name}</IonLabel>
        <div className={'flex flex-row gap-1 items-center'}>
          <IonLabel>
            {parseDuration(activity.duration as PostgresInterval.IPostgresInterval)}
          </IonLabel>
          <IonIcon color={'tertiary'} icon={time} />
        </div>
      </div>
      <div className={'mb-4'}>
        <p>{activity.description}</p>
      </div>
      <ImageTape media={activity.media} />
    </div>
  );
}
