import { Link } from "react-router-dom";
interface LogoProps {
    className?: string; // Optional prop
}

export default function Logo ({className}:LogoProps): JSX.Element {
    return <Link className={className} to="/"><div>Logo</div></Link>
}