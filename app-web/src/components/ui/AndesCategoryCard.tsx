import React from "react";
import Image from "next/image";

interface AndesCategoryCardProps {
  imageUrl: string;
  imageAlt?: string;
  text: string;
  href?: string;
  className?: string;
}

const AndesCategoryCard: React.FC<AndesCategoryCardProps> = ({
  imageUrl,
  imageAlt,
  text,
  href = "#",
  className,
}) => {
  return (
    <a href={href} className={`cat-card ${className || ""}`}>
      <div className="cat-card__img">
        <Image src={imageUrl} alt={imageAlt || text} width={100} height={100} />
      </div>
      <div className="cat-card__text">{text}</div>
    </a>
  );
};

export default AndesCategoryCard;
