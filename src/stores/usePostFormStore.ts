import {create} from 'zustand';
interface UsePostFormState {
    title: string;
    description: string;
    setTitle: (inputString:string) => void;
    setDescription: (inpuString:string) => void;
  }
  

export const usePostFormStore = create<UsePostFormState>((set) => ({
    title: "",
    setTitle: (inputString:string) => set({ title: inputString }),
    description: "",
    setDescription: (inputString:string) => set( {description: inputString} ),
  }));