import { getTaleActivities, getTaleDestinations, getTales, insertNewTale } from '../dal/tales';
import { Trips } from '../../types/db-schema-definitions';

export async function getAllTales() {
  return getTales();
}

export async function getTaleStory(taleId: number) {
  const [destinations, activities] = await Promise.all([
    getTaleDestinations(taleId),
    getTaleActivities(taleId),
  ]);
  return {
    destinations,
    activities,
  };
}

export const createNewTale = async (newTale: Omit<Trips, "trip_id">) => {
  const newTaleId = await Promise.all([
    insertNewTale(newTale),
  ]);
  return newTaleId[0];
}


