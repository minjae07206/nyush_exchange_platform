import Form from "components/forms/Form";
import FormHeader from "components/forms/FormHeader";
import Input from "components/forms/Input";
import FormItem from "components/forms/FormItem";
import FormLabel from "components/forms/FormLabel";
import InputError from "components/forms/InputError";
import InputDescription from "components/forms/InputDescription";
import Button from "components/Button";
import TextArea from "components/forms/TextArea";
import DropDownMenu from "components/filterAndSort/DropDownMenu";

import { useState } from "react";
import { usePostFormStore } from "stores/usePostFormStore";
// if the newOrEditFlag is not new, then it means it is edit.
interface PostFormProps {
    newOrEditFlag: string
}
export default function PostForm({ newOrEditFlag }: PostFormProps) {
    // Idea behind building the PostForm: The PostForm is used to build a new post, edit a post as well as saving as a draft.
    // There should be a save as a draft button which allows users to save it as a draft. In this case, only title field is required.
    // When editing a post, the default values should be fetched from the server and shown to users to manipulate.
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const titleInput: string = usePostFormStore((state) => state.title);
    const onTitleChange = usePostFormStore((state) => state.setTitle);
    const titleError: string | null = usePostFormStore((state) => state.titleError);
    const onTitleErrorChange = usePostFormStore((state) => state.setTitleError);
    const descriptionInput: string = usePostFormStore((state) => state.description);
    const onDescriptionChange = usePostFormStore((state) => state.setDescription);
    const priceInput: string = usePostFormStore((state) => state.price);
    const onPriceChange = usePostFormStore((state) => state.setPrice);
    const priceError: string | null = usePostFormStore((state) => state.priceError);
    const onPriceErrorChange = usePostFormStore((state) => state.setPriceError);
    const currencyInput: string = usePostFormStore((state) => state.currency);
    const onCurrencyChange = usePostFormStore((state) => state.setCurrency);
    const quantityInput: string = usePostFormStore((state) => state.quantity);
    const onQuantityChange = usePostFormStore((state) => state.setQuantity);
    const quantityError: string | null = usePostFormStore((state) => state.quantityError);
    const onQuantityErrorChange = usePostFormStore((state)=> state.setQuantityError);
    const sellBuyByDateInput: string = usePostFormStore((state) => state.sellBuyByDate);
    const onSellBuyByDateChange = usePostFormStore((state) => state.setSellBuyByDate);
    const sellBuyByDateError: string | null = usePostFormStore((state) => state.sellBuyByDateError);
    const onSellBuyByDateErrorChange = usePostFormStore((state) => state.setSellBuyByDateError);
    const [openToNegotiate, setOpenToNegotiate] = useState(false);
    const [postTypeIsSell, setPostTypeIsSell] = useState(true);
    const [submitType, setSubmitType] = useState("");  // Check which submit button was clicked, post to market or Save to draft.
    const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let CAN_PROCEED_TO_MAKING_REQUEST = true;
        // common checks
        // 1. title should be at least 1 characters, and that is done by required. But it shouldn't only contain spaces as well.
        if (titleInput.trim() === "") {
            onTitleErrorChange("The title must contain at least 1 character other than only spaces.");
            CAN_PROCEED_TO_MAKING_REQUEST = false;
            return; // Prevent form submission
        } else {
            onTitleErrorChange(null);
        }
        // the price should have up to 2 decimal places, and be between 0 and 99999999
        const priceFormat:RegExp = /^\d+(\.\d{0,2})?$/;
        if (parseFloat(priceInput) === 0 || priceInput.length > 8 || !priceFormat.test(priceInput)) {
            onPriceErrorChange("price should be between 0 and 99999999, and up to 2 decimal places.")
            CAN_PROCEED_TO_MAKING_REQUEST = false;
        } else {
            onPriceErrorChange(null);
        }
        // the quantity should be a positive whole number, with maximum value being 99999999
        // it seems like for quantity all check is done by html.
        
        // Sell by date can't be in the past or the day of creation.
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0]; 
        if (formattedCurrentDate >= sellBuyByDateInput) {
            onSellBuyByDateErrorChange("Sell/Buy by date can't be in the past or the day of posting.")
            CAN_PROCEED_TO_MAKING_REQUEST = false;
        }

    }
    return (
        <div className={commonClassName}>
            <FormHeader formTitle="Create a new post" />
            <Form method={newOrEditFlag === "new" ? "POST" : "PATCH"} handleSubmit={handlePostFormSubmit}>
                <FormItem>
                    <FormLabel htmlFor="postType">Post type</FormLabel>
                    <div className="flex justify-start text-center">
                    <div onClick={()=>{setPostTypeIsSell(true)}} className={`border border-purple-700 w-1/6 mx-2 mb-1 rounded-md hover:bg-purple-700 hover:text-white cursor-pointer ${postTypeIsSell && 'bg-purple-700 text-white'}`}>Sell</div>
                    <Input type="radio" id="postType" value="sell" name='postType' customClassname="hidden" checked={postTypeIsSell}></Input>
                    <div onClick={()=>{setPostTypeIsSell(false)}} className={`border border-purple-700 w-1/6 mx-2 mb-1 rounded-md hover:bg-purple-700 hover:text-white cursor-pointer  ${!postTypeIsSell && 'bg-purple-700 text-white'}`}>Buy</div>
                    <Input type="radio" id="postType" value="buy" name='postType' customClassname="hidden" checked={!postTypeIsSell}></Input>
                    </div>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input type="text" id="title" name='title' placeholder="Post title" required maxlength={100} customClassname="w-11/12 md:w-2/3" onInputChange={onTitleChange}></Input>
                    <InputDescription inputDescriptionText="The title should be 1-100 characters long."></InputDescription>
                    <InputError errorText={titleError}/>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <div className="flex relative">
                        <span className="absolute top-2 left-3">{currencyInput}</span>
                          {/**Something to conisder, the user can type "e" to the input, so can write things like 1e3. How will this be shown on the server?*/}
                        <Input type="number" id="price" name="price" placeholder="0" value={priceInput} customClassname="pl-5 w-1/3 sm:w-1/6" onInputChange={onPriceChange} />
                        <DropDownMenu name="currency" options={["CNY", "USD"]} className="max-w-[70px]" handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            if (e.target.value === "CNY") {
                                onCurrencyChange("¥");
                            } else if (e.target.value === "USD") {
                                onCurrencyChange("$");
                            }
                        }}></DropDownMenu>
                        <DropDownMenu name="totalOrPerItem" options={["Total price", "Price per unit"]} className="max-w-[200px]"></DropDownMenu>
                    </div>
                    <InputDescription inputDescriptionText="*Use 0 for price if you want to do free giveaways." />
                    <InputDescription inputDescriptionText="*Use price per unit if you're posting many items in one post and want to show the price of each item." />
                    <div className="flex">
                        <Input customClassname="w-4 h-4 accent-pink-500 focus:ring-purple-500" type="checkbox" id="openToNegotiate" name="openToNegotiate" value="true" onInputChange={() => { openToNegotiate ? setOpenToNegotiate(false) : setOpenToNegotiate(true) }}></Input>
                        {!openToNegotiate && <input type="hidden" name="openToNegotiate" value="false"></input>}
                        <span className="text-sm mt-2">Open to negotiate</span>
                    </div>
                    <InputError errorText={priceError}></InputError>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="quantity">Quantity</FormLabel>
                    {/**I did not know this before, but specifying min and max for a input type number only allows integer inputs! */}
                    <Input type="number" id="quantity" name="quantity" value={quantityInput} min="1" max="99999999" placeholder="" onInputChange={onQuantityChange} />
                    <InputError errorText={quantityError}/>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <TextArea id="description" name="description" placeholder="Write your post's description here..." onInputChange={onDescriptionChange}></TextArea>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="sellBuyByDate">{postTypeIsSell ? "Sell" : "Buy"} by date</FormLabel>
                    <Input type="date" id="sellBuyByDate" name="sellBuyByDate" value={sellBuyByDateInput} onInputChange={onSellBuyByDateChange} />
                    <InputDescription inputDescriptionText="You may specify the end date of this post. Default is +4 months from today."/>
                    <InputError errorText={sellBuyByDateError}/>
                </FormItem>
                <div className="flex justify-around">
                    <Button buttonText="Post to market" customClass="p-2"></Button>
                    <Button buttonText="Save to draft" customClass="p-2 bg-gray-500 hover:bg-gray-700"></Button>
                </div>
            </Form>

        </div>
    )
}