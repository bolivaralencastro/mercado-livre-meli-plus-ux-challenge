import React from "react";

type BadgeVariant = "promo" | "full" | "new" | "bestseller";

interface AndesBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const AndesBadge: React.FC<AndesBadgeProps> = ({
  variant = "promo",
  children,
  className,
  ...props
}) => {
  const baseClass = "andes-badge";
  const variantClass = `andes-badge--${variant}`;

  const combinedClassName = [baseClass, variantClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

export default AndesBadge;
