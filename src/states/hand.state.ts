import { Trump } from '../services/trump.service';
import { atom } from 'recoil';

interface HandState {
  card: Trump;
}

export const handState = atom<HandState | null>({
  key: 'HAND_STATE',
  default: null,
});
