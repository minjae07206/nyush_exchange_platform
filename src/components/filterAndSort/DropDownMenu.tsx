interface DropDownMenuProps {
    options: string[];
    className?: string;
}

export default function DropDownMenu({ options, className }: DropDownMenuProps) {
    return (
        <select className={className}>
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