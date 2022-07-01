import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import { useInfiniteHits } from 'react-instantsearch-hooks-web';
import imgixUtil from '../util/imgixUtil';

const CustomInfiniteHits = (props) => {
  const { hits, showMore } = useInfiniteHits(props);

  return (
		<>
			<ul className='grid grid-cols-2 gap-2'>
				{hits.map(hit => (
					<li key={hit.objectID} className='w-full rounded overflow-hidden p-2 bg-gray-100 relative'>
						<IonImg src={hit.images
							? imgixUtil.getImgSrc({
								url: hit.images[0].src,
								ratio: 'square',
								opts: {
									bg: 'f3f4f6',
									fit: 'fill',
								},
							})
							: 'https://s3.amazonaws.com/logos.ecountabl.com/49c44803-4f5d-4d4c-a943-d98ed18254a9-thrilling.png'}
							className='w-full'
						/>

						<IonButton
							fill='clear'
							size='small'
							className='absolute right-0 bottom-1 text-black'
						>
							<IonIcon icon={heartOutline} size='small' />
						</IonButton>
					</li>
				))}
			</ul>
			
			<IonButton expand='full' color='dark' className='mt-4 square-border' onClick={() => showMore()}>Show More</IonButton>
		</>
	);
};

export default CustomInfiniteHits;