import React from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const hatSizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-14 h-14',
    lg: 'w-18 h-18'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <div className="relative">
        {/* B Letter */}
        <img 
          src="/b.png" 
          alt="B" 
          className={`${sizeClasses[size]} object-contain`}
        />
        
        {/* Animated Hat */}
        <img 
          src="/hat-1.png" 
          alt="Hat" 
          className={`absolute top-0 left-0 ${hatSizeClasses[size]} object-contain animate-rock`}
          style={{
            transformOrigin: 'center center',
            top: '-4px',
            left: '1px'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
