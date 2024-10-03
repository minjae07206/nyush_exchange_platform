interface ButtonProps {
    customClass?: string; // Optional prop
    buttonText: string;
    onClick?: Function
 }
export default function Button ({customClass, buttonText}: ButtonProps) {
    return (
        <button className={`${customClass}`}>{buttonText}</button>
    )
}