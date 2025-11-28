import { LucideIcon } from 'lucide-react';

interface GameCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
  image: string;
  onClick: () => void;
}

export function GameCard({ icon: Icon, name, description, color, image, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30"
      style={{
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
      
      {/* Sparkle effects on hover */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{ animationDelay: '0.2s' }}></div>
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
        <div 
          className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${image})`,
            filter: 'blur(3px)'
          }}
        />
      </div>
      
      <div className="relative p-6">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}dd)` 
          }}
        >
          <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <h3 className="text-white text-xl mb-2 text-left group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
        <p className="text-gray-400 text-sm text-left mb-4 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-blue-400 text-sm group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-1">
            Optimize Now →
          </span>
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>
    </button>
  );
}
