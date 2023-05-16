import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./FormField.module.scss";
import Button, { IButtonProps } from "../buttons/Button";

export interface IFileUploaderProps extends Omit<IButtonProps, "defaultValue"> {
  onUpload: (file: FileReader["result"]) => void;
  defaultValue?: FileReader["result"];
  accept?: string;
  maxSizeInMB?: number;
}

export const FileUploader: React.FC<IFileUploaderProps> = ({
  onUpload,
  defaultValue = "",
  className,
  accept = "image/*",
  maxSizeInMB = 1,
  children = "Upload Image",
  ...rest
}) => {
  const [file, setFile] = useState<FileReader["result"]>(defaultValue);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxSize = maxSizeInMB * 1e6;

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event.target.files?.[0];
    if (_file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFile(e.target.result);
        }
        setLoading(false);
      };
      if (_file.size <= maxSize) {
        setLoading(true);
        setError(undefined);
        reader.readAsDataURL(_file);
      } else {
        setError(`Please upload an image less than ${maxSizeInMB}MB.`);
      }
    }
  };

  useEffect(() => {
    if (typeof onUpload === "function") {
      onUpload(file);
    }
  }, [file]);

  const handleUploadAction = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={classNames(styles.fieldContainer, styles.fileUploader)}>
      <div className={styles.inputContainer}>
        <input
          type="file"
          onChange={handleUpload}
          className={styles.hiddenFileInput}
          ref={inputRef}
          accept={accept}
        />
        <Button
          onClick={handleUploadAction}
          className={classNames(styles.fileUploadButton, className)}
          {...rest}
        >
          {loading ? "Uploading..." : children}
        </Button>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default FileUploader;
