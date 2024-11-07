import React, { forwardRef } from "react";

interface ImageInputProps {
  name: string;
  id: string;
  required?: boolean;
  value?: string;
  customClassname?: string;
  onInputChange?: (input: File | null) => void;
  currentImageFile: File | null;
  currentImagePreview: string;
  onImagePreviewChange: (input: string) => void;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ customClassname, name, id, onInputChange, onImagePreviewChange, currentImageFile, currentImagePreview }: ImageInputProps, ref) => {
    const commonClassName = "w-11/12 m-2 pl-4 rounded-sm bg-gray-100 text-black";
    return (
      <input
        className={`${commonClassName} ${customClassname}`}
        name={name}
        id={id}
        ref={ref}  // Forward the ref here
        type="file"
        accept=".jpg, .jpeg, .png, .bmp, .tiff, .tif, .webp, .svg"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const targetFiles = e.target.files;
          if (targetFiles) {
            const selectedFile = targetFiles[0];
            const imagePreview = URL.createObjectURL(selectedFile);
            onInputChange && onInputChange(selectedFile);
            onImagePreviewChange(imagePreview);
          }
        }}
      />
    );
  }
);

export default ImageInput;
