import { Activities, ActivityMedia, TripDestinations, Trips, Users } from './db-schema-definitions';

export type StoryResponse = {
  destinations: TripDestinations[];
  activities: ActivitiesWithMedia[];
};

export type ActivitiesWithMedia = Activities & { media: Omit<ActivityMedia, 'activity_id'>[] };

export type TalesResponse = {
  tales: (Trips & Users)[];
};

export type CreateTaleResponse = { 
  trip_id: number;
};

export interface Tale extends Trips, Users {
  author: string;
}

export interface Photo {
  filePath: string;
  webviewPath?: string;
}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

export interface NewTrip extends Omit<Trips, 'trip_id' | 'cover_photo_url'> {
  cover_photo: LocalFile;
}


