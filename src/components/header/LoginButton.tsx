interface LoginButtonProps {
    className?: string; // Optional prop
 }
 
 export default function LoginButton ({className}: LoginButtonProps) {
      return ( 
         <button className={className}>Login</button>
      )
 }