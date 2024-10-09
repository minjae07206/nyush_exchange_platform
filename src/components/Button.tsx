interface ButtonProps {
    customClass?: string; // Optional prop
    buttonText: string;
    onClick?: Function
 }
export default function Button ({customClass, buttonText}: ButtonProps) {
    const defaultClass:string = "bg-purple-800 text-white rounded-md" // default styling for the button
    return (
        <button className={` ${defaultClass} ${customClass} `}>{buttonText}</button>
    )
}