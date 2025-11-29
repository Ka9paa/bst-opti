import { GameCard } from './GameCard';
import { 
  Gamepad2, 
  Cpu, 
  Boxes, 
  Target, 
  Sword, 
  Crosshair,
  Trophy,
  Users,
  LogOut,
  Shield
} from 'lucide-react';
import { Logo } from './Logo';

interface GameSelectionProps {
  username: string;
  packageName: string;
  onSelectGame: (game: string) => void;
  onLogout: () => void;
  hasAdminAccess?: boolean;
  onOpenAdminPanel?: () => void;
  onBackToDashboard?: () => void;
}

export function GameSelection({ username, packageName, onSelectGame, onLogout, hasAdminAccess, onOpenAdminPanel, onBackToDashboard }: GameSelectionProps) {
  const games = [
    {
      id: 'fivem',
      icon: Gamepad2,
      name: 'FiveM',
      description: 'GTA V multiplayer mod optimization',
      color: '#f97316',
      image: 'https://images.unsplash.com/photo-1681250530863-7da0ca3589df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndGE1JTIwZ2FtaW5nfGVufDF8fHx8MTc2NDExMDAxNHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'cod',
      icon: Crosshair,
      name: 'Call of Duty',
      description: 'Warzone & Modern Warfare settings',
      color: '#22c55e',
      image: 'https://images.unsplash.com/photo-1616160232762-91cd5b3c6170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsJTIwb2YlMjBkdXR5JTIwZ2FtaW5nfGVufDF8fHx8MTc2NDExMDAxNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'minecraft',
      icon: Boxes,
      name: 'Minecraft',
      description: 'Java & Bedrock edition tweaks',
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1656639969815-1194ca7273bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBnYW1lfGVufDF8fHx8MTc2NDAwNjg0OXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'fortnite',
      icon: Target,
      name: 'Fortnite',
      description: 'Battle Royale performance boost',
      color: '#a855f7',
      image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWluZ3xlbnwxfHx8fDE3NjQwNDQyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'valorant',
      icon: Sword,
      name: 'Valorant',
      description: 'Tactical FPS optimization',
      color: '#ef4444',
      image: 'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxvcmFudCUyMGVzcG9ydHN8ZW58MXx8fHwxNzY0MTEwMDE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'apex',
      icon: Trophy,
      name: 'Apex Legends',
      description: 'Battle Royale FPS tweaks',
      color: '#dc2626',
      image: 'https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJnYnxlbnwxfHx8fDE3NjQwMzE0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'csgo',
      icon: Crosshair,
      name: 'CS:GO / CS2',
      description: 'Counter-Strike performance',
      color: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1725273434245-81f4a17e9eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtaW5nfGVufDF8fHx8MTc2NDExMDAxNXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'roblox',
      icon: Users,
      name: 'Roblox',
      description: 'Platform game optimization',
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1656639969809-ebc544c96955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1lfGVufDF8fHx8MTc2NDA4MzMwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Logo size="lg" className="!w-10 !h-10" />
              </div>
              <div>
                <h1 className="text-white text-xl">Axira Optimizer</h1>
                <p className="text-gray-400 text-sm">Welcome back, {username}!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {onBackToDashboard && (
                <button
                  onClick={onBackToDashboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-600"
                >
                  ← Dashboard
                </button>
              )}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg text-[16px]">
                <span className="text-white text-sm">📦 {packageName} Package</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all border border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              {hasAdminAccess && (
                <button
                  onClick={onOpenAdminPanel}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all border border-blue-500/20"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Games Optimized</span>
              <Gamepad2 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-white text-3xl">8</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-green-900/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Avg. FPS Boost</span>
              <Trophy className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-white text-3xl">+45%</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Game-Specific Tweaks</span>
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-white text-3xl">98</div>
          </div>
        </div>

        {/* Game Selection */}
        <div className="mb-8">
          <h2 className="text-white text-2xl mb-2">Select a Game to Optimize</h2>
          <p className="text-gray-400">Choose your game and boost your performance with optimized settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              icon={game.icon}
              name={game.name}
              description={game.description}
              color={game.color}
              image={game.image}
              onClick={() => onSelectGame(game.id)}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
