import { Store as PullStateStore } from 'pullstate';

const Store = new PullStateStore({
  showMenu: false,
  showNotifications: false,
});

export default Store;
