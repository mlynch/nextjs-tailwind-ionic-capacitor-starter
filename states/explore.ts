import { atom } from 'recoil';

export const trips = atom<any>({
  key: 'trips',
  default: [
    {
      title: 'Two Weeks In Portugal',
      type: 'Vacation',
      text: 'We just got back from a trip to Portugal, and we had a great time...',
      author: 'Nir Klinger',
      authorAvatar: '/img/or.jpg',
      image: '/img/portugal.jpeg',
    },
    {
      title: 'Arctic Adventures',
      type: 'Blog',
      text:
        'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
      author: 'Max Lynch',
      authorAvatar: '/img/or.jpg',
      image: '/img/c2.avif',
    },
    {
      title: 'Frolicking in the Faroe Islands',
      type: 'Blog',
      text:
        'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
      author: 'Max Lynch',
      authorAvatar: '/img/or.jpg',
      image: '/img/c3.avif',
    },
  ],
});
