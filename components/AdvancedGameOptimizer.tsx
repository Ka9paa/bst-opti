import { useState } from 'react';
import {
  ArrowLeft, Monitor, Zap, Settings, Download, Cpu, HardDrive,
  Wifi, Eye, Gauge, Rocket, RotateCcw, Save, Sparkles, Shield
} from 'lucide-react';
import { SystemOptimizerService } from '../services/system-optimizer.service';
import { OptimizationTerminal } from './OptimizationTerminal';
import { toast } from 'sonner';

interface AdvancedGameOptimizerProps {
  game: string;
  packageId: string;
  onBack: () => void;
}

export function AdvancedGameOptimizer({ game, packageId, onBack }: AdvancedGameOptimizerProps) {
  const [activeTab, setActiveTab] = useState('quick');
  const [systemType, setSystemType] = useState<'low-end' | 'medium' | 'high-end'>('medium');
  const [boostMode, setBoostMode] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [optimizationScript, setOptimizationScript] = useState('');

  const [optimizations, setOptimizations] = useState({
    // CPU & Power
    powerPlan: 'high-performance' as 'balanced' | 'high-performance' | 'power-saver' | 'ultimate',
    cpuBoost: true,
    cpuPriority: 'high' as 'normal' | 'high' | 'realtime',
    disableCoreParking: true,
    cpuCStates: false,
    cpuThrottling: false,
    
    // Memory
    clearMemoryCache: true,
    optimizePagefile: true,
    closeBackgroundApps: true,
    ramOptimization: 'medium' as 'light' | 'medium' | 'aggressive',
    superfetchDisable: true,
    prefetchDisable: true,
    clearStandbyMemory: true,
    disableMemoryCompression: false,
    
    // Startup
    disableStartupApps: false,
    disableUnnecessaryServices: false,
    lightweightMode: false,
    
    // Disk
    diskCleanup: true,
    optimizeDisk: true,
    moveToFastDrive: false,
    disableIndexing: true,
    optimizeNTFS: true,
    ssdTrimOptimization: true,
    
    // GPU
    gpuPowerMode: 'maximum' as 'maximum' | 'balanced' | 'quality',
    gpuScheduling: true,
    lowLatencyMode: true,
    disableDVR: true,
    maxPrerenderedFrames: '1' as '1' | '2' | '3',
    textureFiltering: 'performance' as 'quality' | 'balanced' | 'performance',
    
    // OS Tweaks
    disableVisualEffects: false,
    disableAnimations: false,
    disableTransparency: false,
    enableGameMode: true,
    pauseUpdates: true,
    disableTelemetry: true,
    disableCortana: false,
    disableNotifications: true,
    optimizeSystemResponsiveness: true,
    
    // Network
    prioritizeGameTraffic: true,
    pauseDownloads: true,
    optimizeTCPIP: true,
    dnsOptimization: true,
    disableNetworkThrottling: true,
    enableQoS: true,
    reducePing: true,
    
    // Advanced
    hardwareAcceleration: true,
    fullscreenOptimizations: true,
    disableHPET: false,
    msiMode: true,
    timerResolution: '0.5ms' as '0.5ms' | '1.0ms' | 'default',
    registryTweaks: true,
  });

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

  const handleToggle = (key: string) => {
    setOptimizations(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSelect = (key: string, value: string) => {
    setOptimizations(prev => ({ ...prev, [key]: value }));
  };

  const loadSystemProfile = (type: 'low-end' | 'medium' | 'high-end') => {
    setSystemType(type);
    const profile = SystemOptimizerService.getGameProfile(game, type);
    setOptimizations(profile.optimizations);
    toast.success(`${type.toUpperCase()} profile loaded`, {
      description: `Optimizations configured for ${type} systems`
    });
  };

  const applyOptimizations = () => {
    const script = SystemOptimizerService.generateSystemOptimizationScript(
      game,
      systemType,
      optimizations
    );

    // Set script and show terminal for live execution
    setOptimizationScript(script);
    setShowTerminal(true);
  };

  const downloadRestoreScript = () => {
    const script = SystemOptimizerService.generateRestoreScript();
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OPTIAXIRA_Restore_Defaults.bat';
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
    setOptimizations({
      ...optimizations,
      powerPlan: 'ultimate',
      cpuBoost: true,
      cpuPriority: 'realtime',
      clearMemoryCache: true,
      closeBackgroundApps: true,
      ramOptimization: 'aggressive',
      gpuPowerMode: 'maximum',
      lowLatencyMode: true,
      disableVisualEffects: true,
      pauseUpdates: true,
      prioritizeGameTraffic: true,
      pauseDownloads: true
    });
    toast.success('🚀 BOOST MODE ACTIVATED!', {
      description: 'Maximum performance settings applied'
    });
  };

  const gameProfile = SystemOptimizerService.getGameProfile(game, systemType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
                <h1 className="text-white text-xl">{gameNames[game]} Advanced Optimizer</h1>
                <p className="text-gray-400 text-sm">Complete system and game optimization</p>
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
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg"
              >
                <Zap className="w-4 h-4" />
                Apply Optimizations Now
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
              <div className="text-gray-400 text-xs">Maximum everything</div>
            </button>
          </div>
        </div>

        {/* Game-Specific Recommendations */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h4 className="text-blue-400 mb-2">Game-Specific Recommendations for {gameNames[game]}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.resolution}</span>
                </div>
                <div>
                  <span className="text-gray-400">Display:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.displayMode}</span>
                </div>
                <div>
                  <span className="text-gray-400">V-Sync:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.vsync ? 'ON' : 'OFF'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Shadows:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.shadows}</span>
                </div>
                <div>
                  <span className="text-gray-400">Textures:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.textures}</span>
                </div>
                <div>
                  <span className="text-gray-400">Effects:</span>
                  <span className="text-white ml-2">{gameProfile.gameSpecific.recommendedSettings.effects}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'quick', label: 'Quick Settings', icon: Rocket },
            { id: 'cpu', label: 'CPU & Power', icon: Cpu },
            { id: 'memory', label: 'Memory', icon: HardDrive },
            { id: 'gpu', label: 'GPU', icon: Monitor },
            { id: 'disk', label: 'Disk/Storage', icon: Save },
            { id: 'os', label: 'OS Tweaks', icon: Eye },
            { id: 'network', label: 'Network', icon: Wifi },
            { id: 'advanced', label: 'Advanced', icon: Settings }
          ].map(tab => {
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
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Quick Settings */}
          {activeTab === 'quick' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <h2 className="text-white text-xl mb-4">Quick Optimization Toggles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'enableGameMode', label: 'Game Mode', desc: 'Windows game optimizations' },
                  { key: 'lowLatencyMode', label: 'Low Latency', desc: 'Reduce input delay' },
                  { key: 'gpuScheduling', label: 'GPU Scheduling', desc: 'Hardware acceleration' },
                  { key: 'prioritizeGameTraffic', label: 'Prioritize Game Traffic', desc: 'Network optimization' },
                  { key: 'clearMemoryCache', label: 'Clear Memory Cache', desc: 'Free up RAM' },
                  { key: 'closeBackgroundApps', label: 'Close Background Apps', desc: 'Free resources' },
                  { key: 'optimizeTCPIP', label: 'Optimize Network', desc: 'TCP/IP tweaks' },
                  { key: 'pauseUpdates', label: 'Pause Updates', desc: 'Stop Windows updates' },
                  { key: 'disableCoreParking', label: 'Disable Core Parking', desc: 'Keep CPU cores active' },
                  { key: 'cpuBoost', label: 'CPU Boost', desc: 'Maximum CPU frequency' },
                  { key: 'disableDVR', label: 'Disable Game DVR', desc: 'Xbox recording off' },
                  { key: 'reducePing', label: 'Reduce Ping', desc: 'Network latency optimization' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CPU & Power */}
          {activeTab === 'cpu' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-orange-400" />
                </div>
                <h2 className="text-white text-xl">CPU & Power Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Power Plan</label>
                  <select
                    value={optimizations.powerPlan}
                    onChange={(e) => handleSelect('powerPlan', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="high-performance">High Performance</option>
                    <option value="ultimate">Ultimate Performance</option>
                    <option value="power-saver">Power Saver</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">CPU Priority</label>
                  <select
                    value={optimizations.cpuPriority}
                    onChange={(e) => handleSelect('cpuPriority', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="realtime">Realtime (Advanced)</option>
                  </select>
                </div>

                {[
                  { key: 'cpuBoost', label: 'CPU Turbo Boost', desc: 'Enable maximum CPU frequency' },
                  { key: 'disableCoreParking', label: 'Disable Core Parking', desc: 'Keep all CPU cores active' },
                  { key: 'cpuCStates', label: 'Disable C-States', desc: 'Prevent CPU sleep states (Advanced)' },
                  { key: 'cpuThrottling', label: 'Disable CPU Throttling', desc: 'Remove frequency limits' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memory */}
          {activeTab === 'memory' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-white text-xl">Memory (RAM) Optimization</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">RAM Optimization Level</label>
                  <select
                    value={optimizations.ramOptimization}
                    onChange={(e) => handleSelect('ramOptimization', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="light">Light (Recommended)</option>
                    <option value="medium">Medium</option>
                    <option value="aggressive">Aggressive (Low-End PCs)</option>
                  </select>
                </div>

                {[
                  { key: 'clearMemoryCache', label: 'Clear Memory Cache', desc: 'Free standby memory' },
                  { key: 'optimizePagefile', label: 'Optimize Pagefile', desc: 'Configure virtual memory' },
                  { key: 'closeBackgroundApps', label: 'Close Background Apps', desc: 'Kill memory-heavy processes' },
                  { key: 'superfetchDisable', label: 'Disable Superfetch/SysMain', desc: 'Reduce RAM usage' },
                  { key: 'prefetchDisable', label: 'Disable Prefetch', desc: 'Stop preloading apps' },
                  { key: 'clearStandbyMemory', label: 'Clear Standby Memory', desc: 'Free cached RAM' },
                  { key: 'disableMemoryCompression', label: 'Disable Memory Compression', desc: 'Reduce CPU usage (Advanced)' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GPU */}
          {activeTab === 'gpu' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-white text-xl">GPU Optimization</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">GPU Power Mode</label>
                  <select
                    value={optimizations.gpuPowerMode}
                    onChange={(e) => handleSelect('gpuPowerMode', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="maximum">Maximum Performance</option>
                    <option value="balanced">Balanced</option>
                    <option value="quality">Quality Focused</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">Max Pre-Rendered Frames</label>
                  <select
                    value={optimizations.maxPrerenderedFrames}
                    onChange={(e) => handleSelect('maxPrerenderedFrames', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="1">1 (Lowest Latency)</option>
                    <option value="2">2 (Balanced)</option>
                    <option value="3">3 (Smoothest)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">Texture Filtering</label>
                  <select
                    value={optimizations.textureFiltering}
                    onChange={(e) => handleSelect('textureFiltering', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="performance">Performance (Best FPS)</option>
                    <option value="balanced">Balanced</option>
                    <option value="quality">Quality (Best Visuals)</option>
                  </select>
                </div>

                {[
                  { key: 'gpuScheduling', label: 'Hardware-Accelerated GPU Scheduling', desc: 'Reduce latency (Windows 10+)' },
                  { key: 'lowLatencyMode', label: 'Low Latency Mode', desc: 'NVIDIA Reflex / AMD Anti-Lag' },
                  { key: 'hardwareAcceleration', label: 'Hardware Acceleration', desc: 'Use GPU for system tasks' },
                  { key: 'disableDVR', label: 'Disable Game DVR', desc: 'Xbox Game Bar recording off' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disk/Storage */}
          {activeTab === 'disk' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Save className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-white text-xl">Disk & Storage Optimization</h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'diskCleanup', label: 'Disk Cleanup', desc: 'Remove temporary files and cache' },
                  { key: 'optimizeDisk', label: 'Optimize Disk', desc: 'Defragment HDD / TRIM SSD' },
                  { key: 'disableIndexing', label: 'Disable Windows Search Indexing', desc: 'Reduce disk I/O usage' },
                  { key: 'optimizeNTFS', label: 'Optimize NTFS Settings', desc: 'File system performance tweaks' },
                  { key: 'ssdTrimOptimization', label: 'SSD TRIM Optimization', desc: 'Maintain SSD health & speed' },
                  { key: 'moveToFastDrive', label: 'Suggest Fast Drive Migration', desc: 'Move game to SSD if available' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OS Tweaks */}
          {activeTab === 'os' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-white text-xl">Windows OS Tweaks</h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'enableGameMode', label: 'Enable Game Mode', desc: 'Windows game optimizations' },
                  { key: 'disableVisualEffects', label: 'Disable Visual Effects', desc: 'Remove animations & shadows' },
                  { key: 'disableAnimations', label: 'Disable Animations', desc: 'Faster UI response' },
                  { key: 'disableTransparency', label: 'Disable Transparency', desc: 'Reduce GPU load' },
                  { key: 'pauseUpdates', label: 'Pause Windows Updates', desc: 'Prevent updates during gaming' },
                  { key: 'disableUnnecessaryServices', label: 'Disable Unnecessary Services', desc: 'Free up CPU resources' },
                  { key: 'fullscreenOptimizations', label: 'Fullscreen Optimizations', desc: 'Windows 10+ feature' },
                  { key: 'disableTelemetry', label: 'Disable Telemetry', desc: 'Stop data collection' },
                  { key: 'disableCortana', label: 'Disable Cortana', desc: 'Free up resources' },
                  { key: 'disableNotifications', label: 'Disable Notifications', desc: 'No interruptions while gaming' },
                  { key: 'optimizeSystemResponsiveness', label: 'Optimize System Responsiveness', desc: 'Multimedia Class Scheduler' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Network */}
          {activeTab === 'network' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-white text-xl">Network Optimization</h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'optimizeTCPIP', label: 'Optimize TCP/IP Settings', desc: 'Reduce network latency' },
                  { key: 'prioritizeGameTraffic', label: 'Prioritize Game Traffic (QoS)', desc: 'Network bandwidth priority' },
                  { key: 'pauseDownloads', label: 'Pause Background Downloads', desc: 'Stop Steam, Epic, Windows Store' },
                  { key: 'dnsOptimization', label: 'DNS Optimization', desc: 'Use faster DNS servers (Cloudflare/Google)' },
                  { key: 'disableNetworkThrottling', label: 'Disable Network Throttling', desc: 'Remove Windows bandwidth limits' },
                  { key: 'enableQoS', label: 'Enable Quality of Service (QoS)', desc: 'Prioritize gaming packets' },
                  { key: 'reducePing', label: 'Ping Reduction Tweaks', desc: 'Optimize network adapter settings' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced */}
          {activeTab === 'advanced' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-white text-xl">Advanced Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Timer Resolution</label>
                  <select
                    value={optimizations.timerResolution}
                    onChange={(e) => handleSelect('timerResolution', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="0.5ms">0.5ms (Ultra Low Latency)</option>
                    <option value="1.0ms">1.0ms (Balanced)</option>
                    <option value="default">Default</option>
                  </select>
                </div>

                {[
                  { key: 'lightweightMode', label: 'Lightweight Mode', desc: 'Disable non-essential features' },
                  { key: 'disableStartupApps', label: 'Disable Startup Apps', desc: 'Faster boot time' },
                  { key: 'diskCleanup', label: 'Disk Cleanup', desc: 'Remove temp files' },
                  { key: 'optimizeDisk', label: 'Optimize Disk', desc: 'Defrag HDD / TRIM SSD' },
                  { key: 'disableIndexing', label: 'Disable Windows Search Indexing', desc: 'Reduce disk usage' },
                  { key: 'optimizeNTFS', label: 'Optimize NTFS', desc: 'File system tweaks' },
                  { key: 'ssdTrimOptimization', label: 'SSD TRIM Optimization', desc: 'Maintain SSD performance' },
                  { key: 'disableHPET', label: 'Disable HPET', desc: 'High Precision Event Timer (Advanced)' },
                  { key: 'msiMode', label: 'Enable MSI Mode', desc: 'Message Signaled Interrupts for GPU' },
                  { key: 'registryTweaks', label: 'Registry Optimizations', desc: 'System-wide performance tweaks' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="text-gray-300 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        optimizations[item.key as keyof typeof optimizations] ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          optimizations[item.key as keyof typeof optimizations] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                      <h4 className="text-red-400 mb-1">⚠️ Warning</h4>
                      <p className="text-gray-400 text-sm">
                        Advanced settings modify system behavior. Use "Restore Defaults" if you experience issues.
                        Always run optimization scripts as Administrator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={applyOptimizations}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download Optimization Script
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

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-blue-400 mb-2">📋 How to Use</h4>
          <ol className="text-gray-400 text-sm space-y-1 ml-4 list-decimal">
            <li>Select your system profile (Low-End, Medium, or High-End)</li>
            <li>Review and customize optimization settings in each tab</li>
            <li>Click "Download Optimization Script" to get your custom .bat file</li>
            <li>Right-click the downloaded file and select "Run as Administrator"</li>
            <li>Restart your computer after applying optimizations</li>
            <li>Launch {gameNames[game]} and enjoy improved performance!</li>
          </ol>
          <p className="text-gray-400 text-sm mt-3">
            <strong>Note:</strong> Keep the "Restore Defaults" script in case you need to revert changes.
          </p>
        </div>
      </div>

      {/* Optimization Terminal */}
      <OptimizationTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        gameName={gameNames[game]}
        systemType={systemType}
        optimizationScript={optimizationScript}
      />
    </div>
  );
}