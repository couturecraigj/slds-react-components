import React from "react";

const Select = ({
  children,
  label,
  name,
  id = name,
  required = false
}: {
  children: any;
  label: string;
  name: string;
  id?: string;
  required?: boolean;
}) => (
  <div className="slds-form-element">
    <label className="slds-form-element__label" htmlFor={id}>
      {required && (
        <abbr className="slds-required" title="required">
          *{" "}
        </abbr>
      )}
      {label}
    </label>
    <div className="slds-form-element__control">
      <div className="slds-select_container">
        <select className="slds-select" id={id} name={name} required={required}>
          {children}
        </select>
      </div>
    </div>
  </div>
);

export default Select;
