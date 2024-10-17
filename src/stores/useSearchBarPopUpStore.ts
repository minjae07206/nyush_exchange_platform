import {create} from 'zustand';

interface UseSearchBarPopUpState {
  isSearchBarPopUpVisible: boolean;
  showSearchBarPopUp: () => void;
  hideSearchBarPopUp: () => void;
}

export const useSearchBarPopUpStore = create<UseSearchBarPopUpState>((set) => ({
  isSearchBarPopUpVisible: false,
  showSearchBarPopUp: () => set({ isSearchBarPopUpVisible: true }),
  hideSearchBarPopUp: () => set({ isSearchBarPopUpVisible: false }),
}));
