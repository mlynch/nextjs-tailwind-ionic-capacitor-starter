import { Plugins } from '@capacitor/core';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from '@ionic/react';

const Menu = () => {
  const { StatusBar } = Plugins;

  const handleOpen = () => {
    StatusBar.setStyle({
      style: StatusBarStyle.Light,
    });
  };
  const handleClose = () => {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
  };

  return (
    <IonMenu side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonMenu>
  );
};

export default Menu;
