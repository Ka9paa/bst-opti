import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Gamepad2, 
  Calendar,
  Trash2,
  Download,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  TrendingUp
} from 'lucide-react';

interface HistoryEntry {
  id: string;
  game: string;
  gameName: string;
  tweaksApplied: number;
  tweaksList: string[];
  timestamp: string;
  success: boolean;
}

interface HistoryProps {
  onBack: () => void;
}

export default function History({ onBack }: HistoryProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState('all');

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

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [searchTerm, filterGame, history]);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('optiaxira_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed);
      setFilteredHistory(parsed);
    }
  };

  const filterHistory = () => {
    let filtered = [...history];

    // Filter by game
    if (filterGame !== 'all') {
      filtered = filtered.filter(entry => entry.game === filterGame);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tweaksList.some(tweak => tweak.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredHistory(filtered);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      localStorage.removeItem('optiaxira_history');
      setHistory([]);
      setFilteredHistory([]);
    }
  };

  const deleteEntry = (id: string) => {
    if (confirm('Delete this history entry?')) {
      const updated = history.filter(entry => entry.id !== id);
      localStorage.setItem('optiaxira_history', JSON.stringify(updated));
      setHistory(updated);
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optiaxira-history-${Date.now()}.json`;
    link.click();
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getTotalTweaks = () => {
    return history.reduce((sum, entry) => sum + entry.tweaksApplied, 0);
  };

  const getUniqueGames = () => {
    const games = new Set(history.map(entry => entry.game));
    return games.size;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mb-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              Optimization History
            </h1>
            <p className="text-gray-400">View your past optimizations and tweaks</p>
          </div>

          <div className="flex gap-3">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl mb-1">{history.length}</div>
          <div className="text-gray-400 text-sm">Total Optimizations</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-900/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl mb-1">{getTotalTweaks()}</div>
          <div className="text-gray-400 text-sm">Tweaks Applied</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl mb-1">{getUniqueGames()}</div>
          <div className="text-gray-400 text-sm">Games Optimized</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6 hover:border-gray-600 transition-all">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tweaks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
              className="bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="all">All Games</option>
              {Object.entries(gameNames).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          {(searchTerm || filterGame !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterGame('all');
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-12 text-center">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No History Found</h3>
            <p className="text-gray-500">
              {history.length === 0 
                ? 'Start optimizing games to see your history here!'
                : 'No results match your filters. Try adjusting your search.'}
            </p>
          </div>
        ) : (
          filteredHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all group hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    entry.success ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {entry.success ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-1">{entry.gameName}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {entry.tweaksApplied} tweaks applied
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              {/* Tweaks List */}
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-2">Applied Tweaks:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {entry.tweaksList.map((tweak, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span>{tweak}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}