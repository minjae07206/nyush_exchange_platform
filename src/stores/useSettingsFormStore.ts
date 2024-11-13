import { create } from 'zustand';
export interface UseSettingsFormState {
    formError: string | null;
    formSuccess: string | null;
    setFormError: (inputValue: string | null) => void;
    setFormSuccess: (inputValue: string | null) => void;
    currentUsername: string;
    setCurrentUsername: (inputValue: string) => void;
    currentUsernameError: string | null;
    setCurrentUsernameError: (inputValue: string | null) => void;
    email: string;
    setEmail: (inputValue:string) => void;
    profileImageURL: string;
    setProfileImageURL: (inputValue:string) => void;
    wechatQRCodeImageURL: string;
    setWechatQRCodeImageURL: (inputValue: string) => void;
    profileImageFile: File | null;
    setProfileImageFile: (inputValue: File | null) => void;
    wechatQRCodeImageFile: File | null;
    setWechatQRCodeImageFile: (inputValue: File | null) => void;
    isAdmin: boolean;
    setIsAdmin: (inputValue: boolean) => void;

    profileImageFileSizeError: string | null;
    setProfileImageFileSizeError: (inputValue: string | null) => void;
    wechatQRCodeImageFileSizeError: string | null;
    setWechatQRCodeImageFileSizeError: (inputValue: string | null) => void;
}


export const useSettingsFormStore = create<UseSettingsFormState>((set) => ({
    currentUsername: "",
    setCurrentUsername: (inputValue: string) => set({ currentUsername: inputValue }),
    email: "",
    setEmail: (inputValue: string) => set({ email: inputValue}),
    currentUsernameError: null,
    setCurrentUsernameError: (inputValue: string | null) => set({currentUsernameError: inputValue}),
    profileImageURL: "",
    setProfileImageURL: (inputValue:string) => set({profileImageURL: inputValue}),
    wechatQRCodeImageURL: "",
    setWechatQRCodeImageURL: (inputValue: string) => set({wechatQRCodeImageURL: inputValue}),
    profileImageFile: null,
    setProfileImageFile: (inputValue: File | null) => set({profileImageFile: inputValue}),
    wechatQRCodeImageFile: null,
    setWechatQRCodeImageFile: (inputValue: File | null) => set({wechatQRCodeImageFile: inputValue}),
    isAdmin: false,
    setIsAdmin: (inputValue: boolean) => set({isAdmin: inputValue}),
    formError: null,
    formSuccess: null,
    setFormError: (inputValue: string | null) => set({ formError: inputValue }),
    setFormSuccess: (inputValue: string | null) => set({ formSuccess: inputValue }),
    profileImageFileSizeError: null,
    setProfileImageFileSizeError: (inputValue: string | null) => set({ profileImageFileSizeError: inputValue }),
    wechatQRCodeImageFileSizeError: null,
    setWechatQRCodeImageFileSizeError: (inputValue: string | null) => set({ wechatQRCodeImageFileSizeError: inputValue }),

}));

