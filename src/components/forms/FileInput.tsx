interface FileInputProps {
    name: string;
    id: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    value?:string;
    customClassname?: string;
    onInputChange?: (input:string) => void;
  }

export default function FileInput({
    name,
    id, 
    required,
    maxlength,
    minlength,
    value,
    customClassname,
    onInputChange,
    }:FileInputProps) {
        const commonClassName = "w-11/123 m-2 pl-4 rounded-sm bg-gray-100 text-black";
    return <input 
    className={`${commonClassName} ${customClassname}`}
    id={id} 
    name={name}   
    required={required}
    maxLength={maxlength}
    minLength={minlength}
    value={value}
    type="file"
    accept=".jpg, .jpeg, .png, .bmp, .tiff, .tif, .webp, .svg"
    multiple // multiple flag allows users to upload multiple files at a time.
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        // e.preventDefault causes the checkbox to be needed to click twice before it gets toggled.
        onInputChange && onInputChange(e.target.value);
    }}
    />
}