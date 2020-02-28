/// <reference types="react" />
declare type OptionType = {
    label: string;
    value?: string;
    id?: string;
};
declare const MultipleCombobox: ({ label, name, id, placeholder, defaultValue, filterable, options, onChange: passedChange, readOnly, required }: {
    label: string;
    name?: string | undefined;
    id?: string | undefined;
    placeholder?: string | undefined;
    defaultValue?: string[] | undefined;
    defaultDisplay?: string | undefined;
    options: (string | OptionType)[];
    onChange?: ((e: any) => any) | undefined;
    readOnly?: boolean | undefined;
    filterable?: boolean | undefined;
    required?: boolean | undefined;
}) => JSX.Element;
export default MultipleCombobox;
//# sourceMappingURL=MultipleCombobox.d.ts.map