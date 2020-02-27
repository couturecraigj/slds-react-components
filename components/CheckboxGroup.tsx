import React, { useState, useEffect } from "react";
import { useField } from "formik";

const getOptionList = (options: OptionType[]): string[] =>
  options
    .filter(option => option.value)
    .map(option => option.name || option.label);

type OptionType = {
  label: string;
  name?: string;
  value?: boolean;
  Id?: string;
};

const Checkbox = ({
  Id = "",
  name = "",
  checked = false,
  label,
  onChange = () => {}
}: {
  name: string;
  Id: string;
  checked: boolean;
  label: string;
  onChange: (e: any) => any;
}) => {
  try {
    const [field] = useField(name);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      onChange(e);
    };
    useEffect(() => {
      field.onChange({ target: { name, value: checked } });
    }, [checked]);
    return (
      <div className="slds-checkbox" key={Id}>
        <input
          type="checkbox"
          id={Id}
          name={name}
          checked={checked}
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
};

const SelectAll = ({
  children,
  selectAll,
  name,
  onChange = () => {},
  label,
  options = []
}: {
  children: (e: any) => any;
  name: string;
  label: string;
  onChange: (e: any) => any;
  selectAll: boolean;
  options: OptionType[];
}) => {
  const [field, meta] = useField(name);
  const [state, setState] = useState("some");
  const [optionList, setOptionList] = useState(getOptionList(options));
  useEffect(() => {
    onChange(optionList);
    field.onChange({ target: { name, value: optionList } });
  }, [optionList]);
  const onSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = options
      .filter(() => e.target.checked)
      .map(option => option.name || option.label);
    setOptionList(value);
    field.onChange({ target: { name, value } });
    setState(e.target.checked ? "all" : "none");
  };
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptionList = optionList
      .concat(e.target.name)
      .filter(option => (option === e.target.name ? e.target.checked : option));
    if (newOptionList.length === options.length) setState("all");
    if (newOptionList.length === 0) setState("none");
    if (state !== "some") setState("some");
    setOptionList(newOptionList);
  };
  return (
    <fieldset
      className={`slds-form-element ${meta.touched &&
        meta.error &&
        `slds-has-error`}`}
    >
      <legend className="slds-form-element__legend slds-form-element__label">
        {label}
      </legend>
      <div className="slds-form-element__control">
        {selectAll ? (
          <>
            <div className="slds-checkbox">
              <input
                type="checkbox"
                id="select-all"
                onChange={onSelectAll}
                checked={state === "all" ? true : false}
              />
              <label className="slds-checkbox__label" htmlFor="select-all">
                <span className="slds-checkbox_faux"></span>
                <span className="slds-form-element__label">Select All</span>
              </label>
            </div>
            {children({
              onChange: onCheckboxChange,
              options: options.map(option => ({
                ...option,
                value: optionList.includes(option.name || option.label)
              }))
            })}
          </>
        ) : (
          children({
            onChange: onCheckboxChange,
            options: options.map(option => ({
              ...option,
              value: optionList.includes(option.name || option.label)
            }))
          })
        )}
      </div>
    </fieldset>
  );
};

const CheckboxGroup = ({
  selectAll = false,
  options = [],
  name,
  onChange = () => {},
  label = ""
}: {
  options?: Array<OptionType>;
  selectAll?: boolean;
  name?: string;
  onChange?: (event?: any) => any;
  label: string;
}) => {
  try {
    return (
      <SelectAll
        label={label}
        name={name || label}
        onChange={onChange}
        options={options}
        selectAll={selectAll}
      >
        {({
          onChange,
          options
        }: {
          onChange: (e: any) => any;
          options: OptionType[];
        }) =>
          options.map(({ label, name = label, Id = name, value = false }) => (
            <Checkbox
              checked={value}
              name={name}
              key={Id}
              label={label}
              Id={Id}
              onChange={onChange}
            />
          ))
        }
      </SelectAll>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default CheckboxGroup;
