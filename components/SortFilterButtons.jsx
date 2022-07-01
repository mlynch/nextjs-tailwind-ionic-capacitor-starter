import { IonButton, IonIcon, IonText } from "@ionic/react";
import { optionsOutline, swapVerticalOutline } from "ionicons/icons";

const SortFilterButtons = () => {
	return (
		<section className='flex bg-white py-2 divide-x divide-solid border-t border-b'>
			{['Sort', 'Filter'].map(v => (
				<IonButton
					key={v}
					id={v === 'Filter' && 'open-modal'}
					fill='clear'
					className='w-full font-semibold text-black m-0 h-7 rounded-none'
				>
					<IonIcon slot='start' icon={v === 'Sort' ? swapVerticalOutline : optionsOutline} size='small' />

					<IonText>
						{v}
					</IonText>
				</IonButton>
			))}
		</section>
	);
};

export default SortFilterButtons;
