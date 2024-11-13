interface FileInputProps {
    name: string;
    id: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    value?:string;
    customClassname?: string;
    onInputChange?: (input:any) => void;
    currentImageFiles: any;
    currentImagePreviews: string[];
    onImagePreviewsChange: (input:string[]) => void;
    disabled?:boolean;
    setFileSizeError: (input: string | null) => void;
  }

export default function FileInput({
    name,
    id, 
    required,
    maxlength,
    minlength,
    value,
    disabled,
    customClassname,
    onInputChange,
    currentImagePreviews,
    setFileSizeError,
    onImagePreviewsChange,
    currentImageFiles,
    }:FileInputProps) {
        const commonClassName = "w-11/12 m-2 pl-4 rounded-sm bg-gray-100 text-black";
    return <input 
    className={`${commonClassName} ${customClassname}`}
    id={id} 
    name={name}   
    required={required}
    maxLength={maxlength}
    minLength={minlength}
    value={value}
    disabled={currentImageFiles.length >= 10 || currentImagePreviews.length >= 10 || disabled}
    type="file"
    accept=".jpg, .jpeg, .png, .bmp, .tiff, .tif, .webp, .svg"
    multiple // multiple flag allows users to upload multiple files at a time.
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        setFileSizeError(null);
        for (let file of targetFilesArray) {
            if (file && file.size > MAX_FILE_SIZE) {
                setFileSizeError("One or more files exceed the file size limit.");
                return; // break out of the whole function
            } else {
                continue;
            }
        }
        const selectedFiles = targetFilesArray.map((file) => {
            const url = URL.createObjectURL(file);
            return {file, url}
          });
        const imagePreviews: string[] = selectedFiles.map((file) => {
            return file.url;
        })
        let newImageFiles:any = currentImageFiles.concat(selectedFiles)
        console.log(newImageFiles.length)
        if (newImageFiles.length > 10 - currentImagePreviews.length) {
            newImageFiles = newImageFiles.slice(0, 10 - currentImagePreviews.length);
            console.log(newImageFiles.length);
        }
        let newImagePreviews:string[] = currentImagePreviews.concat(imagePreviews)
        if (newImagePreviews.length > 10 - currentImagePreviews.length) {
            newImagePreviews = newImagePreviews.slice(0, 10);
        }

        console.log(newImageFiles)
        onInputChange && onInputChange(newImageFiles);
        onImagePreviewsChange(newImagePreviews);

    }}
    />
}