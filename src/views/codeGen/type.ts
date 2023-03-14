import { IDatePickerType } from "element-plus/es/components/date-picker/src/date-picker.type";

type InputTypes = "input" | "select" | "inputNumber" | "date" | "input-textarea";

type InputConfig = {
  prop: string;
  value: undefined;
  label: string;
  inputType: "input";
  style?: Record<string, any>;
  clearable?: true;
  filterable?: true;
  disabled?: false;
  blankPlaceholder?: boolean;
  placeholder?: string;
  "show-password"?: boolean;
  type?: "text" | "textarea";
  required?: boolean;
  trigger?: "change" | "blur";
};

type InputNumberConfig = {
  prop: string;
  value: undefined;
  label: string;
  inputType: "inputNumber";
  style?: Record<string, any>;
  clearable?: true;
  filterable?: true;
  disabled?: false;
  blankPlaceholder?: boolean;
  placeholder?: string;
  "show-password"?: boolean;
  type?: "text" | "textarea";
  trigger?: "change" | "blur";

  required?: boolean;
};

type SelectConfig = {
  prop: string;
  value: undefined;
  label: string;
  inputType: "select";
  style?: Record<string, any>;
  clearable?: true;
  filterable?: true;
  disabled?: false;
  multiple?: false;
  required?: boolean;
  trigger?: "change" | "blur";
  optionsKey?: string; // sexOptions
  placeholder?: boolean;
  blankPlaceholder?: boolean;
  options: { label: string; value: any }[];
};

type DateConfig = {
  prop: string;
  value: undefined;
  label: string;
  inputType: "date";
  style?: Record<string, any>;
  required?: boolean;
  trigger?: "change" | "blur";

  clearable?: true;
  filterable?: true;
  disabled?: false;
  multiple?: false;
  "value-format"?: string;
  "range-separator"?: string;
  placeholder?: boolean;
  blankPlaceholder?: boolean;
  "end-placeholder"?: string;
  "start-placeholder"?: string;
  type?: IDatePickerType;
  // type?: "year" | "month" | "date" | "dates" | "datetime" | " week" | "datetimerange" | "daterange" | "monthrange";
};

type InputText = Omit<InputConfig, "inputType"> & {
  rows?: number;
  inputType: "input-textarea";
};
export type FormItem = InputConfig | SelectConfig | DateConfig | InputText | InputNumberConfig;
export type FormConfig = {
  formConfig?: {
    inline?: true;
    size?: string;
    labelWidth?: string;
    refName?: string;
  };
  items: FormItem[];
};
