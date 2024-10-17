import {create} from 'zustand';
interface UseLoginFormState {
    username: string;
    password: string;
    usernameError: string | null;
    passwordError: string | null;
    setUsername: (inputString:string) => void;
    setPassword: (inputString:string) => void;
    setUsernameError: (inputValue: string | null) => void;
    setPasswordError: (inputValue: string | null) => void;
  }
  

export const useLoginFormStore = create<UseLoginFormState>((set) => ({
    username: "",
    password: "",
    setUsername: (inputString:string) => set({ username: inputString }),
    setPassword: (inputString:string) => set({ password: inputString }),
    usernameError: null,
    passwordError: null,
    setUsernameError: (inputValue: string | null) => set({usernameError: inputValue}),
    setPasswordError: (inputValue: string | null) => set({passwordError: inputValue}),
  }));