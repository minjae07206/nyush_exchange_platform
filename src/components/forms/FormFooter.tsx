import { link } from "fs"
import { Link } from "react-router-dom"
interface FormFooterProps {
    footerText:string,
    linkTo: string,
}

export default function FormFooter({footerText, linkTo}:FormFooterProps) {
    const commonClassName = "m-2";
    return (
        <p className={commonClassName}><u><Link to={linkTo}>{footerText}</Link></u></p>
    )
}