export const images = [
  '/img/c1.avif',
  '/img/c2.avif',
  '/img/c3.avif',
];

export type HomeItem = {
  id: number;
  title: string;
  type: string;
  text: string;
  author: string;
  authorAvatar: string;
  image: string;
};

export const homeItems: HomeItem[] = [
  {
    id: 1,
    title: 'Exploring Maui',
    type: 'Blog',
    text: 'We just got back from a trip to Maui, and we had a great time...',
    author: 'Max Lynch',
    authorAvatar: '/img/max.jpg',
    image: images[0],
  },
  {
    id: 2,
    title: 'Arctic Adventures',
    type: 'Blog',
    text:
      'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
    author: 'Max Lynch',
    authorAvatar: '/img/max.jpg',
    image: images[1],
  },
  {
    id: 3,
    title: 'Frolicking in the Faroe Islands',
    type: 'Blog',
    text:
      'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
    author: 'Max Lynch',
    authorAvatar: '/img/max.jpg',
    image: images[2],
  },
];

export type NotificationItem = {
  id: number;
  title: string;
  when: string;
};

export const notifications: NotificationItem[] = [
  { id: 1, title: 'New friend request', when: '6 hr' },
  { id: 2, title: 'Please change your password', when: '1 day' },
  { id: 3, title: 'You have a new message', when: '2 weeks' },
  { id: 4, title: 'Welcome to the app!', when: '1 month' },
];

export type ListItem = {
  name: string;
  done?: boolean;
}

export type TodoListItem = {
  name: string;
  id: string;
  items?: ListItem[];
}

// Some fake lists
export const lists: TodoListItem[] = [
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

export type Settings = {
  enableNotifications: boolean;
}

export const settings: Settings = {
  enableNotifications: true,
}
