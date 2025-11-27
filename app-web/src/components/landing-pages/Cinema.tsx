'use client';

import React, { useState } from 'react';
import styles from './Cinema.module.css';

export default function CinemaPage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const megaPrices = [44.90, 43.90, 39.90, 21.90];
  const megaPromoPrice = 39.90;

  const calculateTotal = (count: number) => {
    let total = 0;
    for (let i = 0; i < count; i++) total += megaPrices[i];
    return total;
  };

  const total = calculateTotal(sliderValue);
  const saving = total - megaPromoPrice;
  const hasSaving = saving > 0;

  const fmtMoney = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value));
    setIsRevealed(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroGrid}>
          {/* Left Side */}
          <div className={styles.heroLeft}>
            <div className={styles.logoLockup}>
              <span className={styles.logoText}>meli+</span>
              <span className={styles.planBadge}>TOTAL</span>
            </div>

            <h1 className={styles.heroTitle}>
              Seus streamings inclusos.<br />
              <span className={styles.gradientText}>Pare de pagar separado.</span>
            </h1>

            <p className={styles.subH}>
              Assinando individualmente, os preços só aumentam.
              No Meli+ você leva tudo em um único plano por muito menos.
            </p>

            <button className={styles.ctaBtn3d}>
              Quero assistir agora
            </button>

            <div className={styles.bonusBlock}>
              <span className={`material-icons-round ${styles.bonusIcon}`}>redeem</span>
              <div className={styles.bonusText}>
                <strong>Bônus incluso:</strong> Frete Grátis em milhões de produtos no Mercado Livre.
              </div>
            </div>
          </div>

          {/* Right Side: Streaming Simulator */}
          <div className={styles.heroRight}>
            <div className={`${styles.simCard} ${isRevealed ? styles.cardRevealed : ''}`} id="card-mega">
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>Streaming</h3>
                  <div className={styles.tooltipTrigger}>
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>info</span>
                    <div className={styles.tooltipBox}>
                      <strong>Preços Avulsos:</strong><br />
                      • Netflix Padrão: R$ 44,90<br />
                      • Disney+ Padrão: R$ 43,90<br />
                      • Max Mensal: R$ 39,90<br />
                      • Apple TV+: R$ 21,90
                    </div>
                  </div>
                </div>
                <p className={styles.subtitle}>Quanto você gasta todo mês pagando assinaturas separadas?</p>

                <div className={styles.displayArea}>
                  <span className={`${styles.statusBadge} ${sliderValue === 0 ? styles.statusBadgeNeutral : styles.statusBadgeBad}`}>
                    {sliderValue === 0 ? 'SEM MELI+' : 'SEM MELI+'}
                  </span>
                  <div className={`${styles.priceValue} ${sliderValue === 0 ? styles.priceValueNeutral : styles.priceValueDanger}`}>
                    {fmtMoney(total)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    (Netflix + Disney+ + Max + Apple TV+)
                  </div>
                </div>
              </div>

              <div className={styles.sliderArea}>
                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1" 
                  value={sliderValue} 
                  onChange={handleSliderChange}
                />
              </div>

              <button 
                className={styles.ctaBtn} 
                onClick={() => setIsRevealed(true)} 
                disabled={sliderValue === 0}
              >
                → Ver preço com Meli+
              </button>

              <div className={styles.revealOverlay}>
                <button className={styles.closeReveal} onClick={() => setIsRevealed(false)}>
                  <span className="material-icons-round">close</span>
                </button>
                <span className={styles.revealTag}>COM MELI+ MEGA</span>
                <div className={styles.revealPrice}>R$ 39,90</div>
                <p className={styles.revealSub}>4 streamings + Frete</p>
                <div className={styles.savingsBadgeSim}>
                  <span className={styles.savingsLabel}>Sua economia mensal</span>
                  <span className={styles.savingsValueSim} style={{ color: hasSaving ? 'var(--meli-green)' : 'white' }}>
                    {hasSaving ? fmtMoney(saving) : 'Mais vantagens'}
                  </span>
                </div>
                <button className={styles.revealCta}>
                  Quero assistir agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
