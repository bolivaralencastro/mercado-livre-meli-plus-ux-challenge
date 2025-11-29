import PaymentConfigPrototype from "../PaymentConfigPrototype";

export default function PaymentFlowStandalonePage() {
  return (
    <>
      <style jsx global>{`
        body {
          overflow: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="min-h-screen bg-white">
        <PaymentConfigPrototype />
      </div>
    </>
  );
}
