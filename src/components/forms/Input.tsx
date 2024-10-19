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
    customClassname?: string;
    checked?: boolean;
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
    checked,
    customClassname,
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
    checked={checked}
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        // e.preventDefault causes the checkbox to be needed to click twice before it gets toggled.
        onInputChange && onInputChange(e.target.value);
    }}
    />
}