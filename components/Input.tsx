import React, { useEffect } from "react";
import { useField } from "formik";
import DateInput from './DateInput'
const Input = ({
  children = null,
  label,
  name,
  id = name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  ...props
}: {
  children?: any,
  label: string,
  name: string,
  id: string,
  type: string,
  required: boolean,
  placeholder: string,
  value: any
}) => {
  if(type === 'date') return <DateInput required={required} name={name} label={label} id={id} />
  const [field, meta] = useField({ name });
  useEffect(() => {
    return () => {
      field.onChange({ target: { name, value: meta.initialValue } });
    };
  }, []);
  return (
    <div
      className={`slds-form-element ${meta.touched &&
        meta.error &&
        `slds-has-error`}`}
    >
      <label className="slds-form-element__label" htmlFor={id}>
        {required && (
          <abbr className="slds-required" title="required">
            *{" "}
          </abbr>
        )}
        {label}
      </label>
      <div className="slds-form-element__control">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          required={required}
          className="slds-input"
          {...props}
          {...field}
          value={field.value || value || ""}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="slds-form-element__help" id={`${name}-form-error`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
