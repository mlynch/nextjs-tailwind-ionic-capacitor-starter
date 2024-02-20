import Store from '.';
import { ListItem, Settings, TodoListItem } from '../mock';

export const setMenuOpen = (open: boolean) => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = (open: boolean) => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setSettings = (settings: Settings) => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list: TodoListItem, item: ListItem, done: boolean) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    const items = o.lists[listIndex].items;
    if(!items) return;
    const itemIndex = items.findIndex(i => i === item);
    const item = items[itemIndex];
    item.done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};
