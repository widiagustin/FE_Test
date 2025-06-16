import { create } from 'zustand';

interface NavbarState {
  isCollapsed: boolean;
  toggleNavbar: () => void;
}

export const useNavbarStore = create<NavbarState>()((set) => ({
  isCollapsed: false,
  toggleNavbar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
