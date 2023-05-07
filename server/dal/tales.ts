import fs from 'fs';
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
import AWS from 'aws-sdk'

const ImageFilePath = 'public\\img\\';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

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
    const filePath = ImageFilePath + fileName;
    await fs.promises.writeFile(filePath, buffer);
  } else {
    try {
      console.log("###############################");
      console.log("trying to upload to amazon.....");
      console.log(s3);      
      const aws_response = await s3.putObject({
        Bucket: "travel-tales-s3", // The name of the bucket. For example, 'sample-bucket-101'.
        Key: "hello-world.txt", // The name of the object. For example, 'sample_upload.txt'.
        Body: buffer, // The content of the object. For example, 'Hello world!".
      });
      await aws_response.send();
      console.log(aws_response);
      console.log("###############################");
    }
    catch (error) {
      console.log(`failed to upload to amazon: ${error}`);
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
