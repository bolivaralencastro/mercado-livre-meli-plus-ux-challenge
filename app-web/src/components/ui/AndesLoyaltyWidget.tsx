import React from "react";

interface LoyaltyBenefit {
  image: string;
  text: string;
  alt: string;
}

interface AndesLoyaltyWidgetProps {
  title: string;
  pillImage: string;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  benefits: LoyaltyBenefit[];
  className?: string;
}

const AndesLoyaltyWidget: React.FC<AndesLoyaltyWidgetProps> = ({
  title,
  pillImage,
  ctaText,
  ctaHref = "#",
  onCtaClick,
  benefits,
  className,
}) => {
  const handleCtaClick = (e: React.MouseEvent) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  const baseClass = "loyalty-widget-v2";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <section className={combinedClassName}>
      <section className="loyalty-widget-v2__header">
        <div className="loyalty-widget-v2__header--left-section">
          <img
            src={pillImage}
            className="loyalty-widget-v2__pill"
            alt="Logo Meli+"
          />
          <div className="loyalty-widget-v2__header--title-container">
            <h2 className="loyalty-widget-v2__title">
              <span aria-hidden="true">{title}</span>
            </h2>
          </div>
        </div>

        <div className="loyalty-widget-v2__header--right-section">
          <a
            href={ctaHref}
            className="andes-button"
            onClick={handleCtaClick}
          >
            <span className="andes-button__content">{ctaText}</span>
          </a>
        </div>
      </section>

      <section className="loyalty-widget-v2__body">
        {benefits.map((benefit, index) => (
          <div key={index} className="loyalty-widget-v2__benefit">
            <img
              src={benefit.image}
              className="loyalty-widget-v2__benefit--image"
              alt={benefit.alt}
            />
            <p className="loyalty-widget-v2__benefit--text">
              <span aria-hidden="true">{benefit.text}</span>
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default AndesLoyaltyWidget;
