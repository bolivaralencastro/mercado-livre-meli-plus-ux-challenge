import React from "react";
import AndesLabel from "./AndesLabel";
import AndesInput from "./AndesInput";

interface AndesFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  children: React.ReactElement<typeof AndesInput>; // Expects an AndesInput component
  icon?: React.ReactNode; // For the optional input icon
}

const AndesFormGroup: React.FC<AndesFormGroupProps> = ({
  label,
  htmlFor,
  children,
  icon,
  className,
  ...props
}) => {
  const baseClass = "andes-form-group";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} {...props}>
      {label && <AndesLabel htmlFor={htmlFor}>{label}</AndesLabel>}
      {children}
      {icon && <div className="andes-input-icon">{icon}</div>}
    </div>
  );
};

export default AndesFormGroup;
