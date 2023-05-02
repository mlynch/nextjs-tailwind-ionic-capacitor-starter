import React, { useEffect, useState } from 'react';
import { createTale } from '..//..//..//managers/tales-manager';
import { Trips } from '..//..//..//types/db-schema-definitions';
import {
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';

import Card from '../../ui/Card';

const coverPhotoUrl = '/img/c2.avif';

const CreateTale = () => {
  const [tripName, setTripName] = useState('');
  const [isTripNameValid, setIsTripNameValid] = useState(false);
  const [catchphrase, setCatchphrase] = useState('');
  const [isCatchphraseValid, setIsCatchphraseValid] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatesValid, setIsDatesValid] = useState(false);
  const router = useIonRouter();

  const validateDates = useEffect(() => {
    const isDatesValid = endDate >= startDate;

    setIsDatesValid(isDatesValid);
  }, [startDate, endDate]);

  const tripNameChangeHandler = e => {
    const newTripName = e.target.value;

    setTripName(newTripName);
    setIsTripNameValid(newTripName.trim().length > 0);
  };

  const catchphraseChangeHandler = e => {
    const newCatchphraseName = e.target.value;

    setCatchphrase(newCatchphraseName);
    setIsCatchphraseValid(newCatchphraseName.trim().length > 0);
  };

  const startDateChangeHandler = e => {
    const newDate = e.target.value;

    setStartDate(new Date(newDate));
  };

  const endDateChangeHandler = e => {
    const newDate = e.target.value;

    setEndDate(new Date(newDate));
  };

  const createTaleHandler = async () => {
    if (isTripNameValid && isCatchphraseValid && isDatesValid) {
      const newTale: Omit<Trips, 'trip_id'> = {
        title: tripName,
        catch_phrase: catchphrase,
        cover_photo_url: coverPhotoUrl,
        created_by: 1,
        start_date: startDate,
        end_date: endDate,
      };
      const newTaleId = await createTale(newTale);
      router.push(`/tabs/tale/${newTaleId}`, 'forward', 'replace');
    } else {
      console.log('not inserted - validation failed');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/lists" />
          </IonButtons>
          <IonTitle>{'Creating a New Tale'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Card className="my-4 mx-auto">
          <form>
            <IonCard className="my-4 mx-auto p-4 gap-3 flex flex-col">
              <IonItem className="lg:shadow-lg md:shadow-lg" fill="outline">
                <IonLabel position="floating">Trip Name</IonLabel>
                <IonInput
                  className="h-10"
                  placeholder="Enter Trip Name..."
                  id="tripName"
                  onIonChange={tripNameChangeHandler}
                  value={tripName}
                />
              </IonItem>
              <IonItem className="lg:shadow-lg md:shadow-lg" fill="outline">
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
            </IonCard>
          </form>
        </Card>
      </IonContent>
    </IonPage>
  );
};

export default CreateTale;
