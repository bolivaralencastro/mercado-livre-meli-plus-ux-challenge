import React from "react";

interface AndesResultCardProps {
  image: string;
  title: string;
  seller?: string;
  isOfficialStore?: boolean;
  price: number | string;
  installments?: string;
  tag?: string;
  isInternational?: boolean;
  hasFreeShipping?: boolean;
  origin?: string;
  className?: string;
  onClick?: () => void;
}

const AndesResultCard: React.FC<AndesResultCardProps> = ({
  image,
  title,
  seller,
  isOfficialStore = false,
  price,
  installments,
  tag,
  isInternational = false,
  hasFreeShipping = false,
  origin,
  className,
  onClick,
}) => {
  const baseClass = "product-card";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <article className={combinedClassName} onClick={onClick}>
      <div className="product-card__header">
        <img src={image} alt={title} className="product-card__img" />
      </div>

      <div className="product-card__content">
        <h2 className="product-card__title">{title}</h2>

        {seller && (
          <div className="product-card__seller">
            {seller}
            {isOfficialStore && (
              <svg className="icon-official-store" viewBox="0 0 12 12">
                <path d="M6 0C2.69 0 0 2.69 0 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1.5 9L2 6.5l1.06-1.06L5.5 7.88l4.94-4.94L11.5 4 4.5 9z" />
              </svg>
            )}
          </div>
        )}

        <div className="product-card__price-row">
          <span className="product-card__price">
            {typeof price === 'number' ? `R$ ${price.toLocaleString('pt-BR')}` : price}
          </span>
          {installments && (
            <span className="product-card__installments">{installments}</span>
          )}
        </div>

        {tag && <div className="product-card__tag">{tag}</div>}

        {isInternational && (
          <div className="product-card__international">COMPRA INTERNACIONAL</div>
        )}

        {hasFreeShipping && (
          <div className="product-card__shipping">Frete grátis</div>
        )}

        {origin && <div className="product-card__origin">{origin}</div>}
      </div>
    </article>
  );
};

export default AndesResultCard;
