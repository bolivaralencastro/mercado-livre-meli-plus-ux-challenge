"use client";

import PaymentConfigPrototype from "../PaymentConfigPrototype";

export default function PaymentFlowStandalonePage() {
  return (
    <>
      <style jsx global>{`
        html, body {
          overflow: auto !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
      `}</style>
      <div className="min-h-screen bg-white">
        <PaymentConfigPrototype />
      </div>
    </>
  );
}
