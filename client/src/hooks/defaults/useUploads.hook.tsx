import React, { useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

const useUploads = (options: DropzoneOptions) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, ...options });

  const restart = () => {
    setSelectedFile(null);
  };

  return {
    selectedFile,
    getInputProps,
    getRootProps,
    restart,
  };
};

export default useUploads;
