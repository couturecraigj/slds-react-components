/// <reference types="react" />
declare type OptionType = {
    label: string;
    name?: string;
    value?: boolean;
    disabled?: boolean;
    Id?: string;
};
declare const CheckboxGroup: ({ selectAll, options, name, onChange, label }: {
    options?: OptionType[] | undefined;
    selectAll?: boolean | undefined;
    name?: string | undefined;
    onChange?: ((event?: any) => any) | undefined;
    label: string;
}) => JSX.Element | null;
export default CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.d.ts.map