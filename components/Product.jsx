import { useState } from 'react';
import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { heartOutline, heart } from 'ionicons/icons';
import imgixUtil from '../util/imgixUtil';
import axios from 'axios';

const Product = (props) => {
	const { hit } = props;
	const [favorite, setfavorite] = useState(false);

	const sendFavorites = async (product) => {
		setfavorite(!favorite);
		const userLoggedin = true;
	
		if (userLoggedin){
	
			const data = JSON.stringify({
				"attributes": [
				  {
					"external_id": "sarah@zzzz.com",
					"favorites": [
					  {
						"id": hit.id,
						"date": new Date(),
						"title": hit.title,
						"sku": hit.sku
					  }
					]
				  }
				]
			  });
		
			const config = {
				method: 'post',
				url: 'https://rest.iad-05.braze.com/users/track',
				headers: { 
				  'Content-Type': 'application/json', 
				  'Authorization': 'Bearer 5412080e-83f1-4c4e-8d6a-9ef38d0847dd'
				},
				data
			  };
		
			axios(config)
				.then(function (response) {
				console.log(JSON.stringify(response.data));
				})
				.catch(function (error) {
				console.log(error);
				});
	
	
		}else {
			console.log("add module to prompt user to sign up or log in")
		}
	
	}

	return (
		<li
		key={hit.objectID}
		className="w-full rounded overflow-hidden p-2 bg-gray-100 relative"
		>
		<IonImg
			src={
			hit.images
				? imgixUtil.getImgSrc({
					url: hit.images[0].src,
					ratio: 'square',
					opts: {
					bg: 'f3f4f6',
					fit: 'fill',
					},
				})
				: 'https://s3.amazonaws.com/logos.ecountabl.com/49c44803-4f5d-4d4c-a943-d98ed18254a9-thrilling.png'
			}
			className="w-full"
		/>

		<IonButton onClick={() => sendFavorites(hit)} fill="clear" size="small" className="absolute right-0 bottom-1 text-black">
			<IonIcon icon={favorite ? heart : heartOutline} size="small" />
		</IonButton>
		</li>
	)
}

export default Product;