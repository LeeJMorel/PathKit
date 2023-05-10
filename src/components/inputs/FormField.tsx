import React, { useState, useCallback } from "react";
import { GenericInputElement, IFormFieldProps } from "./Inputs.types";
import styles from "./Inputs.module.scss";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import FileInput from "./FileInput";

export const FormField = React.forwardRef(
  (
    {
      group,
      name,
      value,
      inputType = "text",
      // Element = TextInput,
      multipleInputs,
      multipleInputsType,
      keySuggestions,
      onChange,
      onUpload,
      ref: refProp,
      ...inputProps
    }: IFormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    console.log("debug: formfield", { name, value });
    // const handleSingleValueChange = useCallback(
    //   (name: string, newValue: any) => {
    //     console.log("debug: formfield handlesingvaluechange", { name, value });
    //     if (typeof onChange === "function") {
    //       onChange(name, newValue);
    //     }
    //   },
    //   [onChange]
    // );
    // const handleFileUpload = useCallback(
    //   (name: string, result: FileReader["result"]) => {
    //     if (typeof onUpload === "function") {
    //       onUpload(name, result);
    //     }
    //   },
    //   [onUpload]
    // );

    const renderSingleInput = useCallback(() => {
      switch (inputType) {
        case "file":
          return (
            <FileInput
              {...inputProps}
              name={name}
              value={value}
              onUpload={onUpload}
            />
          );

        case "checkbox":
          return (
            <Checkbox
              {...inputProps}
              name={name}
              value={value}
              onChange={onChange}
            />
          );

        case "text":
        default:
          return (
            <TextInput
              {...inputProps}
              name={name}
              value={value}
              onChange={onChange}
            />
          );
      }
    }, [inputType, name, value, onChange, inputProps]);

    return multipleInputs ? (
      <div>Now there are two of them!</div>
    ) : (
      renderSingleInput()
    );
  }
);

export default FormField;
