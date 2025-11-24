import React from "react";
import Image from "next/image";

interface AndesRecommendationCardProps {
  image: string;
  title: string;
  oldPrice?: number | string;
  price: number | string;
  discount?: string;
  installments?: string;
  hasFreeShipping?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const AndesRecommendationCard: React.FC<AndesRecommendationCardProps> = ({
  image,
  title,
  oldPrice,
  price,
  discount,
  installments,
  hasFreeShipping = false,
  href = "#",
  onClick,
  className,
}) => {
  const baseClass = "ui-recommendation-card";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  const formatPrice = (value: number | string): { integer: string; cents: string } => {
    if (typeof value === 'string') {
      // Support both comma and period as decimal separator
      const parts = value.includes(',') ? value.split(',') : value.split('.');
      return { integer: parts[0], cents: parts[1] || '00' };
    }
    // For numbers, use toLocaleString for proper Brazilian formatting
    const formatted = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const parts = formatted.split(',');
    return { integer: parts[0], cents: parts[1] };
  };

  const priceFormatted = formatPrice(price);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a href={href} className={combinedClassName} onClick={handleClick}>
      <div className="ui-recommendation-card__image-container">
        <Image 
          src={image} 
          alt={title} 
          className="ui-recommendation-card__image" 
          width={224} 
          height={224} 
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      </div>

      <div className="ui-recommendation-card__content">
        <h3 className="ui-recommendation-card__title">{title}</h3>

        {oldPrice && (
          <span className="ui-recommendation-card__old-price">
            {typeof oldPrice === 'number' ? `R$ ${oldPrice.toLocaleString('pt-BR')}` : oldPrice}
          </span>
        )}

        <div className="ui-recommendation-card__price-block">
          <span className="ui-recommendation-card__price">
            R$ {priceFormatted.integer}
            <span className="price-cents">{priceFormatted.cents}</span>
          </span>
          {discount && (
            <span className="ui-recommendation-card__discount">{discount}</span>
          )}
        </div>

        {installments && (
          <div className="ui-recommendation-card__installments">{installments}</div>
        )}

        {hasFreeShipping && (
          <div className="ui-recommendation-card__shipping">Frete grátis</div>
        )}
      </div>
    </a>
  );
};

export default AndesRecommendationCard;
