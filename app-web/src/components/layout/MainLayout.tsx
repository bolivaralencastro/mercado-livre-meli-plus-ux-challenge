import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-100">
      {children}
    </main>
  );
};

export default MainLayout;
