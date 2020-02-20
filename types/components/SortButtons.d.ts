/// <reference types="react" />
declare const SortButtons: ({ options, label, name, id, required, onChange }: {
    onChange: (e: any) => any;
    required?: boolean | undefined;
    label: string;
    id?: string | undefined;
    name: string;
    options: {
        selected?: boolean | undefined;
        value: string;
        label: string;
    }[];
}) => JSX.Element;
export default SortButtons;
//# sourceMappingURL=SortButtons.d.ts.map