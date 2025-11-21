import React from "react";

interface AndesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AndesCard: React.FC<AndesCardProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClass = "andes-card";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default AndesCard;
