import React from "react";

interface AndesAuthListProps {
  children: React.ReactNode;
  className?: string;
}

const AndesAuthList: React.FC<AndesAuthListProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`auth-list ${className || ""}`}>
      {children}
    </div>
  );
};

export default AndesAuthList;
