interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer hexagon */}
        <path
          d="M100 10 L175 55 L175 145 L100 190 L25 145 L25 55 Z"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Inner design - stylized "A" */}
        <path
          d="M100 50 L140 130 L120 130 L112 110 L88 110 L80 130 L60 130 L100 50 Z"
          fill="#3b82f6"
        />
        <path
          d="M92 95 L100 75 L108 95 Z"
          fill="#000000"
        />
        
        {/* Accent lines */}
        <line x1="60" y1="145" x2="75" y2="145" stroke="#3b82f6" strokeWidth="3" />
        <line x1="125" y1="145" x2="140" y2="145" stroke="#3b82f6" strokeWidth="3" />
      </svg>
    </div>
  );
}
