import Form from "./Form"
import FormLabel from "./FormLabel";
import FormItem from "./FormItem";
import Button from "components/Button";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import Input from "./Input";
import InputError from "./InputError";

import { useSignupFormStore } from "stores/useSignupFormStore";
import InputDescription from "./InputDescription";
export default function SignupForm () {
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const emailInput:string = useSignupFormStore((state)=>state.email);
    const onEmailChange = useSignupFormStore((state)=>state.setEmail);
    const usernameInput:string = useSignupFormStore((state)=>state.username);
    const onUsernameChange = useSignupFormStore((state)=>state.setUsername);
    const passwordInput:string = useSignupFormStore((state)=>state.password);
    const onPasswordChange = useSignupFormStore((state)=>state.setPassword);
    const confirmPasswordInput:string = useSignupFormStore((state)=>state.confirmPassword);
    const onConfirmPasswordChange = useSignupFormStore((state)=>state.setConfirmPassword);
    const emailError: string | null = useSignupFormStore((state)=>state.emailError);
    const usernameError:string | null = useSignupFormStore((state)=>state.usernameError);
    const passwordError:string | null = useSignupFormStore((state)=>state.passwordError);

    const onEmailErrorChange = useSignupFormStore((state)=>state.setEmailError);
    const onUsernameErrorChange = useSignupFormStore((state)=>state.setUsernameError);
    const onPasswordErrorChange = useSignupFormStore((state)=>state.setPasswordError);

    const handleSignupFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // email should only contain alphabets, numbers and full stop(.) and should not start with a full stop.
        const allowedEmailPattern: RegExp = /^(?!\.)([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/;
        // username should only contain alphanumerical values and underscores.
        const allowedUsernamePattern:RegExp = /^[a-zA-Z0-9_]+$/;
        // not allowing user to type submit certain special characters to prevent script attacks. 
        // the same pattern should be used in SignupPage to not allow users to create a username/password involving these characters.
        const allowedPasswordPattern:RegExp = /^[^<>"'`;&$\/(){}]*$/;
        let CAN_PROCEED_TO_MAKING_POST_REQUEST = true;
        if (!allowedEmailPattern.test(emailInput)) {
            onEmailErrorChange("Email should only contain alphabets, numbers and full stop(.) and should not begin with a full stop.");
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onEmailErrorChange(null);
        }

        if (!allowedUsernamePattern.test(usernameInput)) {
            onUsernameErrorChange("Username should only contain alphanumerical values and underscores.")
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onUsernameErrorChange(null);
        }
        if (!allowedPasswordPattern.test(passwordInput)) {
            onPasswordErrorChange("The password cannot contain <, >, \", ', `, ;, &, $, /, \\, (, ), {, }");
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else if (passwordInput != confirmPasswordInput) {
            // check if password matches confirmPassword.
            onPasswordErrorChange("Password and Confirm Password do not match.");
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onPasswordErrorChange(null);
        }
        if (CAN_PROCEED_TO_MAKING_POST_REQUEST) {
            // proceed with request to server
            return;
        } else {
            return new Error("Something wrong happened.")
        }

    }

    return (
        <div className={commonClassName}>
        <FormHeader formTitle="Signup"></FormHeader>
        <Form action="/api/signup" method="post" handleSubmit={handleSignupFormSubmit}>
            <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                {/* Typical maximum length for email is 254 characters? */}
                {/* It seems like gmail only allows alphabets, numbers and .(full stop) in the email, but it cannot start with a full stop. */}
                <Input type="email" id="email" name='username' placeholder="Email" required maxlength={254} onInputChange={onEmailChange}></Input>
                <InputError errorText={emailError}/>
            </FormItem>
            <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input type="text" id="username" name='username' placeholder="Username" required maxlength={30} onInputChange={onUsernameChange}></Input>
                <InputDescription inputDescriptionText="Username should be 1-30 characters long."></InputDescription>
                <InputError errorText={usernameError}/>
            </FormItem>
            <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" id="password" name='password' placeholder="Password" required minlength={8} maxlength={128} onInputChange={onPasswordChange}></Input>
                <InputDescription inputDescriptionText="Password should be 8-128 characters long."/>
                <InputDescription inputDescriptionText="The password cannot contain &lt;, &gt;, &quot;, &#39;, `, ;, &amp;, $, /, \\ (, ), {, }"/>
                <InputError errorText={passwordError}/>
            </FormItem>
            <FormItem>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input type="password" id="confirmPassword" name='confirmPassword' placeholder="Confirm Password" required minlength={8} maxlength={128} onInputChange={onConfirmPasswordChange}></Input>
                <InputError errorText={null}/>
            </FormItem>
            <Button buttonText="Signup" customClass="w-20 h-12"></Button>
        </Form>
        <FormFooter linkTo="/login" footerText="Already have an account?"></FormFooter>
        </div>
    )
}