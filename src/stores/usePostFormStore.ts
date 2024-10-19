import {create} from 'zustand';
interface UsePostFormState {
    title: string;
    description: string;
    price: string;
    currency: string;
    setTitle: (inputString:string) => void;
    setDescription: (inpuString:string) => void;
    setPrice: (inputString:string) => void;
    setCurrency: (inputString:string) => void;
  }
  

export const usePostFormStore = create<UsePostFormState>((set) => ({
    title: "",
    setTitle: (inputString:string) => set({ title: inputString }),
    description: "",
    setDescription: (inputString:string) => set( {description: inputString} ),
    price: "",
    setPrice: (inputString:string) => set( {price: inputString} ),
    currency: "¥",
    setCurrency: (inputString:string) => set( {currency: inputString} ),
  }));