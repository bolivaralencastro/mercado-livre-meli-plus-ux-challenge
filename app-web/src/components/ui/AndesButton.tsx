import React from "react";

type ButtonVariant = "primary" | "action" | "transparent" | "link";

interface AndesButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const AndesButton: React.FC<AndesButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseClass = "andes-button";
  const variantClass = `andes-button--${variant}`;
  const fullWidthClass = fullWidth ? "andes-button--full" : "";

  const combinedClassName = [baseClass, variantClass, fullWidthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default AndesButton;
