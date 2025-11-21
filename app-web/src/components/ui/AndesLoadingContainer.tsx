import React from "react";
import AndesSpinner from "./AndesSpinner";

interface AndesLoadingContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

const AndesLoadingContainer: React.FC<AndesLoadingContainerProps> = ({
  text,
  children,
  className,
  ...props
}) => {
  const baseClass = "andes-loading-container";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} {...props}>
      {children || <AndesSpinner />}
      {text && <div className="andes-loading-text">{text}</div>}
    </div>
  );
};

export default AndesLoadingContainer;
