/// <reference types="react" />
declare const HorizontalSlider: ({ label, name, id, startAtMax, startAtMin, onChange: passedOnChange, min, max, defaultValue, step, size }: {
    id?: string | undefined;
    label: string;
    name?: string | undefined;
    startAtMax?: boolean | undefined;
    startAtMin?: boolean | undefined;
    onChange?: ((values?: any) => any) | undefined;
    min?: number | undefined;
    max?: number | undefined;
    defaultValue?: number | undefined;
    step?: number | undefined;
    size: string;
}) => JSX.Element;
export default HorizontalSlider;
//# sourceMappingURL=HorizontalSlider.d.ts.map