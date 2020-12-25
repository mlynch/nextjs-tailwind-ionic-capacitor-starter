import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import Button from './ui/Button';
import Icon from './ui/Icon';
import List from './ui/List';
import ListItem from './ui/ListItem';
import VirtualScroll from './ui/VirtualScroll';

const NotificationItem = ({ i }) => (
  <ListItem className="flex align-center">
    <img
      src={`/img/faces/image-${(i % 66) + 1}.png`}
      alt="Notification"
      className="block rounded-full w-8 h-8 mr-4"
    />
    <div className="flex-1">
      <span className="p-0 m-0 align-middle">You have a new friend request</span>
    </div>
    <div>
      <Button className="background-transparent px-1 py-1 text-green-400 text-lg">
        <Icon icon={checkmarkOutline} />
      </Button>
      <Button className="background-transparent px-1 py-1 text-red-400 text-lg">
        <Icon icon={closeOutline} />
      </Button>
    </div>
  </ListItem>
);

const Notifications = () => (
  <div className="w-full h-full flex flex-col">
    <div className="p-4">
      <h2 className="text-xl">Notifications</h2>
    </div>
    <List className="flex-1">
      <VirtualScroll
        totalCount={1000}
        overscan={200}
        style={{ height: '100%', width: '100%' }}
        itemContent={index => <NotificationItem i={index} />}
      />
    </List>
  </div>
);

export default Notifications;
