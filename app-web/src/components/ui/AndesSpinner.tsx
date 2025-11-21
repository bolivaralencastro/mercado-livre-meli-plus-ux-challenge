import React from "react";

interface AndesSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

const AndesSpinner: React.FC<AndesSpinnerProps> = ({ className, ...props }) => {
  const baseClass = "andes-spinner";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return <div className={combinedClassName} {...props} />;
};

export default AndesSpinner;
