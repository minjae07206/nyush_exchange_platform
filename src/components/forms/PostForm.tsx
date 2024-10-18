import Form from "components/forms/Form";
import FormHeader from "components/forms/FormHeader";
import Input from "components/forms/Input";
import FormItem from "components/forms/FormItem";
import FormLabel from "components/forms/FormLabel";
import InputError from "components/forms/InputError";
import InputDescription from "components/forms/InputDescription";
import Button from "components/Button";
import TextArea from "components/forms/TextArea";

import { usePostFormStore } from "stores/usePostFormStore";
// if the newOrEditFlag is not new, then it means it is edit.
interface PostFormProps {
    newOrEditFlag: string
}
export default function PostForm ({newOrEditFlag}:PostFormProps) {
    // Idea behind building the PostForm: The PostForm is used to build a new post, edit a post as well as saving as a draft.
    // There should be a save as a draft button which allows users to save it as a draft. In this case, only title field is required.
    // When editing a post, the default values should be fetched from the server and shown to users to manipulate.
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const titleInput:string = usePostFormStore((state)=>state.title);
    const onTitleChange = usePostFormStore((state)=>state.setTitle);
    const descriptionInput:string = usePostFormStore((state)=>state.description);
    const onDescriptionChange = usePostFormStore((state)=>state.setDescription);
    const handlePostFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className={commonClassName}>
            <FormHeader formTitle="Create a new post"/>
            <Form method={newOrEditFlag === "new" ? "POST": "PATCH"} handleSubmit={handlePostFormSubmit}>
            <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input type="text" id="title" name='title' placeholder="Post title" required maxlength={100} onInputChange={onTitleChange}></Input>
                <InputDescription inputDescriptionText="The title should be 1-100 characters long."></InputDescription>
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