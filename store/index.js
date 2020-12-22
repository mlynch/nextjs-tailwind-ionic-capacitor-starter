import { Store as PullStateStore } from 'pullstate';

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  showMenu: false,
  showNotifications: false,
});

export default Store;
