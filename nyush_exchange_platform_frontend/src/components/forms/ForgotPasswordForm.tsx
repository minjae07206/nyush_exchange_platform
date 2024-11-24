import Form from "./Form";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import Input from "./Input";
import InputDescription from "./InputDescription";
import InputError from "./InputError";
import { useState } from "react";
import Button from "components/Button";
import axios from "axios";
export default function ForgotPasswordForm() {
    const [timeLeft, setTimeLeft] = useState<number>(150);
    const [codeInput, setCodeInput] = useState<string>("");
    const [codeError, setCodeError] = useState<string | null>(null);
    const [emailInput, setEmailInput] = useState<string>("");
    const [emailSent, setEmailSent] = useState<boolean>(false);

    const handleEmailSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${process.env.HOST_NAME}/api/auth/create-reset-password-session`, {
            emailInput,
        })
        .then(()=>{
            setEmailSent(true);
        })
        .catch(()=>{})

    }

    const handleCodeSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <div>
            <FormHeader formTitle="Password reset form" />
            <Form handleSubmit={handleEmailSend}>
                <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input name="email" id="email" type="text" onInputChange={setEmailInput}></Input>
                </FormItem>
            </Form>
            {emailSent && <Form handleSubmit={handleCodeSend}>
                <FormItem>
                    <FormLabel htmlFor="code">Enter Verification code</FormLabel>
                    <Input name="code" id="code" type="text" onInputChange={setCodeInput}></Input>
                    <InputDescription inputDescriptionText={`Time left: ${timeLeft} seconds`}></InputDescription>
                    <InputError errorText={codeError}></InputError>
                </FormItem>
                <Button buttonText="Submit code" customClass="w-20 h-12 bg-purple-600 hover:bg-purple-700" handleButtonClickProp={() => { }}></Button>
            </Form>}
            
            <FormFooter linkTo="/signup" footerText="If you don't remember your email, you should consult with the developer to retrieve your account." />
        </div>
    )
}