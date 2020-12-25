import Store from '.';

export const setPageById = id => {
  Store.update((s, o) => {
    s.currentPage = o.pages.find(p => p.id === id);
  });
};

export const setPage = page => {
  Store.update((s, o) => {
    s.currentPage = page;
  });
};

export const setMenuOpen = open => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = open => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setSettings = settings => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list, item, done) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    const itemIndex = o.lists[listIndex].items.findIndex(i => i === item);
    s.lists[listIndex].items[itemIndex].done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};

export const setSelectedList = list => {
  Store.update(s => {
    s.selectedList = list;
  });
};
