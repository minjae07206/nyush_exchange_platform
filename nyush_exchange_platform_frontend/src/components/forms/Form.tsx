import React from "react"
interface FormProps {
    children: React.ReactNode;
    action?: string;
    method?: string;
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void
  }
  
export default function Form ({children, action, method, handleSubmit}:FormProps) {
    return (
        <form onSubmit={handleSubmit} action={action} method={method}>
            {children}
        </form>
    )
}