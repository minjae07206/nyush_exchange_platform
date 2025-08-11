import Button from "components/Button";
import { useNavigate } from "react-router-dom";
interface LoginButtonProps {
   className?: string; // Optional prop
   LoginButtonText: string;
}

export default function LoginButton({ className, LoginButtonText }: LoginButtonProps) {
   const navigate = useNavigate();
   if (LoginButtonText === "NYU Login") {
      // Redirect to NYU login page
      return (
      <Button customClass={className} buttonText={LoginButtonText} handleButtonClickProp={()=>{
         axios.get('/api/auth/nyu-login')
      }}></Button>
   )
   } else {
      return (
      <Button customClass={className} buttonText={LoginButtonText} handleButtonClickProp={()=>{navigate('/login')}}></Button>
      )
   }

}