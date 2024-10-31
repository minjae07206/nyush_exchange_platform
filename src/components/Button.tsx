interface ButtonProps {
    customClass?: string; // Optional prop
    buttonText: string;
    handleButtonClickProp?: any

 }
export default function Button ({customClass, buttonText, handleButtonClickProp}: ButtonProps) {
    const defaultClass:string = "bg-purple-700 text-white rounded-md m-2 hover:bg-purple-800" // default styling for the button
    const handleButtonClick = (e:any) => {
        handleButtonClickProp();

    }
    return (
        <button className={` ${defaultClass} ${customClass} `} onClick={handleButtonClick}>{buttonText}</button>
    )
}