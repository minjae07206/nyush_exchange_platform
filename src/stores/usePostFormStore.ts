import {create} from 'zustand';
interface UsePostFormState {
    title: string;
    setTitle: (inputString:string) => void;
  }
  

export const usePostFormStore = create<UsePostFormState>((set) => ({
    title: "",
    setTitle: (inputString:string) => set({ title: inputString }),
  }));