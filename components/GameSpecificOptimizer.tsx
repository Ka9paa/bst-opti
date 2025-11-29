import { useState, useEffect } from 'react';
import {
  ArrowLeft, Zap, Download, RotateCcw, Rocket, Sparkles, Shield, Gamepad2, Settings, TrendingUp, Network
} from 'lucide-react';
import { getGameSpecificTweaks, getTweaksByCategory, getDefaultOptimizations } from '../services/game-specific-tweaks';
import { SystemOptimizerService } from '../services/system-optimizer.service';
import { OptimizationTerminal } from './OptimizationTerminal';
import { toast } from 'sonner';

interface GameSpecificOptimizerProps {
  game: string;
  packageId: string;
  onBack: () => void;
}

export function GameSpecificOptimizer({ game, packageId, onBack }: GameSpecificOptimizerProps) {
  const [activeTab, setActiveTab] = useState('quick');
  const [systemType, setSystemType] = useState<'low-end' | 'medium' | 'high-end'>('medium');
  const [boostMode, setBoostMode] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [optimizationScript, setOptimizationScript] = useState('');
  const [optimizations, setOptimizations] = useState<any>({});

  const gameNames: { [key: string]: string } = {
    fivem: 'FiveM',
    cod: 'Call of Duty',
    minecraft: 'Minecraft',
    fortnite: 'Fortnite',
    valorant: 'Valorant',
    apex: 'Apex Legends',
    csgo: 'CS:GO / CS2',
    roblox: 'Roblox'
  };

  // Initialize with game-specific defaults
  useEffect(() => {
    const defaults = getDefaultOptimizations(game);
    setOptimizations(defaults);
  }, [game]);

  const handleToggle = (key: string) => {
    setOptimizations((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const loadSystemProfile = (type: 'low-end' | 'medium' | 'high-end') => {
    setSystemType(type);
    const tweaks = getGameSpecificTweaks(game);
    const profile: any = {};
    
    // Enable all tweaks for low-end, selective for others
    tweaks.forEach(tweak => {
      if (type === 'low-end') {
        profile[tweak.key] = true; // Enable everything for low-end
      } else if (type === 'medium') {
        profile[tweak.key] = tweak.defaultValue !== undefined ? tweak.defaultValue : true;
      } else {
        // High-end: only enable non-graphics tweaks
        profile[tweak.key] = tweak.category !== 'graphics' ? (tweak.defaultValue !== undefined ? tweak.defaultValue : true) : false;
      }
    });
    
    setOptimizations(profile);
    toast.success(`${type.toUpperCase()} profile loaded for ${gameNames[game]}`, {
      description: `Optimizations configured for ${type} systems`
    });
  };

  const applyOptimizations = () => {
    const script = SystemOptimizerService.generateGameSpecificScript(
      game,
      systemType,
      optimizations
    );

    setOptimizationScript(script);
    setShowTerminal(true);

    // Also download the script immediately
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OPTIAXIRA_${gameNames[game]}_Optimization.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Save to history
    saveToHistory();

    toast.success(`${gameNames[game]} optimization script downloaded!`, {
      description: 'Run the .bat file as Administrator to apply optimizations'
    });
  };

  const saveToHistory = () => {
    const enabledTweaks = getGameSpecificTweaks(game).filter(
      tweak => optimizations[tweak.key] === true
    );

    if (enabledTweaks.length === 0) return;

    const historyEntry = {
      id: Date.now().toString(),
      game: game,
      gameName: gameNames[game],
      tweaksApplied: enabledTweaks.length,
      tweaksList: enabledTweaks.map(t => t.label),
      timestamp: new Date().toISOString(),
      success: true
    };

    // Get existing history
    const savedHistory = localStorage.getItem('optiaxira_history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];

    // Add new entry
    history.unshift(historyEntry);

    // Keep only last 50 entries
    const maxEntries = 50;
    if (history.length > maxEntries) {
      history.splice(maxEntries);
    }

    // Save to localStorage
    localStorage.setItem('optiaxira_history', JSON.stringify(history));

    // Update stats
    const stats = {
      totalTweaks: 98,
      gamesSupported: 8,
      tweaksApplied: enabledTweaks.length,
      lastOptimized: new Date().toLocaleDateString()
    };
    localStorage.setItem('optiaxira_stats', JSON.stringify(stats));
  };

  const downloadRestoreScript = () => {
    const script = SystemOptimizerService.generateRestoreScript();
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OPTIAXIRA_${gameNames[game]}_Restore.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Restore script downloaded!', {
      description: 'Use this to revert all changes'
    });
  };

  const enableBoostMode = () => {
    setBoostMode(true);
    const allTweaks = getGameSpecificTweaks(game);
    const boostProfile: any = {};
    
    // Enable ALL tweaks in boost mode
    allTweaks.forEach(tweak => {
      boostProfile[tweak.key] = true;
    });
    
    setOptimizations(boostProfile);
    toast.success(`🚀 BOOST MODE ACTIVATED FOR ${gameNames[game].toUpperCase()}!`, {
      description: 'All optimizations enabled for maximum performance'
    });
  };

  const quickTweaks = getTweaksByCategory(game, 'quick');
  const engineTweaks = getTweaksByCategory(game, 'engine');
  const graphicsTweaks = getTweaksByCategory(game, 'graphics');
  const performanceTweaks = getTweaksByCategory(game, 'performance');
  const networkTweaks = getTweaksByCategory(game, 'network');
  const advancedTweaks = getTweaksByCategory(game, 'advanced');

  const tabs = [
    { id: 'quick', label: 'Quick Settings', icon: Rocket, count: quickTweaks.length },
    { id: 'engine', label: 'Engine Specific', icon: Settings, count: engineTweaks.length },
    { id: 'graphics', label: 'Graphics', icon: Gamepad2, count: graphicsTweaks.length },
    { id: 'performance', label: 'Performance', icon: TrendingUp, count: performanceTweaks.length },
    { id: 'network', label: 'Network', icon: Network, count: networkTweaks.length },
    { id: 'advanced', label: 'Advanced', icon: Shield, count: advancedTweaks.length }
  ].filter(tab => tab.count > 0); // Only show tabs with tweaks

  const renderTweakSection = (tweaks: any[], color: string) => {
    if (tweaks.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tweaks.map(tweak => (
          <div key={tweak.key} className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-xl rounded-lg hover:bg-gray-900/70 border border-gray-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
            <div className="flex-1">
              <div className="text-gray-300 text-sm mb-1">{tweak.label}</div>
              <div className="text-gray-500 text-xs">{tweak.desc}</div>
            </div>
            <button
              onClick={() => handleToggle(tweak.key)}
              className={`relative w-12 h-6 rounded-full transition-all flex-shrink-0 ml-4 ${
                optimizations[tweak.key] ? `bg-${color}-500` : 'bg-gray-600'
              }`}
              style={{
                backgroundColor: optimizations[tweak.key] ? color : '#4b5563'
              }}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  optimizations[tweak.key] ? 'left-7' : 'left-1'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdjJoLTJ2LTJoMnptLTIgMmgtMnYtMmgydjJ6bTAgMGgtMnYyaDJ2LTJ6bTIgMGgydjJoLTJ2LTJ6bTAtMmgydi0yaC0ydjJ6bS0yIDB2LTJoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>
      
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-white text-xl">{gameNames[game]} Optimizer</h1>
                <p className="text-gray-400 text-sm">Game-specific optimization tweaks</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {boostMode && (
                <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm animate-pulse">
                  🚀 BOOST MODE
                </span>
              )}
              <button
                onClick={downloadRestoreScript}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Restore Defaults
              </button>
              <button
                onClick={applyOptimizations}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 group"
              >
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Apply Optimizations
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* System Profile Selection */}
        <div className="mb-6">
          <h3 className="text-white text-lg mb-4">Select Your System Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => loadSystemProfile('low-end')}
              className={`p-4 rounded-xl border-2 transition-all ${
                systemType === 'low-end'
                  ? 'bg-gradient-to-br from-red-500/20 to-red-900/20 border-red-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-red-500/50'
              }`}
            >
              <div className="text-red-400 mb-2">💻 Low-End</div>
              <div className="text-white text-sm mb-1">Budget PC</div>
              <div className="text-gray-400 text-xs">Maximum FPS focus</div>
            </button>

            <button
              onClick={() => loadSystemProfile('medium')}
              className={`p-4 rounded-xl border-2 transition-all ${
                systemType === 'medium'
                  ? 'bg-gradient-to-br from-blue-500/20 to-blue-900/20 border-blue-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50'
              }`}
            >
              <div className="text-blue-400 mb-2">⚡ Medium</div>
              <div className="text-white text-sm mb-1">Balanced PC</div>
              <div className="text-gray-400 text-xs">Performance + Quality</div>
            </button>

            <button
              onClick={() => loadSystemProfile('high-end')}
              className={`p-4 rounded-xl border-2 transition-all ${
                systemType === 'high-end'
                  ? 'bg-gradient-to-br from-purple-500/20 to-purple-900/20 border-purple-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50'
              }`}
            >
              <div className="text-purple-400 mb-2">🎮 High-End</div>
              <div className="text-white text-sm mb-1">Gaming PC</div>
              <div className="text-gray-400 text-xs">Quality focused</div>
            </button>

            <button
              onClick={enableBoostMode}
              className="p-4 rounded-xl border-2 bg-gradient-to-br from-orange-500/20 to-red-900/20 border-orange-500 hover:border-orange-400 transition-all"
            >
              <div className="text-orange-400 mb-2">🚀 BOOST MODE</div>
              <div className="text-white text-sm mb-1">Ultra Performance</div>
              <div className="text-gray-400 text-xs">Enable everything</div>
            </button>
          </div>
        </div>

        {/* Game-Specific Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h4 className="text-blue-400 mb-2">100% Unique Tweaks for {gameNames[game]}</h4>
              <p className="text-gray-400 text-sm">
                These optimizations are ONLY for {gameNames[game]}. They modify {gameNames[game]}'s config files, 
                folders, and settings. No generic system tweaks - every tweak is specific to this game.
              </p>
              {game === 'fivem' && <p className="text-cyan-400 text-xs mt-2">→ CitizenFX.ini, FiveM cache, GTA V settings</p>}
              {game === 'minecraft' && <p className="text-cyan-400 text-xs mt-2">→ .minecraft folder, JVM args, options.txt</p>}
              {game === 'cod' && <p className="text-cyan-400 text-xs mt-2">→ config_mp.cfg, Battle.net, Warzone cache</p>}
              {game === 'fortnite' && <p className="text-cyan-400 text-xs mt-2">→ GameUserSettings.ini, Epic launcher</p>}
              {game === 'valorant' && <p className="text-cyan-400 text-xs mt-2">→ Vanguard, Riot Client, VALORANT configs</p>}
              {game === 'apex' && <p className="text-cyan-400 text-xs mt-2">→ autoexec.cfg, videoconfig.txt, Respawn</p>}
              {game === 'csgo' && <p className="text-cyan-400 text-xs mt-2">→ CS autoexec, video.txt, Steam launch</p>}
              {game === 'roblox' && <p className="text-cyan-400 text-xs mt-2">→ rbxfpsunlocker, ClientSettings, FastFlags</p>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className="px-2 py-0.5 bg-black/20 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
          {activeTab === 'quick' && (
            <>
              <h2 className="text-white text-xl mb-4">Quick Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Most impactful tweaks for {gameNames[game]}</p>
              {renderTweakSection(quickTweaks, '#3b82f6')}
            </>
          )}

          {activeTab === 'engine' && (
            <>
              <h2 className="text-white text-xl mb-4">Engine-Specific Tweaks</h2>
              <p className="text-gray-400 text-sm mb-6">Optimizations for {gameNames[game]}'s game engine</p>
              {renderTweakSection(engineTweaks, '#8b5cf6')}
            </>
          )}

          {activeTab === 'graphics' && (
            <>
              <h2 className="text-white text-xl mb-4">Graphics Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Visual quality tweaks for better FPS</p>
              {renderTweakSection(graphicsTweaks, '#22c55e')}
            </>
          )}

          {activeTab === 'performance' && (
            <>
              <h2 className="text-white text-xl mb-4">Performance Tweaks</h2>
              <p className="text-gray-400 text-sm mb-6">General performance optimizations</p>
              {renderTweakSection(performanceTweaks, '#f59e0b')}
            </>
          )}

          {activeTab === 'network' && (
            <>
              <h2 className="text-white text-xl mb-4">Network Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Reduce latency and improve connection</p>
              {renderTweakSection(networkTweaks, '#06b6d4')}
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <h2 className="text-white text-xl mb-4">Advanced Settings</h2>
              <p className="text-gray-400 text-sm mb-6">Expert-level optimizations</p>
              {renderTweakSection(advancedTweaks, '#ef4444')}
              
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h4 className="text-red-400 mb-1">⚠️ Warning</h4>
                    <p className="text-gray-400 text-sm">
                      Advanced settings modify game configuration files. Use "Restore Defaults" if you experience issues.
                      Always backup your game settings before applying.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={applyOptimizations}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download {gameNames[game]} Optimization Script
          </button>

          <button
            onClick={downloadRestoreScript}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Download Restore Script
          </button>

          {!boostMode && (
            <button
              onClick={enableBoostMode}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all shadow-lg animate-pulse"
            >
              <Rocket className="w-5 h-5" />
              Enable BOOST MODE
            </button>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <div className="text-blue-400 text-sm mb-1">Total Tweaks</div>
            <div className="text-white text-2xl">{getGameSpecificTweaks(game).length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-900/10 backdrop-blur-xl border border-green-500/20 rounded-xl p-4 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <div className="text-green-400 text-sm mb-1">Enabled</div>
            <div className="text-white text-2xl">
              {Object.values(optimizations).filter(v => v === true).length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="text-purple-400 text-sm mb-1">Profile</div>
            <div className="text-white text-lg capitalize">{systemType}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-900/10 backdrop-blur-xl border border-orange-500/20 rounded-xl p-4 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/20 transition-all">
            <div className="text-orange-400 text-sm mb-1">Expected Boost</div>
            <div className="text-white text-2xl">+{systemType === 'low-end' ? '50' : systemType === 'medium' ? '35' : '25'}%</div>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      {showTerminal && (
        <OptimizationTerminal
          script={optimizationScript}
          gameName={gameNames[game]}
          onClose={() => setShowTerminal(false)}
        />
      )}
      </div>
    </div>
  );
}
