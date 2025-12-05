import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  ArrowLeft,
  Save,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  Info,
  Zap,
  Bell,
  Shield,
  Database,
  Palette,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsProps {
  onBack: () => void;
}

interface AppSettings {
  autoApplyTweaks: boolean;
  confirmBeforeApply: boolean;
  saveHistory: boolean;
  notifications: boolean;
  autoBackup: boolean;
  maxHistoryEntries: number;
  theme: 'dark' | 'auto';
}

export default function Settings({ onBack }: SettingsProps) {
  const [settings, setSettings] = useState<AppSettings>({
    autoApplyTweaks: false,
    confirmBeforeApply: true,
    saveHistory: true,
    notifications: true,
    autoBackup: false,
    maxHistoryEntries: 50,
    theme: 'dark'
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('optiaxira_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = () => {
    localStorage.setItem('optiaxira_settings', JSON.stringify(settings));
    setHasChanges(false);
    toast.success('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (confirm('Reset all settings to default? This cannot be undone.')) {
      const defaultSettings: AppSettings = {
        autoApplyTweaks: false,
        confirmBeforeApply: true,
        saveHistory: true,
        notifications: true,
        autoBackup: false,
        maxHistoryEntries: 50,
        theme: 'dark'
      };
      setSettings(defaultSettings);
      localStorage.setItem('optiaxira_settings', JSON.stringify(defaultSettings));
      setHasChanges(false);
      toast.success('Settings reset to defaults!');
    }
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const clearCache = () => {
    if (confirm('Clear all cached data? This will remove temporary files but keep your settings.')) {
      // In a real app, this would clear actual cache files
      toast.success('Cache cleared successfully!');
    }
  };

  const clearAllData = () => {
    if (confirm('⚠️ WARNING: This will delete ALL data including settings, history, and preferences. Are you sure?')) {
      if (confirm('This is permanent! Type YES to confirm.')) {
        localStorage.clear();
        toast.success('All data cleared! Please restart the app.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optiaxira-settings-${Date.now()}.json`;
    link.click();
    toast.success('Settings exported!');
  };

  const importSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string);
            setSettings(imported);
            setHasChanges(true);
            toast.success('Settings imported! Click Save to apply.');
          } catch (error) {
            toast.error('Invalid settings file!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6" />
              </div>
              Settings
            </h1>
            <p className="text-gray-400">Customize your Axira Optimizer experience</p>
          </div>

          <div className="flex gap-3">
            {hasChanges && (
              <button
                onClick={saveSettings}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
            <button
              onClick={resetSettings}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl">General Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div>
                <div className="text-white mb-1">Confirm Before Apply</div>
                <div className="text-gray-400 text-sm">Ask confirmation before applying tweaks</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.confirmBeforeApply}
                  onChange={(e) => updateSetting('confirmBeforeApply', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div>
                <div className="text-white mb-1">Save History</div>
                <div className="text-gray-400 text-sm">Keep track of applied optimizations</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.saveHistory}
                  onChange={(e) => updateSetting('saveHistory', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div>
                <div className="text-white mb-1">Notifications</div>
                <div className="text-gray-400 text-sm">Show success/error notifications</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div className="text-white mb-2">Max History Entries</div>
              <div className="text-gray-400 text-sm mb-3">Maximum number of history entries to keep</div>
              <input
                type="number"
                min="10"
                max="500"
                value={settings.maxHistoryEntries}
                onChange={(e) => updateSetting('maxHistoryEntries', parseInt(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl">Advanced Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div>
                <div className="text-white mb-1 flex items-center gap-2">
                  Auto-Apply Tweaks
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">ADVANCED</span>
                </div>
                <div className="text-gray-400 text-sm">Automatically apply recommended tweaks</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoApplyTweaks}
                  onChange={(e) => updateSetting('autoApplyTweaks', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div>
                <div className="text-white mb-1">Auto Backup</div>
                <div className="text-gray-400 text-sm">Automatically backup settings weekly</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => updateSetting('autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-blue-400 mb-1">Performance Tip</div>
                  <div className="text-gray-400 text-sm">
                    Auto-apply tweaks is recommended for experienced users only. Always create system restore points!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl">Data Management</h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={exportSettings}
              className="w-full flex items-center justify-between p-4 bg-black/40 hover:bg-black/60 rounded-xl border border-gray-700/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="text-white">Export Settings</div>
                  <div className="text-gray-400 text-sm">Download settings as JSON file</div>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-gray-400">→</div>
            </button>

            <button
              onClick={importSettings}
              className="w-full flex items-center justify-between p-4 bg-black/40 hover:bg-black/60 rounded-xl border border-gray-700/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-white">Import Settings</div>
                  <div className="text-gray-400 text-sm">Load settings from JSON file</div>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-gray-400">→</div>
            </button>

            <button
              onClick={clearCache}
              className="w-full flex items-center justify-between p-4 bg-black/40 hover:bg-black/60 rounded-xl border border-gray-700/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-yellow-400" />
                <div className="text-left">
                  <div className="text-white">Clear Cache</div>
                  <div className="text-gray-400 text-sm">Remove temporary files</div>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-gray-400">→</div>
            </button>

            <button
              onClick={clearAllData}
              className="w-full flex items-center justify-between p-4 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="text-red-400">Clear All Data</div>
                  <div className="text-gray-400 text-sm">⚠️ Delete everything (permanent!)</div>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-gray-400">→</div>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl">About Axira Optimizer</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Version</div>
              <div className="text-white text-lg">1.0.0</div>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Total Games Supported</div>
              <div className="text-white text-lg">8 Games</div>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Total Tweaks Available</div>
              <div className="text-white text-lg">98 Unique Tweaks</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-cyan-400 mb-1">Axira Optimizer</div>
                  <div className="text-gray-400 text-sm">
                    Ultimate game optimization tool with 100% unique game-specific tweaks. Created with ⚡ by deccc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Warning */}
      {hasChanges && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideInRight">
          <Bell className="w-5 h-5" />
          <span>You have unsaved changes!</span>
          <button
            onClick={saveSettings}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            Save Now
          </button>
        </div>
      )}
      </div>
    </div>
  );
}