import React from "react";

export type GenericInputElement = HTMLInputElement & HTMLTextAreaElement;

export interface IInputProps<T = GenericInputElement>
  extends Omit<React.HTMLProps<T>, "onChange"> {
  /** The name of the field as it appears in the dataset */
  name: string;
  /** The label that appears by the input */
  label: string;

  options?: any[];

  onChange?: (name: string, value: any) => void;

  onUpload?: (name: string, result: FileReader["result"]) => void;

  onValidation?: (name: string, valid?: boolean) => void;

  validation?: (value: any) => boolean | Promise<boolean>;

  errorMessage?: string;

  getIsRequired?: (...args: any[]) => boolean;

  variant?: "normal" | "underline";

  width?: number;

  fluid?: boolean;

  multiline?: boolean;
}

export interface IFormFieldProps<T = GenericInputElement>
  extends IInputProps<T> {
  value?: any;
  /** Organize fields by groups */
  group?: string;
  /** Determines what JSX is rendered */
  inputType:
    | "text"
    | "number"
    | "textarea"
    | "checkbox"
    | "radio"
    | "textarea"
    | "dropdown"
    | "multiselect"
    | "file";
  // Element: React.ElementType;

  multipleInputs?: boolean;

  multipleInputsType?: "list" | "dict";

  /** For use when multipleFieldsType === "dict". Provides suggestions on names for the keys */
  keySuggestions?: any[];
}
