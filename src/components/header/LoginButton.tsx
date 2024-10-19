import Button from "components/Button";
interface LoginButtonProps {
    className?: string; // Optional prop
 }
 
 export default function LoginButton ({className}: LoginButtonProps) {
      return ( 
         <Button customClass={className} buttonText="Login"></Button>
      )
 }