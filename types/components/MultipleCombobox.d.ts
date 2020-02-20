/// <reference types="react" />
declare type OptionType = {
  label: string;
  value?: string;
  id?: string;
};
declare const MultipleCombobox: ({
  label,
  name,
  id,
  placeholder,
  defaultValue,
  options,
  onChange: passedChange,
  readOnly,
  required
}: {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  defaultValue: string[];
  defaultDisplay: string;
  options: (string | OptionType)[];
  onChange: (e: any) => any;
  readOnly: boolean;
  required: boolean;
}) => JSX.Element;
export default MultipleCombobox;
//# sourceMappingURL=MultipleCombobox.d.ts.map
