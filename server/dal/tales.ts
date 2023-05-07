import fs from 'fs';
import path from 'path';
import { getConnection } from '../db/connections';
import {
  Activities,
  ActivityMedia,
  Table,
  TripDestinations,
  Trips,
  Users,
} from '../../types/db-schema-definitions';
import { LocalFile, NewTrip } from '../../types/types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const ImageFilePath = 'public\\img\\';

const client = new S3Client({
  region: 'us-east-1',
});

export async function getTales() {
  const connection = getConnection();
  const tales = await connection
    .select<(Trips & Users)[]>([`${Table.Trips}.*`, `${Table.Users}.*`])
    .from(Table.Trips)
    .join(Table.UsersTrips, `${Table.Trips}.trip_id`, `${Table.UsersTrips}.trip_id`)
    .join(Table.Users, `${Table.Users}.user_id`, `${Table.UsersTrips}.user_id`);
  return tales;
}

export const insertNewTale = async (tale: NewTrip) => {
  const newTale: Omit<Trips, 'trip_id'> = {
    title: tale.title,
    catch_phrase: tale.catch_phrase,
    cover_photo_url: '/img/' + tale.cover_photo.name,
    created_by: tale.created_by,
    start_date: tale.start_date,
    end_date: tale.end_date,
  };
  const connection = getConnection();
  const taleId = await connection.insert(newTale, 'trip_id').into(Table.Trips);
  const userLinkObj = { user_id: tale.created_by, trip_id: taleId[0].trip_id };
  const userLink = await connection.insert(userLinkObj).into(Table.UsersTrips);
  return taleId[0];
};

export const saveTaleCoverPhoto = async (coverPhoto: LocalFile) => {
  const base64Data = coverPhoto.data.replace(/^data:image\/jpeg;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  saveCoverPhoto(buffer, coverPhoto.name);
};

const saveCoverPhoto = async (buffer: Buffer, fileName: string) => {
  const isDevEnvironment = process.env.NODE_ENV === 'development';
  if (!isDevEnvironment) {
    const ImageFilePath = path.join('public', 'img');
    const filePath = path.join(ImageFilePath, fileName);
    
    await fs.promises.writeFile(filePath, buffer);
  } else {
    const command = new PutObjectCommand({
      Bucket: 'travel-tales-s3',
      Key: fileName,
      Body: buffer,
    });
    try {
      console.log(
        `############################################# aws response: #############################################`
      );
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
};

export async function getTaleDestinations(taleId: number) {
  const connection = getConnection();
  const destinations = await connection
    .select<TripDestinations[]>(`${Table.TripDestinations}.*`)
    .from(Table.TripDestinations)
    .where('trip_id', taleId);
  return destinations;
}

export async function getTaleActivities(taleId: number) {
  const connection = getConnection();
  const activities = await connection
    .select<Activities[]>(`${Table.Activities}.*`)
    .from(Table.Activities)
    .join(
      Table.TripDestinations,
      `${Table.TripDestinations}.id`,
      `${Table.Activities}.destination_id`
    )
    .where(`${Table.TripDestinations}.trip_id`, taleId);
  return activities;
}

export async function getTaleActivityMedia(taleId: number) {
  const connection = getConnection();
  const media = await connection
    .select<ActivityMedia[]>(`${Table.ActivityMedia}.*`)
    .from(Table.Activities)
    .join(
      Table.TripDestinations,
      `${Table.TripDestinations}.id`,
      `${Table.Activities}.destination_id`
    )
    .join(Table.ActivityMedia, `${Table.Activities}.id`, `${Table.ActivityMedia}.activity_id`)
    .where(`${Table.TripDestinations}.trip_id`, taleId);
  return media;
}
