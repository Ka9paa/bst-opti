interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: 'blue' | 'green' | 'purple' | 'cyan' | 'orange';
  showPercentage?: boolean;
  animated?: boolean;
}

export function ProgressBar({ 
  progress, 
  label, 
  color = 'blue', 
  showPercentage = true,
  animated = true 
}: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500'
  };

  const glowClasses = {
    blue: 'shadow-blue-500/50',
    green: 'shadow-green-500/50',
    purple: 'shadow-purple-500/50',
    cyan: 'shadow-cyan-500/50',
    orange: 'shadow-orange-500/50'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm">{label}</span>
          {showPercentage && (
            <span className="text-gray-400 text-sm">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      
      <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* Progress bar */}
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500 relative overflow-hidden ${
            animated ? 'shadow-lg ' + glowClasses[color] : ''
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* Shimmer effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          )}
        </div>
      </div>
    </div>
  );
}
