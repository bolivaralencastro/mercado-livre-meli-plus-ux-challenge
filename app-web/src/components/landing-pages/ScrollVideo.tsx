"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  // Porcentagem da viewport onde o vídeo começa a ser controlado (0 = topo, 1 = bottom)
  startTrigger?: number;
  // Porcentagem da viewport onde o vídeo termina de ser controlado
  endTrigger?: number;
  // Espelha o vídeo horizontalmente
  mirror?: boolean;
}

export default function ScrollVideo({
  src,
  className = "",
  style = {},
  startTrigger = 0.8,  // Começa quando 80% da tela passou pelo elemento
  endTrigger = 0.2,    // Termina quando 20% da tela passou
  mirror = false,      // Por padrão não espelha
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateVideoTime = useCallback(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container || !video.duration) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calcula a posição relativa do elemento na viewport
    // 0 = elemento está no topo da viewport
    // 1 = elemento está no bottom da viewport
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    // Ponto de início: quando o topo do elemento está em startTrigger da viewport
    const startPoint = windowHeight * startTrigger;
    // Ponto de fim: quando o topo do elemento está em endTrigger da viewport
    const endPoint = windowHeight * endTrigger;
    
    // Calcula o progresso (0 a 1)
    let progress = 0;
    
    if (elementTop <= startPoint && elementTop >= endPoint) {
      // Elemento está na zona de controle
      progress = (startPoint - elementTop) / (startPoint - endPoint);
    } else if (elementTop < endPoint) {
      // Elemento passou da zona de controle (vídeo no final)
      progress = 1;
    } else {
      // Elemento ainda não entrou na zona de controle (vídeo no início)
      progress = 0;
    }
    
    // Limita o progresso entre 0 e 1
    progress = Math.max(0, Math.min(1, progress));
    
    // Aplica o tempo no vídeo
    const targetTime = progress * video.duration;
    
    // Só atualiza se houver diferença significativa (evita micro-updates)
    if (Math.abs(video.currentTime - targetTime) > 0.01) {
      video.currentTime = targetTime;
    }
  }, [startTrigger, endTrigger]);

  const handleScroll = useCallback(() => {
    // Cancela qualquer frame anterior pendente
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Agenda a atualização para o próximo frame
    rafRef.current = requestAnimationFrame(updateVideoTime);
  }, [updateVideoTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configura o vídeo
    video.pause();
    video.currentTime = 0;

    // Listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Atualização inicial
    const handleLoadedMetadata = () => {
      updateVideoTime();
    };
    
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    
    // Se o vídeo já carregou
    if (video.readyState >= 1) {
      updateVideoTime();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateVideoTime]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        style={mirror ? { transform: "scaleX(-1)" } : undefined}
      />
    </div>
  );
}
