import { getTaleActivities, getTaleDestinations, getTales } from '../dal/tales';

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
