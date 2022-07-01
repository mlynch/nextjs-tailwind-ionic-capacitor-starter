import { IonCheckbox, IonItem, IonLabel, IonList } from '@ionic/react';
import { useRefinementList } from 'react-instantsearch-hooks-web';

const CustomRefinementList = (props) => {
	const { items } = useRefinementList(props);

	return (
		<IonList>
			{items.map(item => (
				<IonItem key={item.label}>
					<IonLabel>{item.label}</IonLabel>
					<IonCheckbox slot='start' value={item.value} checked={item.isRefined} />
				</IonItem>
			))}
		</IonList>
	);
};

export default CustomRefinementList;