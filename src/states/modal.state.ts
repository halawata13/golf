import { atom } from 'recoil';

interface ModalState {
  show: boolean;
}

export const modalState = atom<ModalState>({
  key: 'MODAL_STATE',
  default: {
    show: false,
  },
});
