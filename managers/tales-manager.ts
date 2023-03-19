import { fetchWrapper } from '../utils/fetchWrapper';
import { StatusCodes } from 'http-status-codes';
import { Trips } from '../types/db-schema-definitions';

export interface Tale extends Trips {
  author: string;
  avatar_photo: string;
}

export async function fetchTales(): Promise<Tale[]> {
  const res = await fetchWrapper.get('/api/tales');
  if (!res.ok) {
    switch (res.status) {
      case StatusCodes.NOT_FOUND:
        throw new Error('no current tales exists');
        break;
      default:
        throw new Error('could not fetch tales');
    }
  }
  const tales = res.json();
  return tales.map(tale => ({ ...tale, author: `${tale.first_name} ${tale.last_name}` }));
}
