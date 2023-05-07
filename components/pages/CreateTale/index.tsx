import React, { useCallback, useEffect, useState } from 'react';
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
  IonIcon,
  IonThumbnail,
  IonImg,
  IonList,
} from '@ionic/react';
import { cameraOutline, closeOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';

import Card from '../../ui/Card';
import { Directory } from '@capacitor/filesystem';

import { LocalFile, NewTrip } from '../../../types/types';

const coverPhotoUrl = '/img/c2.avif';
const IMAGE_DIR = 'stored-images';

const CreateTale = () => {
  const [tripName, setTripName] = useState('');
  const [isTripNameValid, setIsTripNameValid] = useState(false);
  const [catchphrase, setCatchphrase] = useState('');
  const [isCatchphraseValid, setIsCatchphraseValid] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatesValid, setIsDatesValid] = useState(false);

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<LocalFile>({ name: '', path: '', data: '' });

  const router = useIonRouter();

  useEffect(() => {
    loadPhoto();
  }, []);

  useEffect(() => {
    setIsFileSelected(false);
    if (coverPhoto.name !== '') {
      setIsFileSelected(true);
    }
  }, [coverPhoto.name]);

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

  const selectPhoto = useCallback(async () => {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    if (photo) {
      savePhoto(photo);
    }
  }, []);

  const savePhoto = async (photo: Photo) => {
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: photo.base64String,
    });
    loadPhoto();
  };

  const loadPhoto = useCallback(async () => {
    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    })
      .then(
        result => {
          console.log(`reading directory, result: ${JSON.stringify(result.files)}`);
          const fileNames = result.files.map(file => {
            return file.name;
          });
          if (fileNames.length > 0) {
            loadFileData(fileNames);
          }
        },
        async err => {
          console.log(`error - ${err}`);
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: IMAGE_DIR,
          });
        }
      )
      .then(() => {});
  }, []);

  const loadFileData = useCallback(async (fileNames: string[]) => {
    const fileName = fileNames[fileNames.length - 1];
    const filePath = `${IMAGE_DIR}/${fileName}`;
    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path: filePath,
    });
    setCoverPhoto({
      name: fileName,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    });
  }, []);

  const deletePhoto = useCallback(async () => {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: coverPhoto.path,
    });
    setCoverPhoto({ name: '', path: '', data: '' });
  }, [coverPhoto]);
  
  const createTaleHandler = async () => {
    if (isTripNameValid && isCatchphraseValid && isDatesValid) {
      const newTale: NewTrip = {
        title: tripName,
        catch_phrase: catchphrase,
        cover_photo: coverPhoto,
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
            <IonCard className="my-4 mx-auto p-4 gap-6 flex flex-col">
              <IonItem className="lg:shadow-md md:shadow-md" fill="outline">
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
              {isFileSelected ? (
                <IonList>
                  <IonItem>
                    <IonLabel>Selected Cover Photo:</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <IonImg src={coverPhoto.data}></IonImg>
                    </IonThumbnail>
                    <IonLabel>{coverPhoto.name}</IonLabel>
                    <IonButton slot="end" fill="clear" onClick={deletePhoto}>
                      <IonIcon icon={closeOutline}></IonIcon>
                    </IonButton>
                  </IonItem>
                </IonList>
              ) : (
                <IonItem>
                  <IonToolbar color="primary">
                    <IonButton fill="clear" expand="full" color="light" onClick={selectPhoto}>
                      <IonIcon icon={cameraOutline}></IonIcon>
                      Select A Cover Photo
                    </IonButton>
                  </IonToolbar>
                </IonItem>
              )}

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
