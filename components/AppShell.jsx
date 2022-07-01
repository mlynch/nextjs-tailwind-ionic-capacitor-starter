import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import * as braze from "@braze/web-sdk";

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Tabs from './pages/Tabs';
import Feed from './pages/Feed';
import Lists from './pages/Lists';

setupIonicReact({});

window.braze = braze;

braze.initialize('cc3c7bb8-9155-42fc-91ae-e9a2cdba623a', {
    baseUrl: "sdk.iad-05.braze.com",
	enableLogging: true
});

braze.openSession();

braze.changeUser('sarah@zzzz.com');

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
    try {
        await StatusBar.setStyle({
            style: status.matches ? Style.Dark : Style.Light,
        });
    } catch { }
});

const AppShell = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <Tabs />
            </IonReactRouter>
        </IonApp>
    );
};

export default AppShell;
