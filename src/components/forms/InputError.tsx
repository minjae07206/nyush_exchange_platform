interface InputProps {
    errorText: String | null
  }

export default function InputError({errorText}: InputProps) {
    const commonClassName = "h-10 larger-phones:h-8 text-red-500 text-sm mx-1"
    return (
        <p className={commonClassName}><strong>{errorText}</strong></p>
    )
}