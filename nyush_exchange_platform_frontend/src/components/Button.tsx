interface ButtonProps {
    customClass?: string; // Optional prop
    buttonText: string;
    handleButtonClickProp?: any
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean;

 }
export default function Button ({customClass, buttonText, handleButtonClickProp, type, disabled}: ButtonProps) {
    const defaultClass:string = "text-white rounded-md m-2 disabled:bg-gray-400" // default styling for the button
    return (
        <button disabled={disabled} type={type} className={` ${defaultClass} ${customClass} `} onClick={()=>{handleButtonClickProp()}}>{buttonText}</button>
    )
}