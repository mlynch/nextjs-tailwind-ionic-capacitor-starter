import { Plugins, StatusBarStyle } from '@capacitor/core';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

const Menu = () => {
  const { StatusBar } = Plugins;

  const [isDark, setIsDark] = useState(false);

  const handleOpen = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? StatusBarStyle.Light : StatusBarStyle.Dark,
      });
    } catch {}
  };
  const handleClose = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? StatusBarStyle.Dark : StatusBarStyle.Light,
      });
    } catch {}
  };

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

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
