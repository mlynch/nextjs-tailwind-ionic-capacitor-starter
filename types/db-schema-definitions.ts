// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

import PostgresInterval from 'postgres-interval';

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

export enum Table {
  Activities = 'travel_tales.activities',
  ActivityMedia = 'travel_tales.activity_media',
  TripDestinations = 'travel_tales.trip_destinations',
  Trips = 'travel_tales.trips',
  Users = 'travel_tales.users',
  UsersTrips = 'travel_tales.users_trips',
}

export type Tables = {
  'travel_tales.activities': Activities;
  'travel_tales.activity_media': ActivityMedia;
  'travel_tales.trip_destinations': TripDestinations;
  'travel_tales.trips': Trips;
  'travel_tales.users': Users;
  'travel_tales.users_trips': UsersTrips;
};

export type Activities = {
  id: number;
  destination_id: number;
  duration: PostgresInterval.IPostgresInterval | string | null;
  name: string;
  description: string | null;
  day_index: number;
  sequential_number: number;
};

export type ActivityMedia = {
  id: number;
  activity_id: number;
  media_type: MediaType | null;
  media_url: string;
};

export type TripDestinations = {
  id: number;
  trip_id: number;
  first_day: number | null;
  last_day: number | null;
  name: string;
};

export type Trips = {
  trip_id: number;
  title: string;
  catch_phrase: string;
  cover_photo_url: string;
  created_by: number;
  start_date: Date;
  end_date: Date;
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
