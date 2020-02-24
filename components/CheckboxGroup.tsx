import React, { useState, useEffect } from "react";
import { useField } from "formik";

type OptionType = {
  label: string;
  name?: string;
  value?: boolean;
  Id?: string;
};

const CheckboxGroup = ({
  options = [],
  name = "",
  onChange: onFieldChange = () => {},
  label = ""
}: {
  options?: Array<OptionType>;
  name?: string;
  onChange?: (event?: any) => any;
  label: string;
}) => {
  try {
    let [field, meta] = useField(name);
    const fieldValue : Array<string> = field.value || [];
    const onChange = (values: any): any => {
      field.onChange({ target: { name, value: values } });
      onFieldChange(values);
    };

    const passedState = (fieldValue).length
      ? options.map(option => ({
          ...option,
          value: fieldValue.includes(option.name || option.label)
        }))
      : options;
    const [state, setState] = useState<Array<OptionType>>(passedState);

    useEffect(() => {
      if (fieldValue) {
        const newState = fieldValue.length
          ? options.map(option => ({
              ...option,
              value: fieldValue.includes(option.name || option.label)
            }))
          : options;
        onChange(fieldValue);
        setState(newState);
      }
      return () => {
        onChange(meta.initialValue);
        setState(
          meta.initialValue.length
            ? options.map(option => ({
                ...option,
                value: meta.initialValue.includes(option.name || option.label)
              }))
            : options
        );
      };
    }, [fieldValue]);

    useEffect(() => {
      onChange(
        fieldValue.length
          ? fieldValue
          : state
              .filter(({ value }) => value)
              .map(({ label, name = label }) => name)
      );
      return () => {
        onChange([]);
      };
    }, []);

    return (
      <fieldset className="slds-form-element">
        <legend className="slds-form-element__legend slds-form-element__label">
          {label}
        </legend>
        <div className="slds-form-element__control">
          {state.map(({ label, value, name = label, Id = name }) => {
            try {
              const [field] = useField(name);

              const onInputChange = (
                event: React.FormEvent<HTMLInputElement>
              ) => {
                const newOptions = state.map(option => {
                  const { label, name = label } = option;
                  if (name === event.currentTarget.name)
                    return {
                      ...option,
                      value: event.currentTarget.checked
                    };
                  return option;
                });
                const newState = newOptions
                  .filter(({ value }) => value)
                  .map(({ label, name = label }) => name);
                setState(newOptions);
                onChange(newState);
                field.onChange(event);
              };
              useEffect(() => {
                field.onChange({ target: { name, checked: value } });
              }, [field.value, value]);
              return (
                <div key={Id} className="slds-checkbox">
                  <input
                    type="checkbox"
                    name={name}
                    id={Id}
                    value={value}
                    defaultChecked={value}
                    {...field}
                    onChange={onInputChange}
                  />
                  <label className="slds-checkbox__label" htmlFor={Id}>
                    <span className="slds-checkbox_faux"></span>
                    <span className="slds-form-element__label">{label}</span>
                  </label>
                </div>
              );
            } catch (error) {
              console.log(error);
              return null;
            }
          })}
        </div>
      </fieldset>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default CheckboxGroup;
