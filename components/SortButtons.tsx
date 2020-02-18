import React, { useState } from "react";
import { useField } from "formik";
const SortButtons = ({
  options = [],
  name = "",
  onChange
}: {
  onChange: (e: any) => any;
  name: string;
  options: Array<{ selected?: boolean; value: string; label: string }>;
}) => {
  const [field] = useField(name);
  const [selected, setSelected] = useState(
    (options.find(option => option.selected) || {}).value
  );
  const [asc, setAsc] = useState(true);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let newAsc = asc;
    const { value } = event.currentTarget.dataset;
    setSelected(value);
    if (value === selected) {
      newAsc = !asc;
      setAsc(newAsc);
    } else {
      setAsc(true);
    }
    onChange(value);
    field.onChange({ target: { name, value: { value, asc: newAsc } } });
  };
  return (
    <div className="slds-button-group" role="group">
      {options.map(option => (
        <button
          type="button"
          data-value={option.value}
          key={option.value}
          onClick={onClick}
          className={
            "slds-button slds-button_" +
            (option.value === selected ? "neutral" : "brand")
          }
        >
          {option.label}
          {option.value === selected && (
            <svg
              className="slds-button__icon slds-button__icon_medium"
              style={{ paddingLeft: "4px" }}
              aria-hidden="true"
            >
              <use
                xlinkHref={
                  "./icons/utility-sprite/svg/symbols.svg#" +
                  (asc ? "chevrondown" : "chevronup")
                }
              ></use>
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
