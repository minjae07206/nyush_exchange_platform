interface FormItemProps {
    children: React.ReactNode;
  }


export default function FormItem({children}:FormItemProps) {
    const commonClassName = "text-md md:text-xl border m-2 shadow-md";
    return (
        <div className={commonClassName}>
            {children}
        </div>
    )
}