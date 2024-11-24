import {create} from 'zustand';
import axios from 'axios';
interface UseSessionState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    setIsLoggedIn: (input: boolean) => void;
    setIsAdmin: (input: boolean) => void;
    checkLoginSession: () => void;
    sessionExpirationTime: number;
    setSessionExpirationTime: (input:number)=>void;
  }
  

export const useSessionStore = create<UseSessionState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (input:boolean) => set({isLoggedIn: input}),
    isAdmin: false,
    setIsAdmin: (input:boolean) => set({isAdmin: input}),
    sessionExpirationTime: Date.now(),
    setSessionExpirationTime: (input:number) => set({sessionExpirationTime: input}),
    checkLoginSession: async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/auth/check-login', {
                withCredentials: true,
            });
            if (response.data.message === "session-alive") {
                set({ isLoggedIn: true });
            } else {
                set({ isLoggedIn: false });
            }
        } catch (error) {
            console.error("Session check failed:", error);
            set({ isLoggedIn: false });
        }
    },

    keepLoginSessionAlive: async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/keep-alive', {
                withCredentials: true,
            });
            if (response.data.message === "session-renewed") {
                set({ isLoggedIn: true });
            }
        } catch (error) {
            console.error("Failed to extend session:", error);
        }
    }
  }));