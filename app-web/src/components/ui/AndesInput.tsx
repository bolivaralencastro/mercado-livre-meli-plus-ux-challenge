import React from "react";

interface AndesInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Additional props can be added here if needed
}

const AndesInput: React.FC<AndesInputProps> = ({
  className,
  ...props
}) => {
  const baseClass = "andes-input";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <input className={combinedClassName} {...props} />
  );
};

export default AndesInput;
