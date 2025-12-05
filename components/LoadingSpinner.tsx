import { Loader2 } from 'lucide-react';
import { Logo } from './Logo';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'pulse' | 'dots';
}

export function LoadingSpinner({ message = 'Loading...', size = 'md', variant = 'default' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
          <Logo size={size} className="relative z-10 animate-pulse" />
        </div>
        {message && <p className="text-gray-400 text-sm animate-pulse">{message}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        {message && <p className="text-gray-400 text-sm">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className={`${sizeClasses[size]} text-blue-500 animate-spin`} />
      {message && <p className="text-gray-400 text-sm">{message}</p>}
    </div>
  );
}
