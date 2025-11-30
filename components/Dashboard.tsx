import { Gamepad2, Shield, Zap } from 'lucide-react';

interface DashboardProps {
  username: string;
  licenseKey: string;
  onNavigate: (page: string) => void;
}

export function Dashboard({ username, licenseKey, onNavigate }: DashboardProps) {
  const packageType = licenseKey.split('-')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white mb-2">Welcome, {username}</h1>
          <p className="text-gray-400">
            Package: <span className="text-blue-400">{packageType}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Shield className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-white mb-2">HWID Locked</h3>
            <p className="text-gray-400 text-sm">Your account is secured to this device</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Zap className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-white mb-2">Optimizations Ready</h3>
            <p className="text-gray-400 text-sm">All scripts available for download</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Gamepad2 className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-white mb-2">Multi-Game</h3>
            <p className="text-gray-400 text-sm">Support for all major titles</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h2 className="text-white mb-6">Select Your Game</h2>
          <button
            onClick={() => onNavigate('game-selection')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            View Available Games
          </button>
        </div>
      </div>
    </div>
  );
}
