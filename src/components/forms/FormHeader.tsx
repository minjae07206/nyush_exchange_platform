interface FormHeaderProps {
    formTitle: string;
  }

export default function FormHeader ({formTitle}:FormHeaderProps) {
    return (
        <h5>{formTitle}</h5>
    )
}