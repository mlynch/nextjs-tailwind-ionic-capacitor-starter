import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonBackButton,
} from '@ionic/react';
import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTale, currentTaleIdState } from '../../../states/explore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const TaleOverview = () => {
  const [currentTaleId, setCurrenetTaleId] = useRecoilState(currentTaleIdState);
  const tale = useRecoilValue(currentTale);
  let { taleId } = useParams();

  useEffect(() => () => setCurrenetTaleId(null), []);

  if (currentTaleId != taleId) setCurrenetTaleId(Number(taleId));

  if (!tale) {
    return <div>no tail</div>;
  }

  const { title, catch_phrase, author, avatar_photo, cover_photo_url } = tale;
  return (
    <IonPage>
      <IonHeader className={'flex flex-col items-center'}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className={'lg:text-center'}>{title}</IonTitle>
        </IonToolbar>
        <img className="lg:h-96 lg:w-3/4 object-cover sm:h-full sm:w-48" src={cover_photo_url} />
        <div className={'w-full'}>
          <IonSegment value="default">
            <IonSegmentButton value="default">
              <IonLabel>Story</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="segment">
              <IonLabel>Things To Do</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen></IonContent>
    </IonPage>
  );
};

export default TaleOverview;
