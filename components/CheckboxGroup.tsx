import React, { useState, useEffect } from "react";
import { useField } from "formik";

type OptionType = {
  label: string;
  name?: string;
  value?: boolean;
  required?: boolean;
  disabled?: boolean;
  Id?: string;
};

const Checkbox = ({
  label = "",
  name = label,
  id = name,
  disabled = false,
  required = false,
  onChange: passedOnChange,
  value
}: {
  label: string;
  name?: string;
  id?: string;
  disabled: boolean;
  required: boolean;
  onChange: (e?: any) => any;
  value: boolean;
}) => {
  const [field, meta] = useField(name);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange({ target: { name, value: e.target.checked } });
    passedOnChange(e);
  };
  useEffect(() => {
    if (field.value !== value) {
      field.onChange({ target: { name, value: value } });
    }
  }, [value, field.value]);
  return (
    <div
      className={`slds-checkbox ${
        meta.touched && meta.error ? "slds-has-error" : ""
      }`}
    >
      {required && (
        <abbr className="slds-required" title="required">
          *
        </abbr>
      )}
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        id={id}
        checked={value}
        disabled={disabled}
      />
      <label className="slds-checkbox__label" htmlFor={id}>
        <span className="slds-checkbox_faux"></span>
        <span className="slds-form-element__label">{label}</span>
      </label>
      {meta.touched && meta.error ? (
        <div id={`${name}-error`} className="slds-form-element__help">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

const SelectAll = ({
  selectAll = false,
  required = false,
  disabled = false,
  name = "",
  label = "",
  children = () => {},
  onChange = () => {},
  options: passedOptions = []
}: {
  selectAll: boolean;
  required: boolean;
  disabled: boolean;
  name: string;
  label: string;
  children: (e?: any) => any;
  onChange: (e?: any) => any;
  options: OptionType[];
}) => {
  const [field, meta] = useField(name);
  const [selectedState, setSelectedState] = useState<"some" | "all" | "none">(
    "some"
  );
  const [options, setOptions] = useState<OptionType[]>([]);
  const onSelectAll = () => {
    if (selectedState === "all") {
      field.onChange({
        target: {
          name,
          value: []
        }
      });
    } else {
      field.onChange({
        target: {
          name,
          value: options.map(option => option.name || option.label)
        }
      });
    }
  };
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionList: string[] = [];
    const fieldValues: string[] = [];
    const newOptions = options.map(option => {
      if (!option.disabled) fieldValues.push(option.name || option.label);
      if (!option.disabled) {
        if (e.target.name === (option.name || option.label)) {
          console.log(e.target.name);
          if (e.target.checked) optionList.push(e.target.name);
        } else if (option.value) optionList.push(option.name || option.label);
      }
      if (e.target.name === (option.name || option.label)) {
        return {
          ...option,
          value: e.target.checked
        };
      }
      return option;
    });

    if (optionList.length === fieldValues.length) {
      setSelectedState("all");
    } else if (optionList.length === 0) {
      setSelectedState("none");
    } else {
      setSelectedState("some");
    }
    setOptions(newOptions);
    field.onChange({ target: { name, value: optionList } });
    onChange(optionList);
  };
  useEffect(() => {
    if (field.value) {
      const newOptions: OptionType[] = field.value.length
        ? passedOptions.map(option => {
            return {
              ...option,
              value: field.value.includes(option.name || option.label)
            };
          })
        : passedOptions;
      field.onChange({
        target: {
          name,
          value: newOptions
            .map(
              (option: OptionType): string | boolean =>
                !!option.value && (option.name || option.label)
            )
            .filter((v: string | boolean) => v)
        }
      });
      setOptions(newOptions);
    }
  }, []);
  useEffect(() => {
    let newOptions = [];
    const passedOptionsArray = passedOptions
      .filter(option => !(disabled || option.disabled))
      .map(option => option.name || option.label);
    const fieldValuesArray = (field.value || [])
      .map((string: string): OptionType | undefined =>
        passedOptions.find(option => (option.name || option.label) === string)
      )
      .filter(
        (option: OptionType | undefined): boolean =>
          !!option && !(disabled || option.disabled)
      )
      .map((option: OptionType): string => option.name || option.label);
    if (!disabled && fieldValuesArray.length === passedOptionsArray.length) {
      if (selectedState !== "all") setSelectedState("all");
      newOptions = passedOptions.map(option => {
        return {
          ...option,
          disabled: disabled || option.disabled,
          value: option.disabled ? false : true
        };
      });
    } else if (fieldValuesArray.length === 0) {
      if (selectedState !== "none") setSelectedState("none");
      newOptions = passedOptions.map(option => {
        return {
          ...option,
          disabled: disabled || option.disabled,
          value: false
        };
      });
    } else {
      if (selectedState !== "some") setSelectedState("some");
      newOptions = passedOptions.map(option => {
        return {
          ...option,
          disabled: disabled || option.disabled,
          value: option.disabled
            ? false
            : field.value.includes(option.name || option.label)
        };
      });
    }
    if (JSON.stringify(field.value) !== JSON.stringify(fieldValuesArray)) {
      console.log(fieldValuesArray);
      field.onChange({
        target: {
          name,
          value: fieldValuesArray
        }
      });
    }
    if (JSON.stringify(options) !== JSON.stringify(newOptions)) {
      onChange(fieldValuesArray);
      setOptions(newOptions);
    }
    // return () => onChange('something')
  }, [field.value]);
  return (
    <fieldset
      className={`slds-form-element ${
        meta.touched && meta.error ? "slds-has-error" : ""
      }`}
    >
      <legend className="slds-form-element__legend slds-form-element__label">
        {required && (
          <abbr className="slds-required" title="required">
            *
          </abbr>
        )}
        {label}
      </legend>
      <div className="slds-form-element__control">
        {selectAll && (
          <div className="slds-checkbox">
            <input
              type="checkbox"
              disabled={disabled}
              name={name}
              id={`${name}-select-all-input`}
              checked={selectedState === "all"}
              onChange={onSelectAll}
            />
            <label
              className="slds-checkbox__label"
              htmlFor={`${name}-select-all-input`}
            >
              <span className="slds-checkbox_faux"></span>
              <span className="slds-form-element__label">Select All</span>
            </label>
          </div>
        )}

        {options.map(option =>
          children({
            onChange: onCheckboxChange,
            disabled: option.disabled,
            required: option.required,
            name: option.name,
            value: option.value,
            label: option.label,
            id: option.Id || option.name || option.label
          })
        )}
      </div>
      {meta.touched && meta.error ? (
        <div id={`${name}-error`} className="slds-form-element__help">
          {meta.error}
        </div>
      ) : null}
    </fieldset>
  );
};

const CheckboxGroup = ({
  selectAll = false,
  options = [],
  label = "",
  required = false,
  disabled = false,
  name = label,
  onChange = () => {}
}: {
  options?: Array<OptionType>;
  selectAll?: boolean;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (event?: any) => any;
  label: string;
}) => {
  return (
    <SelectAll
      name={name}
      onChange={onChange}
      selectAll={selectAll}
      required={required}
      disabled={disabled}
      label={label}
      options={options}
    >
      {({ id, onChange, name, label, value, disabled, required }) => (
        <Checkbox
          disabled={disabled}
          required={required}
          key={id}
          onChange={onChange}
          name={name}
          label={label}
          value={value}
        />
      )}
    </SelectAll>
  );
};

export default CheckboxGroup;
