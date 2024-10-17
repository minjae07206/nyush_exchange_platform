interface ButtonProps {
    customClass?: string; // Optional prop
    buttonText: string;
    onClick?: Function
 }
export default function Button ({customClass, buttonText}: ButtonProps) {
    const defaultClass:string = "bg-purple-700 text-white rounded-md m-2 hover:bg-purple-800" // default styling for the button
    return (
        <button className={` ${defaultClass} ${customClass} `}>{buttonText}</button>
    )
}