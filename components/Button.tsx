import React from 'react'

type ButtonTypes = "button" | "submit" | "reset";
const Button = ({
  children,
  variant = "",
  label = "button",
  type = "button",
  disabled = false,
  stretch = false,
  onClick
}: {
  children?: any,
  label?: string
  variant?: string
  disabled?: boolean
  stretch?: boolean
  type?: ButtonTypes;
  onClick?: (event: any) => any
}) => (
  <button
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={`slds-button ${variant && `slds-button_${variant}`} ${stretch &&
      `slds-button_stretch`}`}
  >
    {children || label}
  </button>
);

export default Button;
