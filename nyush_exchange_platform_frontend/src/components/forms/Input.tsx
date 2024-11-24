interface InputProps {
    name: string;
    id: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    value?:string;
    min?:string;
    max?:string;
    customClassname?: string;
    checked?: boolean;
    disabled?: boolean;
    onInputChange?: (input:string) => void;
  }

export default function Input({
    name,
    id, 
    type,
    placeholder,
    required,
    maxlength,
    minlength,
    value,
    min,
    max,
    checked,
    customClassname,
    disabled,
    onInputChange,
    }:InputProps) {
        const commonClassName = "m-2 pl-4 rounded-sm bg-gray-100 text-black placeholder:text-gray-400";
    return <input 
    className={`${commonClassName} ${customClassname}`}
    id={id} 
    type={type} 
    name={name} 
    placeholder={placeholder} 
    required={required}
    maxLength={maxlength}
    minLength={minlength}
    value={value}
    min={min}
    max={max}
    disabled={disabled}
    checked={checked}
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        // e.preventDefault causes the checkbox to be needed to click twice before it gets toggled.
        onInputChange && onInputChange(e.target.value);
    }}
    />
}