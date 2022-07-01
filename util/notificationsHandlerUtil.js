import { Dialog } from '@capacitor/dialog';

export default async function notificationHandler(notification) {
	// type of notification is ActionPerformed
	switch(notification.notification.data.campaign_id) {
		case "30OFF": {
			await Dialog.alert({
				title: '30% off!',
				message: 'Your 30% off coupon is ready!',
			})

			break;
		}

		default: 
			console.log('No campaign id');
	}
}