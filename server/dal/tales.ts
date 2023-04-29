import { getConnection } from '../db/connections';
import {
  Activities,
  Table,
  Tables,
  TripDestinations,
  Trips,
  Users,
} from '../../types/db-schema-definitions';

export async function getTales() {
  const connection = getConnection();
  const tales = await connection
    .select<(Trips & Users)[]>([`${Table.Trips}.*`, `${Table.Users}.*`])
    .from(Table.Trips)
    .join(Table.UsersTrips, `${Table.Trips}.trip_id`, `${Table.UsersTrips}.trip_id`)
    .join(Table.Users, `${Table.Users}.user_id`, `${Table.UsersTrips}.user_id`);
  return tales;
}

export const insertNewTale = async (tale: Omit<Trips, "trip_id">) => {
  const connection = getConnection();
  const taleId = await connection
    .insert(
      tale,
      'trip_id'
    )
    .into(Table.Trips);
  const userLinkObj = { user_id: tale.created_by, trip_id: taleId[0].trip_id };
  const userLink = await connection
      .insert(
        userLinkObj
      )
      .into(Table.UsersTrips);
   return taleId[0];
}

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
  const destinations = await connection
    .select<Activities[]>(`${Table.Activities}.*`)
    .from(Table.Activities)
    .join(
      Table.TripDestinations,
      `${Table.TripDestinations}.id`,
      `${Table.Activities}.destination_id`
    )
    .where(`${Table.TripDestinations}.trip_id`, taleId);
  return destinations;
}