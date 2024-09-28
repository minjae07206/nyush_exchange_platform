interface LogoutButtonProps {
   className?: string; // Optional prop
}

export default function LogoutButton ({className}: LogoutButtonProps) {
     return ( 
        <button className={className}>Logout</button>
     )
}