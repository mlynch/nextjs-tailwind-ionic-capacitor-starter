import { atom, selector } from 'recoil';
import { fetchTales, fetchTaleStory } from '../managers/tales-manager';
import { StoryResponse, Tale } from '../types/types';

export const tales = selector<Tale[]>({
  key: 'tales',
  get: async ({ get }) => {
    const tales = await fetchTales();
    return tales;
  },
});

export const currentTaleIdState = atom<number>({
  key: 'currentTaleId',
  default: null,
});

export const currentTale = selector<Tale>({
  key: 'currentTale',
  get: async ({ get }) => {
    const taleId = get(currentTaleIdState);
    const allTales = get(tales);
    return allTales.find(tale => tale.trip_id === taleId);
  },
});

export const currentTaleStory = selector<StoryResponse>({
  key: 'currentTaleStory',
  get: async ({ get }) => {
    const taleId = get(currentTaleIdState);
    if (taleId) return await fetchTaleStory(taleId);
  },
});
