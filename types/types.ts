import { Activities, TripDestinations, Trips, Users } from './db-schema-definitions';

export type StoryResponse = {
  destinations: TripDestinations[];
  activities: Activities[];
};

export type TalesResponse = {
  tales: (Trips & Users)[];
};

export interface Tale extends Trips, Users {
  author: string;
}
