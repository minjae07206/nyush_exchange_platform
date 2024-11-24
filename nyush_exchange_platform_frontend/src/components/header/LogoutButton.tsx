import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSessionStore } from "stores/useSessionStore";
interface LogoutButtonProps {
   className?: string; // Optional prop
}

export default function LogoutButton({ className }: LogoutButtonProps) {
   const navigate = useNavigate();
   const {setIsLoggedIn} = useSessionStore()
   const handleLogoutButtonClick = async () => {
      try {
         await axios.post('http://localhost:3001/api/auth/logout', {
            withCredentials: true,
         })
         setIsLoggedIn(false);
         navigate('/login');
      } catch (error) {
         // logout failed????
         console.log(error)
      }
      
   }
   return (
         <Button customClass={className} buttonText="Logout" handleButtonClickProp={handleLogoutButtonClick}></Button>
   )
}