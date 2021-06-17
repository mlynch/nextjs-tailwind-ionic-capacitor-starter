import { StatusBar, Style } from '@capacitor/status-bar';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { cog, flash, list } from 'ionicons/icons';

const pages = [
  {
    title: 'Feed',
    icon: flash,
    url: '/tabs/feed',
  },
  {
    title: 'Lists',
    icon: list,
    url: '/tabs/lists',
  },
  {
    title: 'Settings',
    icon: cog,
    url: '/tabs/settings',
  },
];

const Menu = () => {
  const [isDark, setIsDark] = useState(false);

  const handleOpen = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch {}
  };
  const handleClose = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
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
      <IonContent>
        <IonList>
          {pages.map((p, k) => (
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel>{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
