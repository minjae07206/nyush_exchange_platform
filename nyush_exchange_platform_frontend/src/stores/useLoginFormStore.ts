import {create} from 'zustand';
interface UseLoginFormState {
    usernameOrEmail: string;
    password: string;
    usernameOrEmailError: string | null;
    passwordError: string | null;
    formError: string | null;
    formSuccess: string | null;
    setUsernameOrEmail: (inputString:string) => void;
    setPassword: (inputString:string) => void;
    setUsernameOrEmailError: (inputValue: string | null) => void;
    setPasswordError: (inputValue: string | null) => void;
    setFormError: (inputValue: string | null) => void;
    setFormSuccess: (inputValue: string | null) => void;
  }
  

export const useLoginFormStore = create<UseLoginFormState>((set) => ({
    usernameOrEmail: "",
    password: "",
    setUsernameOrEmail: (inputString:string) => set({ usernameOrEmail: inputString }),
    setPassword: (inputString:string) => set({ password: inputString }),
    usernameOrEmailError: null,
    passwordError: null,
    formError: null,
    formSuccess: null,
    setUsernameOrEmailError: (inputValue: string | null) => set({usernameOrEmailError: inputValue}),
    setPasswordError: (inputValue: string | null) => set({passwordError: inputValue}),
    setFormError: (inputValue: string | null) => set({formError: inputValue}),
    setFormSuccess: (inputValue: string | null) => set({formSuccess: inputValue}),
  }));