/// <reference types="react" />
/// <reference types="formik" />
import React, { useState, useEffect } from "react";
import { useField } from "formik";
import Svg from "./Svg";
const Combobox = ({
  label = "",
  name = label,
  id = name,
  placeholder = "Please Select",
  defaultValue = "",
  defaultDisplay = "",
  options = [],
  onChange = () => {},
  readOnly = true,
  required = false
}: {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  defaultValue: string;
  defaultDisplay: string;
  options: any[];
  onChange: (data: any) => any;
  readOnly: boolean;
  required: boolean;
}) => {
  const [field, meta] = useField({ name });
  const [focused, setFocused] = useState();
  const [left, setLeft] = useState();
  const [hovered, setHovered] = useState();
  const [value, setValue] = useState(defaultValue);
  const [display, setDisplay] = useState(defaultDisplay);
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { value, display } = event.currentTarget.dataset;

    setFocused(false);
    if (value) setValue(value);
    setDisplay(!value ? "" : display || "");
    onChange(value);
    field.onChange({ target: { name, value: value } });
  };
  const onFocus = () => {
    setFocused(true);
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
  const onBlur = (e: React.FocusEvent) => {
    if (left) setFocused(false);
    field.onBlur(e);
  };
  useEffect(() => {
    return () => {
      field.onChange({ target: { name, value: meta.initialValue } });
    };
  }, []);
  useEffect(() => {
    setValue(field.value);
    const display =
      (options.find(({ value }) => field.value === value) || {}).label ||
      field.value ||
      "";
    console.log(display);
    setDisplay(display);
    onChange(field.value);
  }, [field.value]);
  const noneOption = required ? [] : [{ value: "", label: placeholder }];

  return (
    <div className="slds-form-element" onMouseLeave={onLeave}>
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
                onMouseOver={onEnter}
                type="text"
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseLeave={onLeave}
                className="slds-input slds-combobox__input"
                value={display}
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
                {[...noneOption, ...options].map(
                  ({ label, value: optionValue = label, id = optionValue }) => {
                    const selected = optionValue === value;
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
                          onMouseOver={onHoverOption(value)}
                          onMouseLeave={onLeave}
                          className={`slds-media slds-listbox__option slds-listbox__option_plain slds-media_small ${selected &&
                            `slds-is-selected`} ${hovered === value &&
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
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Combobox;
