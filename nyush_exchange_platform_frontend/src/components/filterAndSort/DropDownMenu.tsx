import React from "react";
interface DropDownMenuProps {
    options: string[];
    className?: string;
    name:string;
    value?: string;
    handleSelectChange?: (e:React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DropDownMenu({ value, options, className, name, handleSelectChange }: DropDownMenuProps) {
    return (
        <select className={className} name={name} value={value} onChange={handleSelectChange}>
            {
                options.map((option) => {
                    return (
                        <option key={option}>{option}</option>
                    )
                })
            }
        </select>
    )
}