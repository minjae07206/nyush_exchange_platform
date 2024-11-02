interface FileInputProps {
    name: string;
    id: string;
    required?: boolean;
    maxlength?:number;
    minlength?:number;
    value?:string;
    customClassname?: string;
    onInputChange?: (input:File[]) => void;
    currentImageFiles: File[];
    currentImagePreviews: string[];
    onImagePreviewsChange: (input:string[]) => void;
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
    currentImagePreviews,
    onImagePreviewsChange,
    currentImageFiles,
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
    disabled={currentImageFiles.length >= 10}
    type="file"
    accept=".jpg, .jpeg, .png, .bmp, .tiff, .tif, .webp, .svg"
    multiple // multiple flag allows users to upload multiple files at a time.
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        const selectedFiles: File[] = targetFilesArray.map((file) => {
            return file
          });
        const imagePreviews: string[] = targetFilesArray.map((file) => {
            return URL.createObjectURL(file);
        })
        let newImageFiles:File[] = currentImageFiles.concat(selectedFiles)
        if (newImageFiles.length > 10) {
            newImageFiles = newImageFiles.slice(0, 10);
        }
        let newImagePreviews:string[] = currentImagePreviews.concat(imagePreviews)
        if (newImagePreviews.length > 10) {
            newImagePreviews = newImagePreviews.slice(0, 10);
        }

        console.log(newImageFiles)
        onInputChange && onInputChange(newImageFiles);
        onImagePreviewsChange(newImagePreviews);

    }}
    />
}