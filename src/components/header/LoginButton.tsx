import Button from "components/Button";
import { useNavigate } from "react-router-dom";
interface LoginButtonProps {
   className?: string; // Optional prop
}

export default function LoginButton({ className }: LoginButtonProps) {
   const navigate = useNavigate();
   return (
         <Button customClass={className} buttonText="Login" handleButtonClickProp={()=>{navigate('/login')}}></Button>
   )
}