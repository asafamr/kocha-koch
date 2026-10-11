import type { ButtonHTMLAttributes } from "react";

// primary: marker yellow (default). secondary: ink background, for a second strong action.
// dark: black with white text in both colour schemes, for export actions.
export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "dark" }) {
  return <button className={`ds-button${variant === "primary" ? "" : ` ds-button-${variant}`} ${className}`} {...props} />;
}
