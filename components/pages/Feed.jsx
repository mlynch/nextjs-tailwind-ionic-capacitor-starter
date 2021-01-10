import Card from '../ui/Card';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { homeItems } from '../../store';

const FeedCard = ({ title, type, text, author, authorAvatar, image }) => (
  <Card className="my-4 mx-auto">
    <div>
      <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{text}</p>
      <div className="flex items-center space-x-4">
        <img src={authorAvatar} className="rounded-full w-10 h-10" />
        <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
      </div>
    </div>
  </Card>
);

const Home = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Feed</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding" fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      {homeItems.map((i, index) => (
        <FeedCard {...i} key={index} />
      ))}
    </IonContent>
  </IonPage>
);

export default Home;
