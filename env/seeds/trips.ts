import { Knex } from 'knex';
import parse from 'postgres-interval';

import {
  Activities,
  ActivityMedia,
  MediaType,
  Table,
  TripDestinations,
  Trips,
  Users,
  UsersTrips,
} from '../../types/db-schema-definitions';

const trips: Trips[] = [
  {
    trip_id: 1,
    title: 'Two Weeks In Portugal',
    catch_phrase: 'We just got back from a trip to Portugal, and we had a great time...',
    cover_photo_url: '/img/portugal.jpeg',
    created_by: 1,
    start_date: new Date(2022, 10, 5, 0, 0, 0, 0),
    end_date: new Date(2022, 10, 22, 0, 0, 0, 0),
  },
  {
    trip_id: 2,
    title: 'Arctic Adventures',
    catch_phrase:
      'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
    cover_photo_url: '/img/c2.avif',
    created_by: 1,
    start_date: new Date(2022, 3, 5, 0, 0, 0, 0),
    end_date: new Date(2022, 3, 22, 0, 0, 0, 0),
  },
  {
    trip_id: 3,
    title: 'Frolicking in the Faroe Islands',
    catch_phrase:
      'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
    cover_photo_url: '/img/c3.avif',
    created_by: 1,
    start_date: new Date(2022, 1, 7, 0, 0, 0, 0),
    end_date: new Date(2022, 1, 12, 0, 0, 0, 0),
  },
];

const users: Users[] = [
  {
    user_id: 1,
    email: 'nirkl@mta.ac.il',
    first_name: 'Nir',
    last_name: 'Klinger',
    avatar_photo: '/img/or.jpg',
  },
  {
    user_id: 2,
    email: 'orSamu@mta.ac.il',
    first_name: 'Or',
    last_name: 'Samu',
    avatar_photo: '/img/or.jpg',
  },
  {
    user_id: 3,
    email: 'darEini@mta.ac.il',
    first_name: 'Dar',
    last_name: 'Eini',
    avatar_photo: '/img/or.jpg',
  },
];

const usersTrips: UsersTrips[] = [
  {
    id: 1,
    user_id: 1,
    trip_id: 1,
  },
  {
    id: 2,
    user_id: 2,
    trip_id: 2,
  },
  {
    id: 3,
    user_id: 3,
    trip_id: 3,
  },
];

const destinations: TripDestinations[] = [
  { id: 1, trip_id: 1, first_day: 1, last_day: 3, name: 'Porto' },
  { id: 2, trip_id: 1, first_day: 3, last_day: 5, name: 'Douro Vali' },
  { id: 3, trip_id: 1, first_day: 6, last_day: 10, name: 'Ericeira' },
  { id: 4, trip_id: 1, first_day: 11, last_day: 13, name: 'Milfontes' },
  { id: 5, trip_id: 1, first_day: 13, last_day: 15, name: 'Lagos' },
  { id: 6, trip_id: 1, first_day: 15, last_day: 17, name: 'Lisbon' },
];

const activities: Activities[] = [
  {
    id: 1,
    destination_id: 1,
    duration: parse('03:00:00').toPostgres(),
    name: 'free walking tour',
    description:
      'A tour where we will show you the most important monuments in the city and with the experience of our guides, you will fall in love with the city of Porto and its exciting culture and history. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our guides with vast experience, in love with history, will be conducting the Essential Porto Symphony,and with their knowledge of the art and culture of Porto, will accompany us on an essential tour, in addition to advising you with your doubts. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our local guides with vast experience running tours will be waiting for you.',
    day_index: 1,
    sequential_number: 1,
  },
  {
    id: 2,
    destination_id: 1,
    duration: parse('02:00:00').toPostgres(),
    name: 'Sunset at Jardin do Morro',
    description:
      'The most beautiful sunsets in Jardim do Morro.\n' +
      'Jardim do Morro is a “must see” point on any traveler’s list when visiting the area. Located on the hill in Vila Nova de Gaia. This special place offers a beautiful viewpoint of Porto along the river bank and the famous Pont Luis I bridge. It is the Douro River that separates two cities – Vila Nova de Gaia and Porto. What’s more, such a location gives You the best opportunity to admire the panorama of both cities during sunsets. Some people believe that these are the most beautiful sunsets in Portugal and even Europe.\n' +
      'No wonder that hundreds of tourists from all over the world come to Jardim do Morro every day to enjoy the view and take commemorative photos. During sunny days and sunsets, the place is always bustling with life, and sometimes it’s hard to find a place to sit. This wonderfully romantic view is available completely free of charge. You can also hear artists there who make the atmosphere of the place even more magical. It is a place for everyone, groups of young people, married couples, families with children or retirees. Everyone feels good there and can relax. There is a small playground in the park, where children can find their place while parents rest on the grass. Nevertheless, if you are not a fan of sitting on the grass, there are also benches in the park.\n' +
      'On weekends and special events, food trucks from different types of cuisine come to Jarrdim do Moro. Sometimes also fairs or other events with live music are organized in the this place. Along the section of Avenida da República, next to the park, there is a subway that can take you to both Porto and Vila Nova de Gaia. It is a very good point for further sightseeing. An interesting alternative to get to the garden is to take the cable car along the river in Vila Nova de Gaia. The most beautiful sunsets in Jardim do Morro. Staying in Jardim do Morro will be an unforgettable experience and the sunset will probably be the most beautiful you will ever see.',
    day_index: 1,
    sequential_number: 2,
  },
  {
    id: 3,
    destination_id: 1,
    duration: parse('03:00:00').toPostgres(),
    name: 'free walking tour',
    description:
      'A tour where we will show you the most important monuments in the city and with the experience of our guides, you will fall in love with the city of Porto and its exciting culture and history. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our guides with vast experience, in love with history, will be conducting the Essential Porto Symphony,and with their knowledge of the art and culture of Porto, will accompany us on an essential tour, in addition to advising you with your doubts. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our local guides with vast experience running tours will be waiting for you.',
    day_index: 2,
    sequential_number: 3,
  },
  {
    id: 4,
    destination_id: 1,
    duration: parse('03:00:00').toPostgres(),
    name: 'payed walking tour',
    description:
      'A tour where we will show you the most important monuments in the city and with the experience of our guides, you will fall in love with the city of Porto and its exciting culture and history. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our guides with vast experience, in love with history, will be conducting the Essential Porto Symphony,and with their knowledge of the art and culture of Porto, will accompany us on an essential tour, in addition to advising you with your doubts. We will meet you at Gomes Teixeira Square (next to the fascinating Lello Bookstore), where our local guides with vast experience running tours will be waiting for you.',
    day_index: 2,
    sequential_number: 4,
  },
];

const activityMedia: ActivityMedia[] = [
  {
    id: 1,
    activity_id: 1,
    media_type: MediaType.Image,
    media_url: '/img/freeWalk1.jpg',
  },
  {
    id: 2,
    activity_id: 1,
    media_type: MediaType.Image,
    media_url: '/img/freeWalk2.jpg',
  },
  {
    id: 3,
    activity_id: 1,
    media_type: MediaType.Image,
    media_url: '/img/freeWalk3.jpg',
  },
  {
    id: 4,
    activity_id: 1,
    media_type: MediaType.Image,
    media_url: '/img/freeWalk4.jpg',
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(Table.Trips).del();
  await knex(Table.Users).del();
  await knex(Table.UsersTrips).del();

  await knex.insert(trips).into(Table.Trips);
  await knex.insert(users).into(Table.Users);
  await knex.insert(usersTrips).into(Table.UsersTrips);
  await knex.insert(destinations).into(Table.TripDestinations);
  await knex.insert(activities).into(Table.Activities);
  await knex.insert(activityMedia).into(Table.ActivityMedia);
  await knex.raw(`select setval(\'trips_trip_id_seq\', max(trip_id)) from ${Table.Trips}`);
  await knex.raw(`select setval(\'users_user_id_seq\', max(user_id)) from ${Table.Users}`);
  await knex.raw(`select setval(\'users_trips_id_seq\', max(id)) from ${Table.UsersTrips}`);
  await knex.raw(
    `select setval(\'trip_destinations_id_seq\', max(id)) from ${Table.TripDestinations}`
  );
  await knex.raw(`select setval(\'activities_id_seq\', max(id)) from ${Table.Activities}`);
  await knex.raw(`select setval(\'activity_media_id_seq\', max(id)) from ${Table.ActivityMedia}`);
}
