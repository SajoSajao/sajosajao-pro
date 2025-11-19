import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  style
}) => {
  const hoverStyles = hover
    ? 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer'
    : '';

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg transition-all duration-300 ${hoverStyles} ${className}`}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};
