import Button from "components/Button";
import { useNavigate } from "react-router-dom";
interface LogoutButtonProps {
   className?: string; // Optional prop
}

export default function LogoutButton({ className }: LogoutButtonProps) {
   const navigate = useNavigate()
   return (
         <Button customClass={className} buttonText="Logout" handleButtonClickProp={()=>{navigate('/login')}}></Button>
   )
}