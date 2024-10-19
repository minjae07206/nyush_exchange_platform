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
    const descriptionInput: string = usePostFormStore((state) => state.description);
    const onDescriptionChange = usePostFormStore((state) => state.setDescription);
    const priceInput: string = usePostFormStore((state) => state.price);
    const onPriceChange = usePostFormStore((state) => state.setPrice);
    const currencyInput: string = usePostFormStore((state) => state.currency);
    const onCurrencyChange = usePostFormStore((state) => state.setCurrency);
    
    const [openToNegotiate, setOpenToNegotiate] = useState(false);

    const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className={commonClassName}>
            <FormHeader formTitle="Create a new post" />
            <Form method={newOrEditFlag === "new" ? "POST" : "PATCH"} handleSubmit={handlePostFormSubmit}>
                <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input type="text" id="title" name='title' placeholder="Post title" required maxlength={100} customClassname="w-11/12 md:w-2/3" onInputChange={onTitleChange}></Input>
                    <InputDescription inputDescriptionText="The title should be 1-100 characters long."></InputDescription>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <div className="flex relative">
                        <span className="absolute top-2 left-3">{currencyInput}</span>
                        <Input type="number" id="price" name="price" placeholder="0" value={priceInput} customClassname="pl-5 w-1/3 sm:w-1/6" onInputChange={onPriceChange}/>
                        <DropDownMenu name="currency" options={["CNY", "USD"]} className="max-w-[70px]" handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            if (e.target.value === "CNY") {
                                onCurrencyChange("¥");
                            } else if (e.target.value === "USD") {
                                onCurrencyChange("$");
                            }
                        }}></DropDownMenu>
                         <DropDownMenu name="totalOrPerItem" options={["Total price", "Price per unit"]} className="max-w-[200px]"></DropDownMenu>
                    </div>
                    <InputDescription inputDescriptionText="Use price per unit if you're posting many items in one post and want to show the price of each item."/>
                    <div className="flex">
                    <Input customClassname="w-4 h-4 accent-pink-500 focus:ring-purple-500" type="checkbox" id="openToNegotiate" name="openToNegotiate" value="true" onInputChange={() => { openToNegotiate ? setOpenToNegotiate(false) : setOpenToNegotiate(true) }}></Input>
                    {!openToNegotiate && <input type="hidden" name="openToNegotiate" value="false"></input>}
                    <span className="text-sm mt-2">Open to negotiate</span>
                    </div>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <TextArea id="description" name="description" placeholder="Write your post's description here..." onInputChange={onDescriptionChange}></TextArea>
                </FormItem>
                <div className="flex justify-around">
                    <Button buttonText="Post to market" customClass="p-2"></Button>
                    <Button buttonText="Save to draft" customClass="p-2 bg-gray-500 hover:bg-gray-700"></Button>
                </div>
            </Form>

        </div>
    )
}