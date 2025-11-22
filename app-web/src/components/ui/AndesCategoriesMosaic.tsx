import React from "react";

interface AndesCategoriesMosaicProps {
  title: string;
  viewAllLinkText: string;
  viewAllLinkHref?: string;
  children: React.ReactNode; // Should be a list of AndesCategoryCard
  className?: string;
}

const AndesCategoriesMosaic: React.FC<AndesCategoriesMosaicProps> = ({
  title,
  viewAllLinkText,
  viewAllLinkHref = "#",
  children,
  className,
}) => {
  return (
    <div className={`categories-wrapper ${className || ""}`}>
      <div className="cat-header">
        <h2>{title}</h2>
        <a href={viewAllLinkHref}>{viewAllLinkText}</a>
      </div>
      <div className="cat-grid">{children}</div>
      <button className="cat-nav-arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default AndesCategoriesMosaic;
