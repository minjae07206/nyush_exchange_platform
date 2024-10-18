interface InputDescriptionProps{
    inputDescriptionText: string;
}
export default function InputDescription({inputDescriptionText}:InputDescriptionProps) {
    const commonClassName = 'text-sm ml-2 mb-2 text-gray-600'
    return <p className={commonClassName}>{inputDescriptionText}</p>
}