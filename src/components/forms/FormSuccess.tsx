interface FormSuccessProps {
    innerText: string | null
}

export default function FormSuccess({ innerText }: FormSuccessProps) {
    const commonClassName = "bg-green-300 p-1 h-8 w-11/12 m-auto rounded-md ";
    return (
        <>
            {innerText !== null ? <div className={commonClassName}>{innerText} <i className="fa-solid fa-spin fa-rotate-right"></i></div> : null}
        </>
    )
}