/// <reference types="react" />
declare const Button: ({
  children,
  variant,
  label,
  type,
  disabled,
  stretch,
  onClick
}: {
  children?: any;
  label?: string | undefined;
  variant?: string | undefined;
  disabled?: boolean | undefined;
  stretch?: boolean | undefined;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: ((event: any) => any) | undefined;
}) => JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map
