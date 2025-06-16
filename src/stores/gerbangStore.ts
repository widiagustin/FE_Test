import { create } from 'zustand';
import { GerbangData } from '@/types/gerbang';

type ModalMode = 'view' | 'edit' | 'create';

interface GerbangStore {
  isModalOpen: boolean;
  selectedGerbang: GerbangData | null;
  mode: ModalMode;
  openModal: (gerbang?: GerbangData, mode?: ModalMode) => void;
  closeModal: () => void;
}

export const useGerbangStore = create<GerbangStore>((set) => ({
  isModalOpen: false,
  selectedGerbang: null,
  mode: 'create',
  openModal: (gerbang, mode = 'create') =>
    set({
      isModalOpen: true,
      selectedGerbang: gerbang || null,
      mode,
    }),
  closeModal: () =>
    set({
      isModalOpen: false,
      selectedGerbang: null,
      mode: 'create',
    }),
}));
