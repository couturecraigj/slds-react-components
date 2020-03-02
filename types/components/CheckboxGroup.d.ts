/// <reference types="react" />
declare type OptionType = {
    label: string;
    name?: string;
    value?: boolean;
    required?: boolean;
    disabled?: boolean;
    Id?: string;
};
declare const CheckboxGroup: ({ selectAll, options, label, required, disabled, name, onChange }: {
    options?: OptionType[] | undefined;
    selectAll?: boolean | undefined;
    required?: boolean | undefined;
    disabled?: boolean | undefined;
    name?: string | undefined;
    onChange?: ((event?: any) => any) | undefined;
    label: string;
}) => JSX.Element;
export default CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.d.ts.map