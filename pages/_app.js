import Head from 'next/head';
import Script from 'next/script';

import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { PushNotifications } from '@capacitor/push-notifications';
import '../styles/global.css';
import '../styles/variables.css';
import { Capacitor } from '@capacitor/core';

function MyApp({ Component, pageProps }) {

	const addListeners = async () => {
		await PushNotifications.addListener('registration', token => {
			console.info('Registration token: ', token.value);
		});

		await PushNotifications.addListener('registrationError', err => {
			console.error('Registration error: ', err.error);
		});

		await PushNotifications.addListener('pushNotificationReceived', notification => {
			console.log('Push notification received: ', notification);
		});

		await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
			console.log('Push notification action performed', notification.actionId, notification.inputValue);
		});
	}

	const registerNotifications = async () => {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive === 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
	}

	const getDeliveredNotifications = async () => {
		const notificationList = await PushNotifications.getDeliveredNotifications();
		console.log('delivered notifications', notificationList);
	}

	if (Capacitor.isPluginAvailable('PushNotifications')) {
		addListeners();
		registerNotifications();
		getDeliveredNotifications();
	}

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				></meta>
			</Head>
			<Component {...pageProps} />
			<div id="autocomplete"></div>

			<Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>
		</>
	);
}

export default MyApp;
