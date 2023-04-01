import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonItem,
  IonInput,
} from '@ionic/react';

import Card from '../../ui/Card';

const CreateTale = () => {
  const [tripName, setTripName] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(`tripName: ${tripName}, catchphrase: ${catchphrase}`);
    //need to send an axios call to server and create a new trip
  }

  return (
    <Card className="my-4 mx-auto">
      <form style={{ padding: '2vh 2vw', display: 'grid' }}>
        <div className="tripData">
          <div className="description" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="tripName">Trip Name</label>
            <input
              type="text"
              className="form-control"
              id="tripName"
              style={{ marginBottom: '1vh', border: '1px solid #b8c1cc', borderRadius: '5px' }}
              onChange={e => setTripName(e.target.value)}
            />
            <label htmlFor="catchphrase">Catchphrase</label>
            <input
              type="text"
              className="form-control"
              id="catchphrase"
              style={{ marginBottom: "1vh", border: "1px solid #b8c1cc", borderRadius: "5px" }}
              onChange={e => setCatchphrase(e.target.value)}
            />
            {/*<label htmlFor="coverPhoto">Cover Photo</label>
            <input
              type="text"
              className="form-control"
              id="coverPhoto"
              style={{ marginBottom: "1vh", border: "1px solid #b8c1cc", borderRadius: "5px" }}
              onChange={e => setCoverPhoto(e.target.value)}
            /> should check if we want to add this field at this part of the form*/}
          </div>
          <div className="dates" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              style={{ marginBottom: "1vh", border: "1px solid #b8c1cc", borderRadius: "5px" }}
              onChange={e => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              style={{ marginBottom: "1vh", border: "1px solid #b8c1cc", borderRadius: "5px" }}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button style={{ margin: "1vh 1vw", border: "1px solid #b8c1cc", borderRadius: "5px" }} onClick={onButtonClick} >Create Tale</button>
      </form>
    </Card>
  );
};

export default CreateTale;
