import logoImage from 'figma:asset/0e2d312c00b8c2a1b7cefa2f023f8facae8be293.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <img 
      src={logoImage} 
      alt="Axira Logo" 
      className={`${sizeMap[size]} ${className} object-contain`}
    />
  );
}