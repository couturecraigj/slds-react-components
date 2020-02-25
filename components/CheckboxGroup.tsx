import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

type OptionType = {
  label: string;
  name?: string;
  value?: boolean;
  Id?: string;
};

const CheckboxGroup = ({
  selectAll = false,
  options = [],
  name = "",
  onChange: onFieldChange = () => {},
  label = ""
}: {
  options?: Array<OptionType>;
  selectAll?: boolean;
  name?: string;
  onChange?: (event?: any) => any;
  label: string;
}) => {
  try {
    const [allSelected, setAllSelected] = useState("none");
    const [optionList, setOptionList] = useState<string[]>(
      options
        .filter(option => option.value)
        .map(option => option.name || option.label)
    );
    const formik = useFormikContext();
    const [field, meta] = useField(name);
    const formikValues: any = formik.values;
    const passOnChange = (options: OptionType[]) => {
      const newOptions = options
        .filter(option => option.value)
        .map(option => option.name || option.label);
      setOptionList(newOptions);
      onFieldChange(newOptions);
      field.onChange({target: {name, values: newOptions}})
    };
    const [state, setState] = useState<Array<OptionType>>(
      options.map(option => ({
        ...option,
        value: optionList.includes(option.name || option.label)
      }))
    );

    useEffect(() => {
      if (formikValues[name]) {
        const newOptions = options.map(option => ({
          ...option,
          value: formikValues[name].includes(option.name || option.label)
        }))
        setState(
          newOptions
        );
        formik.setValues({
          ...formikValues,
          [name]: newOptions
        });
        passOnChange(newOptions);
      }
      if (!formikValues[name]) {
        const options = state
          .filter(option => option.value)
          .map(option => option.name || option.label);
        formik.setValues({
          ...formikValues,
          [name]: options
        });
      }
    }, [formikValues[name]]);
    // useEffect(() => {
    //   if (fieldValue) {
    //     const newState = fieldValue.length
    //       ? options.map(option => ({
    //           ...option,
    //           value: fieldValue.includes(option.name || option.label)
    //         }))
    //       : options;
    //     onChange(fieldValue);
    //     setState(newState);
    //   }
    //   return () => {
    //     onChange(meta.initialValue);
    //     setState(
    //       meta.initialValue.length
    //         ? options.map(option => ({
    //             ...option,
    //             value: meta.initialValue.includes(option.name || option.label)
    //           }))
    //         : options
    //     );
    //   };
    // }, [fieldValue]);

    const onSelectAll = () => {
      setAllSelected(allSelected === "all" ? "none" : "all");
    };
    useEffect(() => {
      if (allSelected !== "some") {
        const formikValues = formik.values;
        const every = state.every(({ value }) => value);
        const newOptions = state.map(option => ({
          ...option,
          value:
            allSelected === "none"
              ? false
              : allSelected === "all"
              ? true
              : option.value
        }));

        setState(newOptions);
        const newState = newOptions
          .filter(({ value }) => value)
          .map(({ label, name = label }) => name);

        const values = {
          ...(typeof formikValues === "object" && formikValues !== null
            ? formikValues
            : {}),
          [name]: newState
        };
        const newValues = newOptions.reduce<any>(
          (previous, option) => ({
            ...previous,
            [option.name || option.label]: !every
          }),
          values
        );

        formik.setValues(newValues);
        passOnChange(options);
      }
    }, [allSelected]);
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const values: any = formik.values;
      const newValues = e.target.checked
        ? values[name].concat(e.target.name)
        : values[name].filter((name: string) => name !== e.target.name);
      let newAllSelected =
        newValues.length === options.length
          ? "all"
          : newValues.length === 0
          ? "none"
          : "some";

      formik.setValues({
        ...values,
        [e.target.name]: e.target.checked,
        [name]: newValues
      });
      passOnChange(options);
      setAllSelected(newAllSelected);
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
        {selectAll && (
          <div className="slds-form-element__control">
            <div className="slds-checkbox">
              <input
                type="checkbox"
                id="select-all"
                onChange={onSelectAll}
                checked={allSelected === "all" ? true : false}
              />
              <label className="slds-checkbox__label" htmlFor="select-all">
                <span className="slds-checkbox_faux"></span>
                <span className="slds-form-element__label">Select All</span>
              </label>
            </div>
          </div>
        )}

        <div className="slds-form-element__control">
          {state.map(({ label, value, name = label, Id = name }) => {
            try {
              return (
                <div className="slds-checkbox" key={Id}>
                  <input
                    type="checkbox"
                    id={Id}
                    name={name}
                    checked={value || false}
                    onChange={onCheckboxChange}
                  />
                  <label className="slds-checkbox__label" htmlFor={Id}>
                    <span className="slds-checkbox_faux"></span>
                    <span className="slds-form-element__label">{label}</span>
                  </label>
                  {meta.touched && meta.error ? (
                    <div
                      className="slds-form-element__help"
                      id={`${name}-form-error`}
                    >
                      {meta.error}
                    </div>
                  ) : null}
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
