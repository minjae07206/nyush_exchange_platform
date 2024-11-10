import Form from "./Form";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import Button from "components/Button";
import Input from "./Input";
import InputError from "./InputError";
import { useLoginFormStore } from "stores/useLoginFormStore";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

import { useSessionStore } from "stores/useSessionStore";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function LoginForm() {
    useEffect(()=>{
        onFormErrorChange(null);
        onFormSuccessChange(null);
    }, [])
    const navigate = useNavigate();
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const usernameOrEmailInput: string = useLoginFormStore((state) => state.usernameOrEmail);
    const onUsernameOrEmailChange = useLoginFormStore((state) => state.setUsernameOrEmail);
    const passwordInput: string = useLoginFormStore((state) => state.password);
    const onPasswordChange = useLoginFormStore((state) => state.setPassword);
    const usernameOrEmailError: string | null = useLoginFormStore((state) => state.usernameOrEmailError);
    const passwordError: string | null = useLoginFormStore((state) => state.passwordError);
    const onUsernameOrEmailErrorChange = useLoginFormStore((state) => state.setUsernameOrEmailError);
    const onPasswordErrorChange = useLoginFormStore((state) => state.setPasswordError);

    const formError:string | null = useLoginFormStore((state)=>state.formError);
    const onFormErrorChange = useLoginFormStore((state)=>state.setFormError);
    const formSuccess:string | null = useLoginFormStore((state)=>state.formSuccess);
    const onFormSuccessChange = useLoginFormStore((state)=>state.setFormSuccess);


    const setIsLoggedIn = useSessionStore((state)=>state.setIsLoggedIn);
    const setSessionExpirationTime = useSessionStore((state)=>state.setSessionExpirationTime)
    const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //const allowedEmailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@nyu\.edu$/;
        const allowedEmailPattern: RegExp = /^.+$/;
        // username should only contain alphanumerical values and underscores.
        const allowedUsernamePattern: RegExp = /^[a-zA-Z0-9_]+$/;
        // not allowing user to type submit certain special characters to prevent script attacks. 
        // the same pattern should be used in SignupPage to not allow users to create a username/password involving these characters.
        const allowedPasswordPattern: RegExp = /^[^<>"'`;&$()/{}]*$/;
        let CAN_PROCEED_TO_MAKING_POST_REQUEST = true;

        if (!allowedUsernamePattern.test(usernameOrEmailInput) && !allowedEmailPattern.test(usernameOrEmailInput)) {
            onUsernameOrEmailErrorChange("Username should only contain alphanumerical values and underscores, or invalid email format.")
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onUsernameOrEmailErrorChange(null)
        }
        if (!allowedPasswordPattern.test(passwordInput)) {
            onPasswordErrorChange("The password cannot contain <, >, \", ', `, ;, &, $, /, \\, (, ), {, }")
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onPasswordErrorChange(null);
        }

        if (CAN_PROCEED_TO_MAKING_POST_REQUEST) {
            axios.post('http://localhost:3001/api/auth/login', {
                usernameOrEmail: usernameOrEmailInput,
                password: passwordInput,
            }).then((response) => {
                // New knowledge. In response object under headers there is no Set-Cookie header field, but in fact cookie is being sent from the server through response header.
                // The reason why we cannot see the cookie in response object through console.log() is for security reasons.
                onFormSuccessChange(response.data.message);
                onFormErrorChange(null); // set FormError message to null again so it doesn't stay showing. 
                // when the user is logged in, mark its session expiration date
                setIsLoggedIn(true);
                setSessionExpirationTime(response.data.sessionExpirationTime);
                navigate('/market');
            }).catch((error) => {
                console.log(error.response.data.message)
                onFormErrorChange(error.response.data.message);
            })
        } else {
            return new Error("Something wrong happened.")
        }


    }

    return (
        <div className={commonClassName}>
            <FormHeader formTitle="Login"></FormHeader>
            <Form action="/api/auth/login" method="post" handleSubmit={handleLoginFormSubmit}>
                <FormItem>
                    <FormLabel htmlFor="username">Username or email</FormLabel>
                    <Input type="text" id="usernameOrEmail" name='usernameOrEmail' placeholder="Username or email" required maxlength={254} onInputChange={onUsernameOrEmailChange}></Input>
                    <InputError errorText={usernameOrEmailError} />
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Password" required maxlength={128} onInputChange={onPasswordChange}></Input>
                    <InputError errorText={passwordError} />
                </FormItem>

                <Button buttonText="Login" customClass="w-20 h-12 bg-purple-600 hover:bg-purple-700 " handleButtonClickProp={()=>{}}></Button>
            </Form>
            <FormSuccess innerText={formSuccess} renderSpinner={true}/>
            <FormError innerText={formError}/>
            <FormFooter linkTo="/signup" footerText="Don't have an account?"></FormFooter>
            <FormFooter linkTo="/forgot-password" footerText="Forgot password?"></FormFooter>
        </div>
    )
}