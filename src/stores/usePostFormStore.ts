import { create } from 'zustand';
interface UsePostFormState {
  title: string;
  description: string;
  price: string;
  currency: string;
  quantity: string;
  sellBuyByDate: string;
  titleError: string | null;
  priceError: string | null;
  quantityError: string | null;
  sellBuyByDateError: string | null;
  setTitle: (inputString: string) => void;
  setDescription: (inpuString: string) => void;
  setPrice: (inputString: string) => void;
  setCurrency: (inputString: string) => void;
  setQuantity: (inputString: string) => void;
  setSellBuyByDate: (inputString: string) => void;
  setTitleError: (inputValue: string | null) => void;
  setPriceError: (inputValue: string | null) => void;
  setQuantityError: (inputValue: string | null) => void;
  setSellBuyByDateError: (inputValue: string | null) => void;

}
/**Doesn't take any attributes. Returns the default date that should be shown on the calendar as the post end date. */
function getInitialSellBuyByDate() {
// Get current date for calendar to set default value for "sell/buy by date" field.
const currentDate = new Date(); 
let endDate = new Date(currentDate); // Create a new Date object based on current date

// Set the end date to be +4 months from the current date
endDate.setMonth(currentDate.getMonth() + 4);

// Gets the date in YYYY-MM-DD format
const formattedEndDate = endDate.toISOString().split('T')[0]; 

return formattedEndDate;

}


export const usePostFormStore = create<UsePostFormState>((set) => ({
  title: "",
  setTitle: (inputString: string) => set({ title: inputString }),
  titleError: null,
  setTitleError: (inputValue: string | null) => set({titleError: inputValue}),
  description: "",
  setDescription: (inputString: string) => set({ description: inputString }),
  price: "",
  setPrice: (inputString: string) => set({ price: inputString }),
  priceError: null,
  setPriceError: (inputString: string | null) => set({ priceError: inputString }),
  currency: "¥",
  setCurrency: (inputString: string) => set({ currency: inputString }),
  quantity: "1",
  setQuantity: (inputString: string) => set({ quantity: inputString }),
  quantityError: null,
  setQuantityError: (inputString: string | null) => set({ quantityError: inputString }),
  sellBuyByDate: getInitialSellBuyByDate(),
  setSellBuyByDate: (inputString: string) => set({ sellBuyByDate: inputString }),
  sellBuyByDateError: null,
  setSellBuyByDateError: (inputString: string | null) => set({ sellBuyByDateError: inputString }),
  
}));