import { getTales } from '../dal/tales';

export async function getAllTales() {
  return getTales();
}
