import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';
import { Table, Trips, Users, UsersTrips } from '../../types/db-schema-definitions';

const trips: Trips[] = [
  {
    trip_id: 1,
    title: 'Two Weeks In Portugal',
    catch_phrase: 'We just got back from a trip to Portugal, and we had a great time...',
    cover_photo_url: '/img/portugal.jpeg',
    created_by: 1,
  },
  {
    trip_id: 2,
    title: 'Arctic Adventures',
    catch_phrase:
      'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
    cover_photo_url: '/img/c2.avif',
    created_by: 1,
  },
  {
    trip_id: 3,
    title: 'Frolicking in the Faroe Islands',
    catch_phrase:
      'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
    cover_photo_url: '/img/c3.avif',
    created_by: 1,
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

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(Table.Trips).del();
  await knex(Table.Users).del();
  await knex(Table.UsersTrips).del();

  await knex.insert(trips).into(Table.Trips);
  await knex.insert(users).into(Table.Users);
  await knex.insert(usersTrips).into(Table.UsersTrips);
  await knex.raw(`select setval(\'trips_trip_id_seq\', max(trip_id)) from ${Table.Trips}`);
  await knex.raw(`select setval(\'users_user_id_seq\', max(user_id)) from ${Table.Users}`);
  await knex.raw(`select setval(\'users_trips_id_seq\', max(id)) from ${Table.UsersTrips}`);
}
