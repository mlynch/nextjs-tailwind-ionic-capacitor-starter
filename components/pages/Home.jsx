import Card from '../ui/Card';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { homeItems } from '../../store';

const HomeCard = ({ title, type, text, author, image }) => (
  <Card className="my-4">
    <div>
      <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{text}</p>
    </div>
  </Card>
);

const Home = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Inbox</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      {homeItems.map((i, index) => (
        <HomeCard {...i} key={index} />
      ))}
    </IonContent>
  </IonPage>
);

export default Home;
