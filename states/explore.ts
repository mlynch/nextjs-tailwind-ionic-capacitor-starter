import { selector } from 'recoil';
import { fetchTales, Tale } from '../managers/tales-manager';

export const tales = selector<Tale[]>({
  key: 'tales',
  get: async ({ get }) => {
    const tales = await fetchTales();
    return tales;
  },
});
