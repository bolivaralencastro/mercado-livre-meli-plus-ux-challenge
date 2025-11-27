'use client';

import React, { useState } from 'react';
import styles from './Logistica.module.css';

export default function LogisticaPage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const avgFreight = 20.00;
  const meliTotalCost = 17.90;

  const count = sliderValue;
  const totalFreightCost = count * avgFreight;
  const netSaving = totalFreightCost - meliTotalCost;
  const hasSaving = netSaving > 0;

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
              <span className={styles.planBadge}>FRETE GRÁTIS</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Sua última compra com frete pago deveria ter sido a última.
            </h1>
            
            <p className={styles.subH}>
              Quem faz mais de 1 compra por mês já economiza assinando.
              No Meli+ Mega você tem frete grátis ilimitado e muito mais, por um único preço mensal.
            </p>
            
            <div className={styles.bonusBlock}>
              <span className={`material-icons-round ${styles.bonusIcon}`}>redeem</span>
              <div className={styles.bonusText}>
                <strong>Bônus incluso:</strong>
                Streamings, rendimento maior e cashback — tudo no mesmo plano Meli+ Mega.
              </div>
            </div>
          </div>

          {/* Right Side: Freight Simulator */}
          <div className={styles.heroRight}>
            <div className={`${styles.simCard} ${isRevealed ? styles.cardRevealed : ''}`} id="card-ship">
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>Frete</h3>
                  <div className={styles.tooltipTrigger}>
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>info</span>
                    <div className={styles.tooltipBox}>
                      R$ 20,00 é o custo médio estimado de envio para compras abaixo de R$ 79 sem assinatura.
                    </div>
                  </div>
                </div>
                <p className={styles.subtitle}>Quanto dinheiro você joga fora pagando frete em compras pequenas?</p>

                <div className={styles.displayArea}>
                  <span className={`${styles.statusBadge} ${sliderValue === 0 ? styles.statusBadgeNeutral : styles.statusBadgeBad}`}>
                    {sliderValue === 0 ? 'SEM MELI+' : 'SEM MELI+'}
                  </span>
                  <div className={`${styles.priceValue} ${sliderValue === 0 ? styles.priceValueNeutral : styles.priceValueDanger}`}>
                    {fmtMoney(totalFreightCost)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span style={{ fontWeight: 700 }}>{count}</span> envios
                  </div>
                </div>
              </div>

              <div className={styles.sliderArea}>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
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
                <span className="material-icons-round" style={{ marginRight: '8px' }}>local_shipping</span>
                Ver frete com Meli+
              </button>

              <div className={styles.revealOverlay}>
                <button className={styles.closeReveal} onClick={() => setIsRevealed(false)}>
                  <span className="material-icons-round">close</span>
                </button>
                <span className={styles.revealTag}>COM MELI+ TOTAL</span>
                <div className={styles.revealPrice}>R$ 17,90</div>
                <p className={styles.revealSub}>Frete Grátis Ilimitado</p>
                <div className={styles.savingsBadgeSim}>
                  <span className={styles.savingsLabel}>{hasSaving ? 'Economia Real' : 'Vantagem'}</span>
                  <span className={styles.savingsValueSim} style={{ color: hasSaving ? 'var(--meli-green)' : 'white' }}>
                    {hasSaving ? fmtMoney(netSaving) : 'Frete Grátis'}
                  </span>
                </div>
                <button className={styles.revealCta}>
                  Ativar Frete Grátis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
