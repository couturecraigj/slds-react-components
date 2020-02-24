/// <reference types="react" />
declare type OptionType = {
    label: string;
    name?: string;
    value?: boolean;
    Id?: string;
};
declare const CheckboxGroup: ({ options, name, onChange: onFieldChange, label }: {
    options?: OptionType[] | undefined;
    name?: string | undefined;
    onChange?: ((event?: any) => any) | undefined;
    label: string;
}) => JSX.Element | null;
export default CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.d.ts.map