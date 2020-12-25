import Store from '../../store';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import Content from '../ui/Content';
import List from '../ui/List';
import ListItem from '../ui/ListItem';
import Toggle from '../ui/Toggle';

const Settings = ({ selected }) => {
  const enableNotifications = Store.useState();
  const settings = Store.useState(selectors.getSettings);

  return (
    <Content visible={selected} className="p-4 dark:bg-black">
      <List>
        <ListItem className="flex">
          <span className="text-md flex-1 dark:text-gray-200">Enable Notifications</span>
          <Toggle
            checked={settings.enableNotifications}
            onChange={e =>
              actions.setSettings({
                ...settings,
                enableNotifications: e.target.checked,
              })
            }
          />
        </ListItem>
      </List>
    </Content>
  );
};

export default Settings;
