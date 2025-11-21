import React from "react";

interface AndesLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const AndesLabel: React.FC<AndesLabelProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClass = "andes-label";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <label className={combinedClassName} {...props}>
      {children}
    </label>
  );
};

export default AndesLabel;
