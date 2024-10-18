import Form from "./Form";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import Button from "components/Button";
import Input from "./Input";
import InputError from "./InputError";
import { useLoginFormStore } from "stores/useLoginFormStore";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
export default function LoginForm() {
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const usernameInput:string = useLoginFormStore((state)=>state.username);
    const onUsernameChange = useLoginFormStore((state)=>state.setUsername);
    const passwordInput:string = useLoginFormStore((state)=>state.password);
    const onPasswordChange = useLoginFormStore((state)=>state.setPassword);
    const usernameError:string | null = useLoginFormStore((state)=>state.usernameError);
    const passwordError:string | null = useLoginFormStore((state)=>state.passwordError);
    const onUsernameErrorChange = useLoginFormStore((state)=>state.setUsernameError);
    const onPasswordErrorChange = useLoginFormStore((state)=>state.setPasswordError);


    const handleLoginFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // username should only contain alphanumerical values and underscores.
        const allowedUsernamePattern:RegExp = /^[a-zA-Z0-9_]+$/;
        // not allowing user to type submit certain special characters to prevent script attacks. 
        // the same pattern should be used in SignupPage to not allow users to create a username/password involving these characters.
        const allowedPasswordPattern:RegExp = /^[^<>"'`;&$\/(){}]*$/;
        let CAN_PROCEED_TO_MAKING_POST_REQUEST = true;
        
        if (!allowedUsernamePattern.test(usernameInput)) {
            onUsernameErrorChange("Username should only contain alphanumerical values and underscores.")
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onUsernameErrorChange(null);
        }
        if (!allowedPasswordPattern.test(passwordInput)) {
            onPasswordErrorChange("The password cannot contain <, >, \", ', `, ;, &, $, /, \\, (, ), {, }")
            CAN_PROCEED_TO_MAKING_POST_REQUEST = false;
        } else {
            onPasswordErrorChange(null);
        }


    }

    return (
        <div className={commonClassName}>
        <FormHeader formTitle="Login"></FormHeader>
        <Form action="/api/login" method="get" handleSubmit={handleLoginFormSubmit}>
            <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input type="text" id="username" name='username' placeholder="Username" required maxlength={30} onInputChange={onUsernameChange}></Input>
                <InputError errorText={usernameError}/>
            </FormItem>
            <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" id="password" name="password" placeholder="Password" required maxlength={128} onInputChange={onPasswordChange}></Input>
                <InputError errorText={passwordError}/>
            </FormItem>

            <Button buttonText="Login" customClass="w-20 h-12"></Button>
        </Form>
        <FormFooter linkTo="/signup" footerText="Don't have an account?"></FormFooter>
        <FormFooter linkTo="/forgot_username_password" footerText="Forgot username or password?"></FormFooter>
        </div>
    )
}