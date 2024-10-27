interface FormErrorProps {
    innerText: string | null;
}

export default function FormError({ innerText }: FormErrorProps) {
    const commonClassName = "bg-red-300 p-1 h-8 w-11/12 m-auto rounded-md ";
    return (
        <>
            {innerText !== null ? <div className={commonClassName}>{innerText}</div> : null}
        </>
    );
}