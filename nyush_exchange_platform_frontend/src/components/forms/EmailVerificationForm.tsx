import Form from "./Form";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import Input from "./Input";
import FormHeader from "./FormHeader";
import Button from "components/Button";
import InputDescription from "./InputDescription";
import InputError from "./InputError";
import FormFooter from "./FormFooter";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Unauthorized from "components/Unauthorized";
export default function EmailVerificationForm() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
    const [timeLeft, setTimeLeft] = useState<number>(150);
    const [codeInput, setCodeInput] = useState<string>("");
    const [codeError, setCodeError] = useState<string | null>(null);
    const [formError, onFormErrorChange] = useState<string | null>(null);
    const [formSuccess, onFormSuccessChange] = useState<string | null>(null);
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    useEffect(() => {
        const checkVerificationCodeSession = async () => {
            try {
                const response = await axios.get(`${process.env.HOST_NAME}/api/auth/check-verification-code-session-exists`, {
                    withCredentials: true,
                });
                console.log(response)
                setIsAuthenticated(true);
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false);
            }

        }
        checkVerificationCodeSession();
    }, []);
    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);


    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Unauthorized/>;
    }
    const handleVerificationFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let CAN_PROCEED_TO_MAKING_REQUEST = true;
        if (codeInput.length > 6) {
            CAN_PROCEED_TO_MAKING_REQUEST = false;
            setCodeError('Code should be 6 digits');
        } else {
            setCodeError(null);
        }

        if (CAN_PROCEED_TO_MAKING_REQUEST) {
            axios.post('http://localhost:3001/api/auth/verify-user', {
                verificationCode: codeInput
            }).then((response) => {
                // New knowledge. In response object under headers there is no Set-Cookie header field, but in fact cookie is being sent from the server through response header.
                // The reason why we cannot see the cookie in response object through console.log() is for security reasons.
                console.log(response);
                onFormSuccessChange(response.data.message)
                onFormErrorChange(null); // set FormError message to null again so it doesn't stay showing. 
                setTimeout(()=>{navigate('/login');}, 2000);
            }).catch((error)=> {
                console.log(error.response.data.message)
                onFormErrorChange(error.response.data.message);
            })
        } else {
            return new Error("Something wrong happened.")
        }
    }
    return (
        <div className={commonClassName}>
            <FormHeader formTitle="Email Verification"></FormHeader>
            <Form handleSubmit={handleVerificationFormSubmit}>
                <FormItem>
                    <FormLabel htmlFor="code">Enter Verification code</FormLabel>
                    <Input name="code" id="code" type="text" onInputChange={setCodeInput}></Input>
                    <InputDescription inputDescriptionText={`Time left: ${timeLeft} seconds`}></InputDescription>
                    <InputError errorText={codeError}></InputError>
                </FormItem>
                <Button buttonText="Submit code" customClass="w-20 h-12 bg-purple-600 hover:bg-purple-700" handleButtonClickProp={()=>{}}></Button>
            </Form>
            <FormSuccess innerText={formSuccess} renderSpinner={true}/>
            <FormError innerText={formError}/>
            <FormFooter linkTo="/signup" footerText="Start over if time ran out" />
        </div>
    )
}