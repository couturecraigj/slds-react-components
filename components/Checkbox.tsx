import React from "react";

const Checkbox = ({
  label,
  name,
  id = name,
  defaultValue,
  required
}: {
  label: string;
  name: string;
  id: string;
  defaultValue: boolean;
  required: boolean;
}) => (
  <div className="slds-form-element">
    <div className="slds-form-element__control">
      <div className="slds-checkbox">
        {required && (
          <abbr className="slds-required" title="required">
            *
          </abbr>
        )}
        <input
          type="checkbox"
          name={name}
          id={id}
          value={id}
          checked={defaultValue}
        />
        <label className="slds-checkbox__label" htmlFor={id}>
          <span className="slds-checkbox_faux"></span>
          <span className="slds-form-element__label">{label}</span>
        </label>
      </div>
    </div>
  </div>
);

export default Checkbox;
