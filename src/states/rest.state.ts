import { Trump } from '../services/trump.service';
import { atom } from 'recoil';

interface RestState {
  cards: Trump[];
}

export const restState = atom<RestState | null>({
  key: 'REST_STATE',
  default: null,
});
