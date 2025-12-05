import { Download, Save, Upload, Eye, Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#1a2332] border-b border-gray-800">
      <div className="max-w-full px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2a3441] rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white text-lg">Live Preview</h1>
                <p className="text-gray-400 text-xs">Real-time 1:1 RGB Accurate Rendering</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg text-sm group">
              <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Import
            </button>
            <button className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg text-sm group">
              <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Save
            </button>
            <button className="px-5 py-2 bg-transparent border-2 border-white/20 hover:border-white/40 text-white rounded-lg flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg text-sm group">
              <Activity className="w-4 h-4 group-hover:animate-pulse" />
              Play 24h
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
