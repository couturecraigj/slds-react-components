import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import Svg from "./Svg";

type OptionType = {
  label: string;
  value?: string;
  id?: string;
};

type StrictOptionType = {
  label: string;
  value: string;
  id: string;
};

const convertOption = (option: OptionType | string): StrictOptionType => {
  let label = "";
  let value = "";
  let id = "";
  if (typeof option === "string") {
    label = option;
    value = option;
    id = option;
  } else {
    label = option.label;
    value = option.value || label;
    id = option.id || value;
  }
  return { label, value, id };
};
const MultipleCombobox = ({
  label,
  name = label,
  id = name,
  placeholder = "Please Select",
  defaultValue = [],
  options = [],
  onChange: passedChange = () => {},
  readOnly = true,
  required = false
}: {
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: Array<string>;
  defaultDisplay?: string;
  options: Array<OptionType | string>;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  required?: boolean;
}) => {
  const [field, meta] = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState();
  const [left, setLeft] = useState();
  const [hovered, setHovered] = useState();
  const [values, setValues] = useState(defaultValue);
  const onChange = (values: Array<string>) => {
    field.onChange({ target: { name, value: values } });
    setTimeout(() => passedChange({ target: { name, value: values } }), 0);
  };
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    const option = values.find(
      val => val === event.currentTarget.dataset.value
    );
    let finalValues: Array<string> = [];
    if (!option)
      finalValues = [...values, event.currentTarget.dataset.value || ""];
    else
      finalValues = values.filter(
        val => val !== event.currentTarget.dataset.value
      );
    setValues(finalValues);
    onChange(finalValues);
  };
  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFocused(false);
    let finalValues = values.filter(
      val => val !== event.currentTarget.dataset.value
    );
    setValues(finalValues);
    onChange(finalValues);
  };
  const onFocus = () => {
    setFocused(true);
    onChange(field.value || []);
  };
  const onHoverOption = (value: string) => () => {
    onEnter();
    setHovered(value);
  };
  const onLeave = () => {
    setLeft(true);
  };
  const onEnter = () => {
    setLeft(false);
  };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (left) setFocused(false);
    console.log("onBlur");
    field.onBlur(e);
  };
  useEffect(() => {
    return () => {
      field.onChange({ target: { name, value: [] } });
    };
  }, []);
  return (
    <div
      className={`slds-form-element ${meta.touched &&
        meta.error &&
        `slds-has-error`}`}
      onMouseLeave={onLeave}
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
        <div className="slds-combobox_container">
          <div
            className={`slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${focused &&
              `slds-is-open`}`}
            aria-expanded={focused ? "true" : "false"}
            aria-haspopup="listbox"
            role="combobox"
          >
            <div
              className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
              role="none"
            >
              <input
                ref={inputRef}
                onMouseOver={onEnter}
                type="text"
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseLeave={onLeave}
                className="slds-input slds-combobox__input"
                name={name}
                id={id}
                aria-controls={`${name}-list-box`}
                readOnly={readOnly}
                autoComplete="off"
                role="textbox"
                placeholder={placeholder}
              />
              <span className="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                <Svg xlinkHref={"/icons/utility-sprite/svg/symbols.svg#down"} />
              </span>
            </div>
            <div
              id={`${name}-list-box`}
              className="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
              role="listbox"
            >
              <ul
                className="slds-listbox slds-listbox_vertical"
                role="presentation"
              >
                {options.map(option => {
                  const { value: optionValue, id, label } = convertOption(
                    option
                  );
                  const selected = values.includes(optionValue);
                  return (
                    <li
                      key={id}
                      role="presentation"
                      className="slds-listbox__item"
                    >
                      <div
                        id={id}
                        onClick={onClick}
                        data-display={label}
                        data-value={optionValue}
                        aria-selected={selected}
                        onMouseOver={onHoverOption(optionValue)}
                        onMouseLeave={onLeave}
                        className={`slds-media slds-listbox__option slds-listbox__option_plain slds-media_small ${selected &&
                          `slds-is-selected`} ${values.includes(hovered) &&
                          `slds-is-focused`}`}
                        role="option"
                      >
                        <span className="slds-media__figure slds-listbox__option-icon">
                          {selected && (
                            <span className="slds-icon_container slds-icon-utility-check slds-current-color">
                              <Svg
                                xlinkHref={
                                  "/icons/utility-sprite/svg/symbols.svg#check"
                                }
                              />
                            </span>
                          )}
                        </span>
                        <span className="slds-media__body">
                          <span className="slds-truncate" title={label}>
                            {label}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {values.length > 0 && (
          <div
            className="slds-listbox_selection-group large-group"
            style={{ height: "auto" }}
          >
            <ul
              className="slds-listbox slds-listbox_horizontal"
              role="listbox"
              aria-label="Selected Options:"
              aria-orientation="horizontal"
            >
              {values.map(chosenValue => {
                const specificOption = options.find(option => {
                  const { value: optionValue } = convertOption(option);
                  if (chosenValue === optionValue) return true;
                  return false;
                });
                if (!specificOption) return null;
                const chosenOption = convertOption(specificOption);
                return (
                  <li
                    key={chosenOption.id}
                    className="slds-listbox-item"
                    role="presentation"
                  >
                    <span
                      className="slds-pill"
                      role="option"
                      tabIndex={0}
                      aria-selected="true"
                    >
                      <span
                        className="slds-pill__label"
                        title={chosenOption.label}
                      >
                        {chosenOption.label}
                      </span>
                      <span
                        className="slds-icon_container slds-pill__remove"
                        data-value={chosenOption.value}
                        onClick={onRemove}
                        title="Remove"
                      >
                        <Svg xlinkHref="/icons/utility-sprite/svg/symbols.svg#close" />
                        <span className="slds-assistive-text">
                          Press delete or backspace to remove
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="slds-form-element__help" id={`${name}-form-error`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default MultipleCombobox;
