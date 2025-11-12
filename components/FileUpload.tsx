
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full max-w-lg p-8 mx-auto border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
        disabled
          ? 'border-base-300 bg-base-200 opacity-50'
          : 'border-brand-primary bg-base-200/50 hover:bg-brand-primary/10'
      }`}
      onClick={!disabled ? handleClick : undefined}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="audio/*"
        disabled={disabled}
      />
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadIcon className="w-10 h-10 mb-4 text-brand-accent" />
        <p className="mb-2 text-sm text-content-200">
          <span className="font-semibold text-brand-accent">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-content-200">Audio files (MP3, WAV, etc.)</p>
      </div>
    </div>
  );
};