import { fetchWrapper } from '../utils/fetchWrapper';
import { StatusCodes } from 'http-status-codes';
import { Trips, Users } from '../types/db-schema-definitions';
import { StoryResponse, Tale, TalesResponse } from '../types/types';

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
  const { tales } = (await res.json()) as TalesResponse;
  return tales.map(tale => ({ ...tale, author: `${tale.first_name} ${tale.last_name}` }));
}

export async function fetchTaleStory(taleId: number): Promise<StoryResponse> {
  const res = await fetchWrapper.get(`/api/tales/${taleId}/story`);
  if (!res.ok) {
    switch (res.status) {
      case StatusCodes.NOT_FOUND:
        throw new Error('no current tales exists');
        break;
      default:
        throw new Error('could not fetch tales');
    }
  }
  return (await res.json()) as StoryResponse;
}

export const createTale = async (tale: Tale): Promise<any> => {
  const res = { ok: true, status: 200 }; //await fetchWrapper.post('/api/tale', tale);
  console.log('I am here');
  if (!res.ok) {
    switch (res.status) {
      default:
        throw new Error('could not create a new tale');
    }
  }
};
