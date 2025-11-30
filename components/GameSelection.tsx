import { Download, Eye } from 'lucide-react';
import { useState } from 'react';

interface GameSelectionProps {
  licenseKey: string;
}

export function GameSelection({ licenseKey }: GameSelectionProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const packageType = licenseKey.split('-')[0];

  const games = [
    { id: 'fortnite', name: 'Fortnite', icon: '🎮' },
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'apex', name: 'Apex Legends', icon: '🔫' },
    { id: 'cs2', name: 'Counter-Strike 2', icon: '💥' },
    { id: 'cod', name: 'Call of Duty', icon: '⚔️' },
  ];

  const mockScript = `@echo off
echo Axira Optimizer - ${selectedGame?.toUpperCase()}
echo Package: ${packageType}
echo.
echo Applying optimizations...
echo.
REM Disable unnecessary services
sc config "SysMain" start=disabled
sc stop "SysMain"
echo [✓] Disabled SysMain
echo.
REM Power plan optimization
powercfg -setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
echo [✓] Set High Performance power plan
echo.
REM Network optimization
netsh int tcp set global autotuninglevel=normal
echo [✓] Optimized network settings
echo.
echo Optimization complete! Restart your game for best results.
pause`;

  const handleDownload = (gameName: string) => {
    const blob = new Blob([mockScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axira-${gameName}-optimizer.bat`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white mb-8">Select Your Game</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all"
            >
              <div className="text-5xl mb-4">{game.icon}</div>
              <h3 className="text-white mb-4">{game.name}</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedGame(game.id);
                    setShowPreview(true);
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(game.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPreview && selectedGame && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl p-8 max-w-3xl w-full border border-white/10">
              <h2 className="text-white mb-4">Script Preview - {selectedGame.toUpperCase()}</h2>
              <pre className="bg-black/50 p-4 rounded-lg text-green-400 text-sm overflow-auto max-h-96 mb-6">
                {mockScript}
              </pre>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedGame);
                    setShowPreview(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                >
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
