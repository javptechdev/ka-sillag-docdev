import React from 'react';
import Image from 'next/image';

interface KaSillagLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const KaSillagLogo: React.FC<KaSillagLogoProps> = ({ 
  size = 'xl', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Actual Logo Image */}
      <Image
        src="/images/ka-sillag-logo.png"
        alt="Ka-Sillag Connect Logo"
        width={size === 'sm' ? 96 : size === 'md' ? 128 : size === 'lg' ? 160 : 192}
        height={size === 'sm' ? 96 : size === 'md' ? 128 : size === 'lg' ? 160 : 192}
        className="object-contain"
        priority
      />
    </div>
  );
};
