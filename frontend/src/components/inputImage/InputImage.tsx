import React, { useState, ChangeEvent } from "react";

interface ImageInputProps {
  label: string;
  id: string;
  onFileChange: (file: File | null) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ label, id, onFileChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-3 text-sm font-medium text-white">
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
      />
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
