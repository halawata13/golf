import { Trump } from '../services/trump.service';
import { atom } from 'recoil';

interface ColsState {
  cards: Trump[][];
}

export const colsState = atom<ColsState | null>({
  key: 'COLS_STATE',
  default: null,
});
