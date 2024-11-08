interface FormSuccessProps {
    innerText: string | null;
    renderSpinner: boolean;
}

export default function FormSuccess({ innerText, renderSpinner }: FormSuccessProps) {
    const commonClassName = "bg-green-300 p-1 h-8 w-11/12 m-auto rounded-md mb-4";
    return (
        <>
            {innerText !== null && (
                <div className={commonClassName}>
                    {innerText} 
                    {renderSpinner && <i className="fa-solid fa-spin fa-rotate-right"></i>}
                </div>
            )}
        </>
    )
}
