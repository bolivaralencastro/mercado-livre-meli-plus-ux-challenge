'use client';

import React from 'react';
import styles from './AndesMeliPlusPlans.module.css';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  oldPrice?: number;
  discount?: string;
  periodNote?: string;
  badge?: {
    type: 'current' | 'offer';
    label: string;
  };
  features: string[];
  streamingLogos?: string[];
  buttonLabel: string;
  buttonDisabled?: boolean;
  buttonHref?: string;
}

interface AndesMeliPlusPlansProps {
  plans: Plan[];
  onPlanChange?: (planId: string) => void;
}

const streamingServices: Record<string, string> = {
  disney: 'https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/thumbanils/benefits/thumb_disney.svg',
  netflix: 'https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/thumbanils/benefits/thumb_netflix.svg',
  hbomax: 'https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/thumbanils/benefits/thumb_max.svg',
  appletv: 'https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/thumbanils/benefits/thumb_apple_tv_v2.svg',
};

export const AndesMeliPlusPlans: React.FC<AndesMeliPlusPlansProps> = ({
  plans,
  onPlanChange,
}) => {
  const handlePlanChange = (planId: string, href?: string) => {
    if (href) {
      window.location.href = href;
    }
    onPlanChange?.(planId);
  };

  return (
    <div className={styles.plansContainer}>
      {plans.map((plan) => (
        <article key={plan.id} className={styles.planCard}>
          {plan.badge && (
            <div
              className={`${styles.planBadge} ${
                plan.badge.type === 'current'
                  ? styles.planBadgeCurrent
                  : styles.planBadgeOffer
              }`}
            >
              {plan.badge.label}
            </div>
          )}

          <div className={styles.planHeader}>
            <div className={styles.planTitleRow}>
              <span className={styles.meliPill}>meli+</span>
              <span className={styles.planName}>{plan.name}</span>
            </div>

            <div className={styles.priceSection}>
              {plan.oldPrice && (
                <div className={styles.priceOldRow}>
                  <span className={styles.priceOldValue}>
                    R$ {plan.oldPrice.toFixed(2).replace('.', ',')}
                  </span>
                  {plan.discount && (
                    <span className={styles.priceDiscount}>{plan.discount}</span>
                  )}
                </div>
              )}

              {!plan.oldPrice && (
                <div className={styles.priceOldRow}></div>
              )}

              <div className={styles.priceCurrentRow}>
                <span className={styles.priceValue}>
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                </span>
                <span className={styles.pricePeriod}>/{plan.period}</span>
                {plan.periodNote && (
                  <span className={styles.pricePeriodNote}>
                    {plan.periodNote}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.planFeatures}>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg
                    className={styles.featureBullet}
                    width="4"
                    height="4"
                    viewBox="0 0 4 4"
                  >
                    <circle cx="2" cy="2" r="2" fill="#AA1192" />
                  </svg>
                  <div>
                    <span>{feature}</span>
                    {plan.streamingLogos &&
                      plan.streamingLogos.length > 0 &&
                      index === 0 && (
                        <div className={styles.streamingIcons}>
                          {plan.streamingLogos.map((logo) => (
                            <img
                              key={logo}
                              className={styles.streamingIcon}
                              src={streamingServices[logo]}
                              alt={logo}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.planFooter}>
            <button
              className={`${styles.andesButton} ${
                plan.buttonDisabled
                  ? styles.andesButtonDisabled
                  : styles.andesButtonPrimary
              }`}
              disabled={plan.buttonDisabled}
              onClick={() => handlePlanChange(plan.id, plan.buttonHref)}
            >
              {plan.buttonLabel}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AndesMeliPlusPlans;
