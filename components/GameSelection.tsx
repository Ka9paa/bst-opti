import { useState } from 'react';
import { Download, Eye, Search } from 'lucide-react';

interface GameSelectionProps {
  licenseType: string;
  onBack: () => void;
}

interface Game {
  id: string;
  name: string;
  available: boolean;
  requiredPlan: string;
}

export default function GameSelection({ licenseType, onBack }: GameSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const games: Game[] = [
    { id: 'fortnite', name: 'Fortnite', available: true, requiredPlan: 'Foundation' },
    { id: 'valorant', name: 'Valorant', available: true, requiredPlan: 'Foundation' },
    { id: 'cs2', name: 'Counter-Strike 2', available: true, requiredPlan: 'Elite' },
    { id: 'apex', name: 'Apex Legends', available: true, requiredPlan: 'Elite' },
    { id: 'cod', name: 'Call of Duty', available: true, requiredPlan: 'Elite' },
    { id: 'r6', name: 'Rainbow Six Siege', available: true, requiredPlan: 'Foundation' },
  ];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasAccess = (game: Game) => {
    if (licenseType.includes('Elite')) return true;
    if (licenseType.includes('Foundation') && game.requiredPlan === 'Foundation') return true;
    return false;
  };

  const handlePreview = (game: Game) => {
    setSelectedGame(game);
    setShowPreview(true);
  };

  const handleDownload = (game: Game) => {
    // Generate optimization script
    const script = generateOptimizationScript(game);
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game.id}_optimization.bat`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateOptimizationScript = (game: Game) => {
    return `@echo off
echo ========================================
echo Axira Optimizer - ${game.name}
echo ========================================
echo.

REM Windows Power Plan Optimization
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
echo [✓] Power plan set to High Performance

REM Disable Game DVR
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
echo [✓] Game DVR disabled

REM Disable Fullscreen Optimizations
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f
echo [✓] Fullscreen optimizations disabled

REM Priority Optimization
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f
echo [✓] GPU priority optimized

REM Network Optimization
netsh int tcp set global autotuninglevel=normal
echo [✓] Network settings optimized

echo.
echo ========================================
echo Optimization Complete!
echo Please restart ${game.name} for changes to take effect.
echo ========================================
pause
`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="mb-2">Select a Game</h1>
          <p className="text-gray-400">
            Choose a game to optimize. Your plan: <span className="text-blue-400">{licenseType}</span>
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a game..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const access = hasAccess(game);
            return (
              <div
                key={game.id}
                className={`bg-gray-900 rounded-xl p-6 border ${
                  access ? 'border-gray-800 hover:border-blue-500' : 'border-gray-800 opacity-60'
                } transition-colors`}
              >
                <h3 className="mb-4">{game.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm ${access ? 'text-green-400' : 'text-yellow-400'}`}>
                    {access ? '✓ Available' : `Requires ${game.requiredPlan}`}
                  </span>
                </div>

                {access ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreview(game)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(game)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ) : (
                  <button className="w-full bg-gray-800 text-gray-500 py-2 rounded-lg cursor-not-allowed">
                    Upgrade Required
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Preview Modal */}
        {showPreview && selectedGame && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-gray-800">
              <h2 className="mb-4">{selectedGame.name} Optimization Script</h2>
              <p className="text-gray-400 mb-6">
                Preview of the optimizations that will be applied:
              </p>

              <div className="bg-black rounded-lg p-4 mb-6 font-mono text-sm text-green-400 overflow-x-auto">
                <pre>{generateOptimizationScript(selectedGame)}</pre>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedGame);
                    setShowPreview(false);
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Script
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
