import React, { useState } from "react";
import { useField } from "formik";

const HorizontalSlider = ({
  label,
  name = label,
  id = name,
  startAtMax = false,
  startAtMin = false,
  onChange: passedOnChange = () => {},
  min = 0,
  max = 100,
  defaultValue = startAtMax ? max : startAtMin ? min : (min + max) / 2,
  step = 1,
  size = "full"
}: {
  id?: string;
  label: string;
  name?: string;
  startAtMax?: boolean;
  startAtMin?: boolean;
  onChange?: (values?: any) => any;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  size: string;
}) => {
  const [field] = useField(name);
  const [value, setValue] = useState<number>(defaultValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    setValue(value);
    field.onChange({ target: { name, value } });
    passedOnChange(value);
  };
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    setValue(value);
    field.onBlur({ target: { name, value } });
  };
  return (
    <div className="slds-form-element">
      <label className="slds-form-element__label" htmlFor={id}>
        <span className="slds-slider-label">
          <span className="slds-slider-label__label">{label}</span>
          <span className="slds-slider-label__range">
            {min} - {max}
          </span>
        </span>
      </label>
      <div className="slds-form-element__control">
        <div
          className={
            "slds-slider" + (size !== "full" ? " slds-size_" + size : "")
          }
        >
          <input
            name={name}
            type="range"
            id={id}
            min={min}
            max={max}
            step={step}
            className="slds-slider__range"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <span className="slds-slider__value" aria-hidden="true">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSlider;
