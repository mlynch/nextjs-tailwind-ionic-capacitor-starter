import { Store as PullStateStore } from 'pullstate';

import { list, listOutline, cog, cogOutline, home, homeOutline } from 'ionicons/icons';

import Home from '../components/pages/Home';
import Lists from '../components/pages/Lists';
import Settings from '../components/pages/Settings';
import ListDetail from '../components/pages/ListDetail';

// The available pages here
const pages = [
  { id: 'home', title: 'Home', icon: homeOutline, selectedIcon: home, component: Home },
  {
    id: 'lists',
    title: 'Lists',
    icon: listOutline,
    selectedIcon: list,
    component: Lists,
  },
  {
    id: 'list-detail',
    title: () => Store.getRawState().selectedList?.name,
    icon: listOutline,
    selectedIcon: list,
    component: ListDetail,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: cogOutline,
    selectedIcon: cog,
    component: Settings,
  },
];

export const images = [
  'https://images.unsplash.com/photo-1608091526083-86ae8489ae5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  'https://images.unsplash.com/photo-1608050072262-7b26ba63fb46?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  'https://images.unsplash.com/photo-1607975218223-94f82613e833?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1608108707326-215150457c9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  'https://images.unsplash.com/photo-1608057681073-9399f209e773?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
];

export const homeItems = [
  {
    title: 'Welcome',
    type: 'Blog',
    text: 'Welcome to the app!',
    author: 'Max',
    image: images[0],
  },
  {
    title: 'How to get started',
    type: 'Article',
    text: 'Getting started with the app is easy! Just follow these 100 steps',
    author: 'Max',
    image: images[1],
  },
  {
    title: 'Need help?',
    type: 'Support',
    text: "We're here to help. Available between the hours of 3am and 3:01am every day",
    author: 'Max',
    image: images[2],
  },
];

// Some fake lists
const lists = [
  {
    name: 'Groceries',
    id: 'groceries',
    items: [{ name: 'Apples' }, { name: 'Bananas' }, { name: 'Milk' }, { name: 'Ice Cream' }],
  },
  {
    name: 'Hardware Store',
    id: 'hardware',
    items: [
      { name: 'Circular Saw' },
      { name: 'Tack Cloth' },
      { name: 'Drywall' },
      { name: 'Router' },
    ],
  },
  { name: 'Work', id: 'work', items: [{ name: 'TPS Report' }, { name: 'Set up email' }] },
  { name: 'Reminders', id: 'reminders' },
];

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: pages[0],
  pages,

  // The pages that are linked to tabs
  tabs: pages.filter(p => ['home', 'lists', 'settings'].indexOf(p.id) >= 0),
  // The pages that are linked to the menu
  menuLinks: pages.filter(p => ['home', 'lists', 'settings'].indexOf(p.id) >= 0),

  homeItems,
  lists,
  selectedList: null,
  settings: {
    enableNotifications: true,
  },
});

export default Store;
