interface FormLabelProps {
    htmlFor: string,
    children: React.ReactNode;
  }


export default function FormLabel ({htmlFor, children}:FormLabelProps) {
    const commonClassName = 'block m-2';
    return <label htmlFor={htmlFor} className={commonClassName}>{children}</label>
}