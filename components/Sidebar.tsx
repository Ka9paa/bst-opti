import { 
  Sun, 
  Cloud, 
  Moon, 
  CloudRain,
  CloudFog,
  Lightbulb,
  Zap,
  Palette,
  Circle,
  Eye,
  Mountain,
  Wind,
  Flame
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const weatherSections = [
  { id: 'sky', label: 'Sky Colouring', icon: Sun, color: '#ff8a65' },
  { id: 'clouds', label: 'Main Clouds', icon: Cloud, color: '#64b5f6' },
  { id: 'stars', label: 'Stars / Moon Variables', icon: Moon, color: '#9575cd' },
  { id: 'sun', label: 'Sun Variables', icon: Sun, color: '#ffb74d' },
  { id: 'cloudgen', label: 'Cloud Generation', icon: Cloud, color: '#90a4ae' },
  { id: 'fog', label: 'Fog Variables', icon: CloudFog, color: '#4dd0e1' },
  { id: 'light', label: 'Light Variables', icon: Lightbulb, color: '#ffd54f' },
  { id: 'lightray', label: 'Light Ray Variables', icon: Zap, color: '#ffb74d' },
  { id: 'postfx', label: 'Post FX Variables', icon: Palette, color: '#f06292' },
  { id: 'vignette', label: 'Vignetting Intensity', icon: Circle, color: '#ba68c8' },
  { id: 'gradient', label: 'Colour Gradient Variables', icon: Palette, color: '#4db6ac' },
  { id: 'dof', label: 'Depth of Field Variables', icon: Eye, color: '#7986cb' },
  { id: 'nightvision', label: 'Night Vision Variables', icon: Mountain, color: '#66bb6a' },
  { id: 'heathaze', label: 'Heat Haze Variables', icon: Flame, color: '#ff8a65' }
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-[#0d1117] border-r border-gray-800 overflow-y-auto h-[calc(100vh-64px)]">
      <div className="p-4">
        <h3 className="text-gray-400 text-xs mb-4 tracking-wider uppercase">Weather Parameters</h3>
        
        <div className="space-y-1">
          {weatherSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-orange-900/40 to-transparent border-l-2 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: section.color }} />
                <span className="text-sm">{section.label}</span>
                {activeSection === section.id && (
                  <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
