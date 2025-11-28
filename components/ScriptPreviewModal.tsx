import { X, Shield, AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface ScriptPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
  scriptContent: string;
  fileName: string;
  gameName: string;
}

export function ScriptPreviewModal({ 
  isOpen, 
  onClose, 
  onConfirmDownload, 
  scriptContent, 
  fileName,
  gameName 
}: ScriptPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white text-xl">Script Preview</h2>
              <p className="text-gray-400 text-sm">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety Notice */}
        <div className="p-6 border-b border-gray-700 bg-yellow-500/5">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-yellow-400">Windows SmartScreen Warning - This is Normal!</h3>
              <p className="text-gray-300 text-sm">
                When you run this .bat file, Windows Defender or SmartScreen may show a warning. This is normal for ANY .bat file downloaded from the internet, even legitimate ones.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 mt-3 space-y-2">
                <p className="text-white text-sm">How to safely run this file:</p>
                <ol className="text-gray-300 text-sm space-y-1 ml-4 list-decimal">
                  <li>Right-click the downloaded .bat file</li>
                  <li>Select "Run as Administrator"</li>
                  <li>If Windows shows a warning, click "More info" then "Run anyway"</li>
                  <li>Review the script output as it runs</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Script Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-400 mb-1">100% Transparent & Safe</h4>
              <p className="text-gray-300 text-sm">
                Every command in this script is documented below. You can review exactly what it does before running it. 
                This script only modifies Windows settings for {gameName} optimization - no malware, no hidden actions.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-mono">{fileName}</span>
              <span className="text-gray-500 text-xs">{scriptContent.split('\n').length} lines</span>
            </div>
            <div className="p-4 overflow-auto max-h-96">
              <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap break-words">
                {scriptContent}
              </pre>
            </div>
          </div>

          {/* What This Script Does */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              What This Script Does
            </h4>
            <ul className="text-gray-300 text-sm space-y-2 ml-6 list-disc">
              <li>Optimizes Windows power settings for maximum performance</li>
              <li>Disables background services that reduce FPS</li>
              <li>Configures GPU priority for gaming</li>
              <li>Reduces input latency for mouse and keyboard</li>
              <li>Optimizes network settings for online gaming</li>
              <li>Removes unnecessary visual effects</li>
            </ul>
          </div>

          {/* What This Script DOESN'T Do */}
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="text-red-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              What This Script Does NOT Do
            </h4>
            <ul className="text-gray-300 text-sm space-y-2 ml-6 list-disc">
              <li>Does NOT install any software or programs</li>
              <li>Does NOT access the internet or send data</li>
              <li>Does NOT modify game files or inject code</li>
              <li>Does NOT collect personal information</li>
              <li>Does NOT contain viruses, malware, or keyloggers</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Generated by Axira Optimizer - Safe & Transparent</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirmDownload();
                onClose();
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download & Use Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
