import { useState } from 'react';
import { ArrowLeft, Monitor, Zap, Settings, Download, FileText, CheckCircle } from 'lucide-react';
import { generateOptimizationPackage } from '../utils/optimizationScripts';
import { OptimizationService } from '../services/optimization.service';
import { toast } from 'sonner@2.0.3';
import { ScriptPreviewModal } from './ScriptPreviewModal';

interface GameOptimizerProps {
  game: string;
  packageId: string;
  onBack: () => void;
}

export function GameOptimizer({ game, packageId, onBack }: GameOptimizerProps) {
  const [settings, setSettings] = useState({
    // Graphics
    resolution: '1920x1080',
    displayMode: 'fullscreen',
    vsync: false,
    fpsLimit: '240',
    
    // Quality
    textureQuality: 'medium',
    shadowQuality: 'low',
    effectsQuality: 'low',
    antiAliasing: 'off',
    
    // Performance
    lowLatency: true,
    threadOptimization: true,
    gpuPriority: true,
    disableFullscreenOpt: false,
    
    // Advanced
    reducedBuffering: true,
    powerMode: 'maximum',
    backgroundApps: false
  });

  const [showPreview, setShowPreview] = useState(false);
  const [previewScript, setPreviewScript] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');

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
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSelect = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyOptimizations = async () => {
    const scripts = generateOptimizationPackage(game, settings, packageId);
    
    // Show preview modal first
    setPreviewScript(scripts.windowsScript);
    setPreviewFileName(`${gameNames[game]}_Windows_Optimizer.bat`);
    setShowPreview(true);
  };

  const handleConfirmDownload = async () => {
    const scripts = generateOptimizationPackage(game, settings, packageId);
    
    // Web version - download scripts
    try {
      // Download Windows Optimization Script
      const windowsBlob = new Blob([scripts.windowsScript], { type: 'text/plain' });
      const windowsUrl = URL.createObjectURL(windowsBlob);
      const windowsLink = document.createElement('a');
      windowsLink.href = windowsUrl;
      windowsLink.download = `${gameNames[game]}_Windows_Optimizer.bat`;
      document.body.appendChild(windowsLink);
      windowsLink.click();
      document.body.removeChild(windowsLink);
      URL.revokeObjectURL(windowsUrl);
      
      // Download NVIDIA Script
      const nvidiaBlob = new Blob([scripts.nvidiaScript], { type: 'text/plain' });
      const nvidiaUrl = URL.createObjectURL(nvidiaBlob);
      const nvidiaLink = document.createElement('a');
      nvidiaLink.href = nvidiaUrl;
      nvidiaLink.download = `${gameNames[game]}_NVIDIA_Settings.bat`;
      document.body.appendChild(nvidiaLink);
      nvidiaLink.click();
      document.body.removeChild(nvidiaLink);
      URL.revokeObjectURL(nvidiaUrl);
      
      // Download Game Config
      const configBlob = new Blob([scripts.gameConfig], { type: 'text/plain' });
      const configUrl = URL.createObjectURL(configBlob);
      const configLink = document.createElement('a');
      configLink.href = configUrl;
      configLink.download = `${gameNames[game]}_Config.txt`;
      document.body.appendChild(configLink);
      configLink.click();
      document.body.removeChild(configLink);
      URL.revokeObjectURL(configUrl);
      
      toast.success('Optimization scripts downloaded!', {
        description: 'Right-click the .bat file and Run as Administrator'
      });
    } catch (error) {
      toast.error('Failed to download scripts', {
        description: 'Please try again'
      });
    }
    
    setShowPreview(false);
  };

  const downloadOptimizationPackage = () => {
    const packageData = generateOptimizationPackage(game, settings, packageId);
    const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameNames[game]}_optimization_package.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdjJoLTJ2LTJoMnptLTIgMmgtMnYtMmgydjJ6bTAgMGgtMnYyaDJ2LTJ6bTIgMGgydjJoLTJ2LTJ6bTAtMmgydi0yaC0ydjJ6bS0yIDB2LTJoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
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
                <p className="text-gray-400 text-sm">Maximize your FPS and performance</p>
              </div>
            </div>
            
            <button
              onClick={applyOptimizations}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Apply Optimizations
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graphics Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-white text-xl">Graphics</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Resolution</label>
                <select
                  value={settings.resolution}
                  onChange={(e) => handleSelect('resolution', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option>1920x1080</option>
                  <option>2560x1440</option>
                  <option>3840x2160</option>
                  <option>1600x900</option>
                  <option>1280x720</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Display Mode</label>
                <select
                  value={settings.displayMode}
                  onChange={(e) => handleSelect('displayMode', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="fullscreen">Fullscreen</option>
                  <option value="borderless">Borderless Window</option>
                  <option value="windowed">Windowed</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm">V-Sync</span>
                <button
                  onClick={() => handleToggle('vsync')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.vsync ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.vsync ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">FPS Limit</label>
                <select
                  value={settings.fpsLimit}
                  onChange={(e) => handleSelect('fpsLimit', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option>Unlimited</option>
                  <option>240</option>
                  <option>165</option>
                  <option>144</option>
                  <option>120</option>
                  <option>60</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quality Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-white text-xl">Quality</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Texture Quality</label>
                <select
                  value={settings.textureQuality}
                  onChange={(e) => handleSelect('textureQuality', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Shadow Quality</label>
                <select
                  value={settings.shadowQuality}
                  onChange={(e) => handleSelect('shadowQuality', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="off">Off</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Effects Quality</label>
                <select
                  value={settings.effectsQuality}
                  onChange={(e) => handleSelect('effectsQuality', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="off">Off</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Anti-Aliasing</label>
                <select
                  value={settings.antiAliasing}
                  onChange={(e) => handleSelect('antiAliasing', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="off">Off</option>
                  <option value="fxaa">FXAA</option>
                  <option value="taa">TAA</option>
                  <option value="msaa">MSAA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-white text-xl">Performance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-gray-300 text-sm">Low Latency Mode</div>
                  <div className="text-gray-500 text-xs">Reduce input lag</div>
                </div>
                <button
                  onClick={() => handleToggle('lowLatency')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.lowLatency ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.lowLatency ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-gray-300 text-sm">Thread Optimization</div>
                  <div className="text-gray-500 text-xs">Multi-core usage</div>
                </div>
                <button
                  onClick={() => handleToggle('threadOptimization')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.threadOptimization ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.threadOptimization ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-gray-300 text-sm">GPU Priority</div>
                  <div className="text-gray-500 text-xs">High performance</div>
                </div>
                <button
                  onClick={() => handleToggle('gpuPriority')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.gpuPriority ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.gpuPriority ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-gray-300 text-sm">Reduced Buffering</div>
                  <div className="text-gray-500 text-xs">Lower frame delay</div>
                </div>
                <button
                  onClick={() => handleToggle('reducedBuffering')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.reducedBuffering ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.reducedBuffering ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Power Mode</label>
                <select
                  value={settings.powerMode}
                  onChange={(e) => handleSelect('powerMode', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="maximum">Maximum Performance</option>
                  <option value="balanced">Balanced</option>
                  <option value="powersaver">Power Saver</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-gray-300 text-sm">Close Background Apps</div>
                  <div className="text-gray-500 text-xs">Free up resources</div>
                </div>
                <button
                  onClick={() => handleToggle('backgroundApps')}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    settings.backgroundApps ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      settings.backgroundApps ? 'left-7' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6">
          <h3 className="text-white text-xl mb-4">Quick Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-br from-green-500/20 to-green-900/20 backdrop-blur-xl border border-green-500/30 rounded-xl p-4 text-left hover:border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all">
              <div className="text-green-400 mb-2">🚀 Maximum FPS</div>
              <div className="text-white text-sm mb-1">Ultra Performance</div>
              <div className="text-gray-400 text-xs">Lowest settings for highest FPS</div>
            </button>

            <button className="bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
              <div className="text-blue-400 mb-2">⚖️ Balanced</div>
              <div className="text-white text-sm mb-1">Quality + Performance</div>
              <div className="text-gray-400 text-xs">Good visuals with solid FPS</div>
            </button>

            <button className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 text-left hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
              <div className="text-purple-400 mb-2">✨ High Quality</div>
              <div className="text-white text-sm mb-1">Best Visuals</div>
              <div className="text-gray-400 text-xs">Maximum graphics quality</div>
            </button>
          </div>
        </div>

        {/* Download Optimization Package */}
        <div className="mt-6">
          <button
            onClick={downloadOptimizationPackage}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-lg"
          >
            <FileText className="w-4 h-4" />
            Download Optimization Package
          </button>
        </div>
      </div>
      </div>

      {/* Script Preview Modal */}
      <ScriptPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirmDownload={handleConfirmDownload}
        scriptContent={previewScript}
        fileName={previewFileName}
        gameName={gameNames[game]}
      />
    </div>
  );
}