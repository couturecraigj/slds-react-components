/// <reference types="react" />
declare const SortButtons: ({ options, name, onChange }: {
    onChange: (e: any) => any;
    name: string;
    options: {
        selected?: boolean | undefined;
        value: string;
        label: string;
    }[];
}) => JSX.Element;
export default SortButtons;
//# sourceMappingURL=SortButtons.d.ts.map