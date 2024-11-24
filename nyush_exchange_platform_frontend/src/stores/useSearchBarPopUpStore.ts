import {create} from 'zustand';

interface UseSearchBarPopUpState {
  isSearchBarPopUpVisible: boolean;
  showSearchBarPopUp: () => void;
  hideSearchBarPopUp: () => void;
  searchText: string;
  setSearchText: (inputValue: string) => void;
}

export const useSearchBarPopUpStore = create<UseSearchBarPopUpState>((set) => ({
  isSearchBarPopUpVisible: false,
  showSearchBarPopUp: () => set({ isSearchBarPopUpVisible: true }),
  hideSearchBarPopUp: () => set({ isSearchBarPopUpVisible: false }),
  searchText: "",
  setSearchText: (inputValue: string) => set({searchText: inputValue}),
}));
