import React from 'react'
import {IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonMenuButton} from '@ionic/react';

export default function Accounts(){
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Accounts</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}
