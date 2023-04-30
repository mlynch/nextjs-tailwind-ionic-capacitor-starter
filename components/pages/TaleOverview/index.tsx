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
  IonBackButton,
} from '@ionic/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTale, currentTaleIdState, currentTaleStory } from '../../../states/explore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Story from './Story';

enum Segments {
  thingsToDo = 'Things To Do',
  story = 'Story',
}

const TaleOverview = () => {
  const [currentTaleId, setCurrenetTaleId] = useRecoilState(currentTaleIdState);
  const taleStory = useRecoilValue(currentTaleStory);
  const tale = useRecoilValue(currentTale);
  const [segment, setSegment] = useState<Segments>(Segments.story);
  let { taleId } = useParams();

  useEffect(() => () => setCurrenetTaleId(null), []);

  if (currentTaleId != taleId) setCurrenetTaleId(Number(taleId));

  if (!tale) {
    return <div>no tail</div>;
  }

  const { title, catch_phrase, author, avatar_photo, cover_photo_url } = tale;
  return (
    <IonPage>
      <IonHeader className={``}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/explore"></IonBackButton>
          </IonButtons>
          <IonTitle className={'lg:text-center'}>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={''}>
        <img
          className="lg:h-96 lg:w-3/6 m-auto object-cover sm:h-full sm:w-48"
          src={cover_photo_url}
        />
        <div className={'w-full'}>
          <IonSegment
            onIonChange={event => setSegment(event.detail.value as Segments)}
            value={segment}
          >
            <IonSegmentButton value={Segments.story}>
              <IonLabel>{Segments.story}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={Segments.thingsToDo}>
              <IonLabel>{Segments.thingsToDo}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        {segment === Segments.story && <Story story={taleStory} />}
      </IonContent>
    </IonPage>
  );
};

export default TaleOverview;
