import React from 'react'

const FormGroup = ({ children, label }: {label: string, children: any}) => {
  return (
    <div className="slds-form-element">
      <div>
        <label className="slds-form-element__label">{label}</label>
      </div>
      <div className="slds-card slds-card_boundary">
        <div className="slds-card__body slds-card__body_inner">{children}</div>
      </div>
    </div>
  );
};

export default FormGroup;
