import AndesButton from "./AndesButton";

interface AndesPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  streamingLogos?: Array<{ name: string; color: string; bgColor?: string }>;
  price?: {
    symbol: string;
    value: string;
    cents: string;
    period: string;
  };
  disclaimer?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
}

export default function AndesPromoModal({
  isOpen,
  onClose,
  title = "4 Streamings, 1 Assinatura",
  subtitle,
  streamingLogos = [
    { name: "Disney+", color: "#000", bgColor: "white" },
    { name: "NETFLIX", color: "#e50914", bgColor: "white" },
    { name: "HBO max", color: "#fff", bgColor: "#000" },
    { name: " tv", color: "#000", bgColor: "white" },
  ],
  price = {
    symbol: "R$",
    value: "39",
    cents: ",90",
    period: "/mês*",
  },
  disclaimer = "*Depois de 2 meses, você pagará R$ 74,90/mês.",
  primaryButtonText = "Assinar Meli+ Mega",
  secondaryButtonText = "Em outro momento",
  onPrimaryAction,
}: AndesPromoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "700px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          animation: "modalFadeIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Parte Escura (Visual) */}
        <div
          style={{
            backgroundColor: "#222",
            color: "white",
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo Meli+ */}
          <div
            style={{
              fontSize: "14px",
              padding: "6px 12px",
              borderRadius: "20px",
              background:
                "linear-gradient(180deg, #7700a1 0%, #8e24aa 50%, #a44cb9 100%)",
              color: "white",
              fontWeight: 600,
              textTransform: "lowercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            meli+ <span style={{ fontWeight: 900 }}>MEGA</span>
          </div>

          <h2
            style={{
              fontSize: "24px",
              fontWeight: 900,
              textTransform: "uppercase",
              margin: "24px 0",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </h2>

          {/* Logos dos Parceiros */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            {streamingLogos.map((logo, index) => (
              <div
                key={index}
                style={{
                  width: "100px",
                  height: "70px",
                  background: logo.bgColor || "white",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: logo.color,
                  fontWeight: 800,
                  fontSize: "12px",
                  boxShadow:
                    logo.bgColor === "white"
                      ? "inset 0 0 0 1px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                {logo.name}
              </div>
            ))}
          </div>

          {/* Preço */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              lineHeight: 1,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                marginTop: "8px",
                marginRight: "4px",
                fontWeight: 500,
              }}
            >
              {price.symbol}
            </span>
            <span
              style={{ fontSize: "80px", fontWeight: 600, letterSpacing: "-2px" }}
            >
              {price.value}
            </span>
            <span style={{ fontSize: "24px", marginTop: "8px", fontWeight: 500 }}>
              {price.cents}
            </span>
            <span
              style={{
                fontSize: "24px",
                alignSelf: "center",
                marginLeft: "8px",
                fontWeight: 300,
              }}
            >
              {price.period}
            </span>
          </div>

          {disclaimer && (
            <p style={{ fontSize: "14px", color: "#aaa", marginTop: "16px" }}>
              {disclaimer}
            </p>
          )}
        </div>

        {/* Footer Claro (Ações) */}
        <div
          style={{
            background: "white",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            borderTop: "1px solid #eee",
          }}
        >
          <AndesButton
            variant="primary"
            style={{ padding: "16px 32px", fontSize: "16px" }}
            onClick={onPrimaryAction}
          >
            {primaryButtonText}
          </AndesButton>

          <AndesButton variant="link" onClick={onClose}>
            {secondaryButtonText}
          </AndesButton>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
