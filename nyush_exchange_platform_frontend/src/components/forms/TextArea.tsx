interface TextAreaProps {
    name: string;
    id: string;
    placeholder: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    value?: string;
    disabled?:boolean;
    onInputChange: (input:string) => void;
  }

export default function TextArea({
    name,
    id, 
    placeholder,
    required,
    maxlength,
    minlength,
    value,
    disabled,
    onInputChange,
    }:TextAreaProps) {
        const commonClassName = "h-32 w-11/12 min-w-[240px] m-2 pl-4 rounded-sm bg-gray-100 text-black placeholder:text-gray-400 resize-none";
    return <textarea 
    className={commonClassName}
    id={id} 
    name={name} 
    placeholder={placeholder} 
    required={required}
    maxLength={maxlength}
    value={value}
    minLength={minlength}
    disabled={disabled}
    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        onInputChange(e.target.value);
    }}
    />
}