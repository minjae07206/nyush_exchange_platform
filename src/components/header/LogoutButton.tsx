import Button from "components/Button";
interface LogoutButtonProps {
   className?: string; // Optional prop
}

export default function LogoutButton ({className}: LogoutButtonProps) {
     return ( 
        <Button customClass={className} buttonText="Logout"></Button>
     )
}