import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./FormField.module.scss";
import Button, { IButtonProps } from "../buttons/Button";

export interface IFileUploaderProps extends Omit<IButtonProps, "defaultValue"> {
  onUpload: (file: FileReader["result"]) => void;
  defaultValue?: FileReader["result"];
  accept?: string;
  maxSizeInMB?: number;
  label?: string;
  labelPosition?: "above" | "inline";
  align?: "start" | "center" | "end";
  small?: boolean;
  toBase64?: boolean;
}

export const FileUploader: React.FC<IFileUploaderProps> = ({
  onUpload,
  defaultValue = "",
  className,
  accept = "image/*",
  maxSizeInMB = 1,
  children = "Upload Image",
  label,
  labelPosition = "inline",
  align = "start",
  small,
  toBase64,
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
      if (maxSizeInMB > 0 && _file.size <= maxSize) {
        setLoading(true);
        setError(undefined);
        if (toBase64) {
          reader.readAsDataURL(_file);
        } else if (_file.type === "application/json") {
          reader.readAsText(_file);
        }
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
    <div
      className={classNames(
        styles.fieldContainer,
        styles[labelPosition],
        styles[align],
        small && styles.small,
        className
      )}
    >
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
        </div>
      )}
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
