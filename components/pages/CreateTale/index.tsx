import React, { useState } from 'react';
import {
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';

import Card from '../../ui/Card';

const CreateTale = () => {
  const [tripName, setTripName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [catchphrase, setCatchphrase] = useState('');
  const [isCatchphraseValid, setIsCatchphraseValid] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [isStartDateValid, setIsStartDateValid] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [isEndDateValid, setIsEndDateValid] = useState(false);

  const tripNameChangeHandler = e => {
    setTripName(e.target.value);
  };

  const catchphraseChangeHandler = e => {
    setCatchphrase(e.target.value);
  };

  const startDateChangeHandler = e => {
    const formattedDate = formatDate(e.target.value);

    setStartDate(formattedDate);
  };

  const endDateChangeHandler = e => {
    const formattedDate = formatDate(e.target.value);

    setEndDate(formattedDate);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  const createTaleHandler = () => {
    console.log("Submit process started");
    validateForm();
    console.log("Submit process ended");
  }

  const validateForm = () => {
    setIsNameValid(tripName ? true : false);
    setIsNameValid(catchphrase ? true : false);
    //setIsStartDateValid((startDate &&) ? true : false); //
  }

  return (
    <Card className="my-4 mx-auto">
      <IonCard className="my-4 mx-auto">
        <form style={{ padding: '2vh 2vw', display: 'grid' }}>
          <IonItem fill="outline">
            <IonLabel position="floating">Trip Name</IonLabel>
            <IonInput
              placeholder="Enter Trip Name..."
              id="tripName"
              onIonChange={tripNameChangeHandler}
              value={tripName}
            />
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Catchphrase</IonLabel>
            <IonInput
              placeholder="Enter Catchphrase..."
              id="catchphrase"
              onIonChange={catchphraseChangeHandler}
              value={catchphrase}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Start Date</IonLabel>
            <IonDatetimeButton datetime="startDatetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="startDatetime"
                presentation="date"
                onIonChange={startDateChangeHandler}
              ></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>End Date</IonLabel>
            <IonDatetimeButton datetime="endDatetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="endDatetime"
                presentation="date"
                onIonChange={endDateChangeHandler}
              ></IonDatetime>
            </IonModal>
          </IonItem>
          <IonButton onClick={createTaleHandler}>Create Your Tale</IonButton>
        </form>
      </IonCard>
    </Card>
  );
};

export default CreateTale;
