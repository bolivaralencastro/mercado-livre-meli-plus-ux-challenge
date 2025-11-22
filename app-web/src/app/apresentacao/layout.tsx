import React from 'react';
import PresentationNav from './components/PresentationNav';

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PresentationNav />
      {children}
    </div>
  );
}
