import { getConnection } from '../db/connections';
import { Table, Tables } from '../../types/db-schema-definitions';

export async function getTales() {
  const connection = getConnection();
  const tales = await connection
    .select<Tables[Table.Trips & Table.Users][]>([`${Table.Trips}.*`, `${Table.Users}.*`])
    .from(Table.Trips)
    .join(Table.UsersTrips, `${Table.Trips}.trip_id`, `${Table.UsersTrips}.trip_id`)
    .join(Table.Users, `${Table.Users}.user_id`, `${Table.UsersTrips}.user_id`);
  return tales;
}
