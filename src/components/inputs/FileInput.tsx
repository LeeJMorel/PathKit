import React, { useRef, useState, useCallback } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { useDropzone, Accept, FileError } from "react-dropzone";
import { GenericInputElement, IInputProps } from "./Inputs.types";
import styles from "./Inputs.module.scss";
import fallback from "../../assets/fighter.png";

export interface IFileInputProps extends IInputProps<GenericInputElement> {}

export const FileInput = React.forwardRef(
  (
    {
      label,
      name,
      value,
      validation,
      onValidation,
      onChange,
      onUpload,
      errorMessage,
      required,
      getIsRequired,
      type = "file",
      width,
      fluid,
      multiline,
      className,
      ...rest
    }: IFileInputProps,
    ref: React.ForwardedRef<GenericInputElement>
  ) => {
    // const [value, setValue] = useState(valueProp);
    const [isValid, setIsValid] = useState(true);
    const isRequired = useRef<boolean>(
      required || (typeof getIsRequired === "function" && getIsRequired())
    );

    const debouncedValidate = debounce(async (val) => {
      if (typeof validation === "function") {
        const valid = await validation(val);
        console.log("isValid", { valid });
        setIsValid(await validation(val));
        if (typeof onValidation === "function") {
          onValidation(name, valid);
        }
      }
    }, 500);

    const handleFileLoad = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        if (typeof onUpload === "function") {
          onUpload(name, event.target.result);
        }
        // setValue(event.target.result.toString());
      }
      debouncedValidate(event.target?.result);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
      // Do something with the files
      const foo = acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          //store result into your state array.
          console.log("image upload", event);
          handleFileLoad(event);
        };
        reader.readAsDataURL(file);
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
      useDropzone({
        onDrop,
        accept: {
          "image/*": [],
        },
        maxFiles: 1,
        validator: (file) => {
          if (file.size > 5242880) {
            return {
              code: "size-too-large",
              message: "The file is too big. Max: 5MB.",
            } as FileError;
          }
          return null;
        },
      });
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    ));

    return (
      <div className={classNames(styles.formFieldContainer, className)}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <div className={styles.imagePreview}>
            <img src={(value as string) || fallback} alt="Preview upload" />
          </div>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
        {!isValid ||
          (fileRejectionItems.length > 0 && (
            <div className={styles.errorMessageContainer}>
              <span className={styles.errorMessage}>{errorMessage}</span>
              <ul className={styles.errorMessage}>{fileRejectionItems}</ul>
            </div>
          ))}
      </div>
    );
  }
);

export default FileInput;
