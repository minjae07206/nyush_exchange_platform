interface FormHeaderProps {
    formTitle: string;
  }

export default function FormHeader ({formTitle}:FormHeaderProps) {
    const commonClassName = "text-2xl m-4"
    return (
        <h5 className={commonClassName}>{formTitle}</h5>
    )
}