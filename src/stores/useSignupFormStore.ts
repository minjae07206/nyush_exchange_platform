import {create} from 'zustand';
interface UseSignupFormState {
    email:string;
    username: string;
    password: string;
    confirmPassword: string;
    emailError: string | null;
    usernameError: string | null;
    passwordError: string | null;
    setEmail: (inputString:string) => void;
    setUsername: (inputString:string) => void;
    setPassword: (inputString:string) => void;
    setConfirmPassword: (inputString:string) => void;
    setEmailError: (inputValue: string | null) => void;
    setUsernameError: (inputValue: string | null) => void;
    setPasswordError: (inputValue: string | null) => void;
  }
  

export const useSignupFormStore = create<UseSignupFormState>((set) => ({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    setEmail: (inpuString:string) => set({ email: inpuString }),
    setUsername: (inputString:string) => set({ username: inputString }),
    setPassword: (inputString:string) => set({ password: inputString }),
    setConfirmPassword: (inputString:string) => set({ password: inputString }),
    emailError: null,
    usernameError: null,
    passwordError: null,
    setEmailError: (inputValue: string | null) => set({emailError: inputValue}),
    setUsernameError: (inputValue: string | null) => set({usernameError: inputValue}),
    setPasswordError: (inputValue: string | null) => set({passwordError: inputValue}),
  }));