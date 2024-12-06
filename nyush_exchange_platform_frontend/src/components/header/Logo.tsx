import { Link } from "react-router-dom";
interface LogoProps {
    className?: string; // Optional prop
}

export default function Logo ({className}:LogoProps): JSX.Element {
    return <Link className={`flex justify-center items-center ${className}`}  to="/">
         <img 
                src={`${process.env.PUBLIC_URL}/logo2.png`} 
                alt="Logo" 
                className="h-12 w-auto" // Example styles; adjust as needed
            />
    </Link>
}