import axiraLogo from 'figma:asset/0e2d312c00b8c2a1b7cefa2f023f8facae8be293.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  };

  return (
    <img 
      src={axiraLogo} 
      alt="Axira Logo" 
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
