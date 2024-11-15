import {create} from 'zustand';

interface UseFilterState {
    postStatusOption: string;
    setPostStatusOption: (inputValue: string) => void;
    postCategoryOption: string;
    setPostCategoryOption: (inputValue: string) => void;
    negotiabilityOption: string;
    setNegotiabilityOption: (inputValue: string) => void;
    orderOption: string;
    setOrderOption: (inputValue: string) => void;
    buySellOption: string;
    setBuySellOption: (inputValue: string) => void;

}

export const useFilterStore = create<UseFilterState>((set) => ({
    postStatusOption: "All post statuses",
    setPostStatusOption: (inputValue: string) => set({postStatusOption: inputValue}),
    postCategoryOption: "All categories",
    setPostCategoryOption: (inputValue: string) => set({postCategoryOption: inputValue}),
    negotiabilityOption: "Select negotiability",
    setNegotiabilityOption: (inputValue: string) => set({negotiabilityOption: inputValue}),
    orderOption: "Latest first",
    setOrderOption: (inputValue: string) => set({orderOption: inputValue}),
    buySellOption: "All post types",
    setBuySellOption: (inputValue:string) => set({buySellOption: inputValue}),


}));
