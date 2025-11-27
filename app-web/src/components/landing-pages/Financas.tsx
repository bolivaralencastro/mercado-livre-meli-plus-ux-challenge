'use client';

import React, { useState } from 'react';
import styles from './Financas.module.css';

export default function FinancasPage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const ratePoupYear = 0.0617;
  const rateMeliYear = 0.135;

  const P = sliderValue;
  const fvPoup = P * (1 + ratePoupYear);
  const fvMeli = P * (1 + rateMeliYear);
  const gainP = fvPoup - P;
  const gainM = fvMeli - P;
  const extra = gainM - gainP;

  const fmtMoney = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value));
    setIsRevealed(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroGrid}>
          
          {/* Left Content */}
          <div className={styles.heroLeft}>
            <div className={styles.logoLockup}>
              <span className={styles.logoPart}>meli+</span>
              <span className={styles.planPart}>TOTAL</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Seu dinheiro parado está <br />
              <span className={styles.highlightNegative}>rendendo menos</span> do que deveria.
            </h1>
            
            <p className={styles.subH}>
              Com o Meli+, ele rende até <strong>120% do CDI</strong> em cofres e 105% no saldo da conta.
            </p>
            
            <div className={styles.bonusBlock}>
              <span className={`material-icons-round ${styles.bonusIcon}`}>local_shipping</span>
              <div className={styles.bonusText}>
                <strong>Bônus incluso:</strong>
                <span>Frete Grátis em milhões de produtos.</span>
              </div>
            </div>
          </div>

          {/* Right Content: ROI Simulator */}
          <div className={styles.heroRight}>
            <div className={`${styles.simCard} ${isRevealed ? styles.cardRevealed : ''}`} id="card-roi">
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>Rendimento</h3>
                  <div className={styles.tooltipTrigger}>
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>info</span>
                    <div className={styles.tooltipBox}>
                      <strong>Cálculo projetado para 1 ano (12 meses):</strong><br />
                      • Poupança: ~6,17% a.a.<br />
                      • Meli+ (120% CDI): ~13,5% a.a.<br />
                      *Considerando taxa CDI atual. Limite de simulação: R$ 10.000.
                    </div>
                  </div>
                </div>
                <p className={styles.subtitle}>Quanto dinheiro fica parado na sua conta rendendo pouco?</p>

                <div className={styles.displayArea}>
                  <span className={`${styles.statusBadge} ${sliderValue === 0 ? styles.statusBadgeNeutral : styles.statusBadgeNeutral}`}>
                    {sliderValue === 0 ? 'SEM MELI+' : 'SEM MELI+'}
                  </span>
                  <div className={`${styles.priceValue} ${sliderValue === 0 ? styles.priceValueNeutral : ''}`}>
                    {sliderValue === 0 ? '+ R$ 0,00' : `+ ${fmtMoney(gainP)}`}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Saldo: <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{fmtMoney(sliderValue)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sliderArea}>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100" 
                  value={sliderValue} 
                  onChange={handleSliderChange}
                />
              </div>

              <button 
                className={styles.ctaBtn} 
                onClick={() => setIsRevealed(true)} 
                disabled={sliderValue === 0}
              >
                <span className="material-icons-round" style={{ marginRight: '8px' }}>trending_up</span>
                Ver ganho com Meli+
              </button>

              <div className={styles.revealOverlay}>
                <button className={styles.closeReveal} onClick={() => setIsRevealed(false)}>
                  <span className="material-icons-round">close</span>
                </button>
                <span className={styles.revealTag}>COM MELI+ (120% CDI)</span>
                <div className={styles.revealPrice}>{fmtMoney(gainM)}</div>
                <p className={styles.revealSub}>Rendimento total em 1 ano</p>
                <div className={styles.savingsBadgeSim}>
                  <span className={styles.savingsLabel}>Ganho extra com Meli+</span>
                  <span className={styles.savingsValueSim}>+ {fmtMoney(extra)}</span>
                </div>
                <button className={styles.revealCta}>
                  Potencializar meus ganhos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
