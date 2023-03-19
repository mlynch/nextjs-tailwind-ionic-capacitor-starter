// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

export enum Table {
  Trips = 'travel_tales.trips',
  Users = 'travel_tales.users',
  UsersTrips = 'travel_tales.users_trips',
}

export type Tables = {
  'travel_tales.trips': Trips;
  'travel_tales.users': Users;
  'travel_tales.users_trips': UsersTrips;
};

export type Trips = {
  trip_id: number;
  title: string;
  catch_phrase: string;
  cover_photo_url: string;
  created_by: number;
};

export type Users = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar_photo: string;
};

export type UsersTrips = {
  id: number;
  user_id: number;
  trip_id: number;
};
