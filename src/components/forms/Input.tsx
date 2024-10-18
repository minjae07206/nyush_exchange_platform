interface InputProps {
    name: string;
    id: string;
    type: string;
    placeholder: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    onInputChange: (input:string) => void;
  }

export default function Input({
    name,
    id, 
    type,
    placeholder,
    required,
    maxlength,
    minlength,
    onInputChange,
    }:InputProps) {
        const commonClassName = "m-2 pl-4 rounded-sm bg-gray-100 text-black placeholder:text-gray-400";
    return <input 
    className={commonClassName}
    id={id} 
    type={type} 
    name={name} 
    placeholder={placeholder} 
    required={required}
    maxLength={maxlength}
    minLength={minlength}
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        onInputChange(e.target.value);
    }}
    />
}