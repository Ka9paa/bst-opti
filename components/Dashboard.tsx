import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  HardDrive, 
  Monitor, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Activity,
  Gamepad2,
  Settings,
  Download,
  BarChart3,
  Sparkles,
  Gauge
} from 'lucide-react';
import { Logo } from './Logo';

interface DashboardProps {
  username: string;
  licenseKey: string;
  onNavigate: (page: 'games' | 'settings' | 'history') => void;
}

export default function Dashboard({ username, licenseKey, onNavigate }: DashboardProps) {
  const [systemInfo, setSystemInfo] = useState({
    cpu: 'Loading...',
    gpu: 'Loading...',
    ram: 'Loading...',
    os: 'Loading...'
  });

  const [stats, setStats] = useState({
    totalTweaks: 98,
    gamesSupported: 8,
    tweaksApplied: 0,
    lastOptimized: 'Never'
  });

  useEffect(() => {
    // Get system info
    const getSystemInfo = async () => {
      try {
        // Get CPU info
        const cpuInfo = navigator.hardwareConcurrency 
          ? `${navigator.hardwareConcurrency} Cores` 
          : 'Unknown CPU';
        
        // Get RAM info (approximate)
        const ramInfo = (navigator as any).deviceMemory 
          ? `${(navigator as any).deviceMemory} GB RAM` 
          : 'Unknown RAM';
        
        // Get OS info
        const osInfo = navigator.platform || 'Unknown OS';
        
        setSystemInfo({
          cpu: cpuInfo,
          gpu: 'Detecting GPU...',
          ram: ramInfo,
          os: osInfo.includes('Win') ? 'Windows' : osInfo
        });
      } catch (error) {
        console.error('Error getting system info:', error);
      }
    };

    getSystemInfo();

    // Load stats from localStorage
    const savedStats = localStorage.getItem('optiaxira_stats');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setStats(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const getLicenseType = () => {
    if (licenseKey.startsWith('ELITE-')) return 'ELITE';
    if (licenseKey.startsWith('FOUNDATION-')) return 'FOUNDATION';
    if (licenseKey.startsWith('CHECKUP-')) return 'CHECKUP';
    return 'STANDARD';
  };

  const getLicenseColor = () => {
    const type = getLicenseType();
    if (type === 'ELITE') return 'from-yellow-500 to-orange-500';
    if (type === 'FOUNDATION') return 'from-blue-500 to-cyan-500';
    if (type === 'CHECKUP') return 'from-green-500 to-emerald-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
          
          {/* Subtle gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdjJoLTJ2LTJoMnptLTIgMmgtMnYtMmgydjJ6bTAgMGgtMnYyaDJ2LTJ6bTIgMGgydjJoLTJ2LTJ6bTAtMmgydi0yaC0ydjJ6bS0yIDB2LTJoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-scan"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <Logo size="lg" className="!w-12 !h-12" />
            </div>
            <div>
              <h1 className="text-3xl">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{username}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getLicenseColor()} text-white text-xs`}>
                  {getLicenseType()} LICENSE
                </div>
                <div className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl mb-1">{stats.gamesSupported}</div>
            <div className="text-gray-400 text-sm">Games Supported</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl mb-1">{stats.totalTweaks}</div>
            <div className="text-gray-400 text-sm">Total Tweaks Available</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-900/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/20 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl mb-1">{stats.tweaksApplied}</div>
            <div className="text-gray-400 text-sm">Tweaks Applied</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-lg mb-1">{stats.lastOptimized}</div>
            <div className="text-gray-400 text-sm">Last Optimization</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Information */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl">System Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-gray-400 text-sm">Processor</span>
                </div>
                <div className="text-lg text-white">{systemInfo.cpu}</div>
              </div>

              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <HardDrive className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-400 text-sm">Memory</span>
                </div>
                <div className="text-lg text-white">{systemInfo.ram}</div>
              </div>

              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Gauge className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-400 text-sm">Graphics</span>
                </div>
                <div className="text-lg text-white">{systemInfo.gpu}</div>
              </div>

              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-gray-400 text-sm">Operating System</span>
                </div>
                <div className="text-lg text-white">{systemInfo.os}</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="text-blue-400 mb-1">System Status</div>
                  <div className="text-gray-400 text-sm">
                    Your system is ready for optimization. Select a game to begin applying performance tweaks.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('games')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl p-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Select Game</span>
                </div>
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>

              <button
                onClick={() => onNavigate('history')}
                className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl p-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>View History</span>
                </div>
                <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl p-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <span>Settings</span>
                </div>
                <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-cyan-400 text-sm mb-1">Pro Tip</div>
                  <div className="text-gray-400 text-xs">
                    Start with Quick Settings for instant performance gains, then customize advanced tweaks for your setup.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl">Performance Overview</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Expected FPS Gain</div>
              <div className="text-2xl text-green-400 mb-1">+15-30%</div>
              <div className="text-gray-500 text-xs">Varies by game & hardware</div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Input Lag Reduction</div>
              <div className="text-2xl text-blue-400 mb-1">-5-10ms</div>
              <div className="text-gray-500 text-xs">With timer resolution tweaks</div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Stutter Reduction</div>
              <div className="text-2xl text-purple-400 mb-1">~70%</div>
              <div className="text-gray-500 text-xs">Frame time consistency</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <div className="text-yellow-400 mb-1">Ready to Optimize?</div>
                <div className="text-gray-400 text-sm">
                  Click "Select Game" to start optimizing. All tweaks are disabled by default - you choose what to enable!
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}