import { usePostFormStore, UsePostFormState, getInitialSellBuyByDate } from "stores/usePostFormStore"
export const useResetPostForm = () => {
    const {
        setTitle,
        setTitleError,
        setCurrency,
        setDescription,
        setImageFiles,
        setImagePreviews,
        setPrice,
        setQuantity,  // Assuming you have a setter for quantity as well
        setSellBuyByDate, // If applicable
        setSubmitType, // If applicable
        setTotalOrPerItem, // If applicable
        setOpenToNegotiate // If applicable
    } = usePostFormStore();

    const resetPostForm = () => {
        setTitle("");
        setTitleError(null);
        setDescription("");
        setPrice("");
        setCurrency("¥");
        setQuantity("1");
        setSellBuyByDate(getInitialSellBuyByDate());
        setImageFiles([]);
        setImagePreviews([]);
        setOpenToNegotiate(false);
        setTotalOrPerItem("Total price");
        setSubmitType("");
    };

    return resetPostForm;

}