import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';
import parse, { IPostgresInterval } from 'postgres-interval';

import {
  Activities,
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
  await knex.raw(`select setval(\'trips_trip_id_seq\', max(trip_id)) from ${Table.Trips}`);
  await knex.raw(`select setval(\'users_user_id_seq\', max(user_id)) from ${Table.Users}`);
  await knex.raw(`select setval(\'users_trips_id_seq\', max(id)) from ${Table.UsersTrips}`);
  await knex.raw(
    `select setval(\'trip_destinations_id_seq\', max(id)) from ${Table.TripDestinations}`
  );
  await knex.raw(`select setval(\'activities_id_seq\', max(id)) from ${Table.Activities}`);
}
