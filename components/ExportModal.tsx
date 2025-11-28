import { X, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: any;
}

export function ExportModal({ isOpen, onClose, settings }: ExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [packName, setPackName] = useState('MyGraphicPack');

  if (!isOpen) return null;

  const generateTimecycleXML = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<timecycle>
  <metadata>
    <name>${packName}</name>
    <author>FiveM Graphic Pack Creator</author>
    <version>1.0</version>
  </metadata>
  
  <weather type="${settings.weather}">
    <intensity>${settings.weatherIntensity}</intensity>
  </weather>
  
  <colorgrading>
    <saturation>${settings.colors.saturation / 100}</saturation>
    <brightness>${settings.colors.brightness / 100}</brightness>
    <contrast>${settings.colors.contrast / 100}</contrast>
    <exposure>${settings.colors.exposure / 100}</exposure>
    <vibrance>${settings.colors.vibrance / 100}</vibrance>
    <gamma>${settings.colors.gamma / 100}</gamma>
    <temperature>${settings.colors.temperature}</temperature>
    <tint>${settings.colors.tint}</tint>
  </colorgrading>
  
  <effects>
    <bloom>${settings.effects.bloom / 100}</bloom>
    <motionblur>${settings.effects.motionBlur / 100}</motionblur>
    <depthoffield>${settings.effects.depthOfField / 100}</depthoffield>
    <vignette>${settings.effects.vignette / 100}</vignette>
    <filmgrain>${settings.effects.filmGrain / 100}</filmgrain>
    <sharpen>${settings.effects.sharpen / 100}</sharpen>
  </effects>
</timecycle>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTimecycleXML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const xml = generateTimecycleXML();
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${packName.toLowerCase().replace(/\s+/g, '_')}_timecycle.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white text-xl">Export Graphic Pack</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Pack Name</label>
            <input
              type="text"
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
              placeholder="Enter pack name..."
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-2">Timecycle XML</label>
            <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto border border-gray-700">
              {generateTimecycleXML()}
            </pre>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-blue-400 text-sm mb-2">Installation Instructions:</div>
            <ol className="text-gray-400 text-xs space-y-1 list-decimal list-inside">
              <li>Place the XML file in your FiveM server resources folder</li>
              <li>Add the resource to your server.cfg</li>
              <li>Restart your server or resource</li>
              <li>Use in-game commands to activate the graphic pack</li>
            </ol>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download XML
          </button>
        </div>
      </div>
    </div>
  );
}
