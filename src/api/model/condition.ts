// Interface made from foundry vtt condition json. Incomplete!
export interface Condition {
  _id?: string;
  img?: string;
  name?: string;
  system?: System;
  type?: string;
}

export interface System {
  description?: Description;
  duration?: Duration;
  group?: null;
  overrides?: string[];
  references?: References;
  rules?: Rule[];
  source?: Description;
  value?: Value;
}

export interface Description {
  value?: string;
}

export interface Duration {
  value?: number;
}

export interface References {
  children?: any[];
  immunityFrom?: any[];
  overriddenBy?: any[];
  overrides?: any[];
}

export interface Rule {
  key?: string;
  mode?: string;
  path?: string;
  value?: boolean;
  onDeleteActions?: OnDeleteActions;
  uuid?: string;
}

export interface OnDeleteActions {
  grantee?: string;
}

export interface Value {
  isValued?: boolean;
  value?: null;
}
