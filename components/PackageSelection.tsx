import { Check, Cpu, HardDrive, Zap, Monitor, Tv, Trophy } from 'lucide-react';

interface PackageSelectionProps {
  onSelectPackage: (packageId: string) => void;
}

export function PackageSelection({ onSelectPackage }: PackageSelectionProps) {
  const packages = [
    {
      id: 'elite',
      name: 'Elite',
      badge: 'Most Popular',
      icon: Trophy,
      color: 'from-red-500 to-pink-600',
      borderColor: 'border-red-500/50',
      features: [
        'Everything from Foundation Package',
        'Advanced Debloating',
        'Custom Debloated Graphics Drivers',
        'Power Limit Adjustments',
        'Custom Nvidia Settings (+ Hidden)',
        'Full & Hidden BIOS Tweaks'
      ]
    },
    {
      id: 'foundation',
      name: 'Foundation',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/50',
      features: [
        'Improved FPS & Stability',
        'Lower Input Delay',
        'Disable Unnecessary Devices & Services',
        'Disable Windows Telemetry',
        'Lower Processes Count',
        'Custom Laptop Software'
      ]
    },
    {
      id: 'checkup',
      name: 'PC Checkup',
      icon: Monitor,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50',
      features: [
        'Updated Windows Accidentally',
        'Mistakenly Updated GPU Driver',
        'Fix Anything Interfering With Tweaks'
      ]
    },
    {
      id: 'oc-bundle',
      name: 'OC Bundle',
      icon: Cpu,
      color: 'from-violet-500 to-purple-600',
      borderColor: 'border-violet-500/50',
      features: [
        'Full CPU Overclocking',
        'Advanced RAM Tuning',
        'Comprehensive GPU Overclock',
        'Stability and Temperature Optimization'
      ]
    },
    {
      id: 'ram-oc',
      name: 'RAM Overclock',
      icon: HardDrive,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50',
      features: [
        'RAM Frequency Enhancement',
        'Optimized Memory Timings',
        'Stability & Compatibility Assurance'
      ]
    },
    {
      id: 'cpu-oc',
      name: 'CPU Overclock',
      icon: Cpu,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/50',
      features: [
        'Targeted CPU Performance Boost',
        'Thermal Management Optimization',
        'Enhanced System Responsiveness'
      ]
    },
    {
      id: 'stream-setup',
      name: 'Stream Setup',
      icon: Tv,
      color: 'from-teal-500 to-green-500',
      borderColor: 'border-teal-500/50',
      features: [
        'Optimized Output Settings (Encoder)',
        'Audio Setup (Background Noise Removal)',
        'Remove Music from VOD',
        'Basic Mixer Setup'
      ]
    },
    {
      id: 'dual-pc',
      name: 'Dual PC Setup',
      icon: Monitor,
      color: 'from-indigo-500 to-blue-500',
      borderColor: 'border-indigo-500/50',
      features: [
        'Optimized Output Settings (Encoder)',
        'Audio Setup (Background Noise Removal)',
        'Remove Music from VOD',
        'Advanced Mixer Setup (Can Be Virtual)',
        'Routing Both PCs Into Headphones',
        'Capture Card/NDI Setup'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl mb-4">Select Your Optimization Package</h1>
          <p className="text-gray-300 text-xl">Choose the package that matches your license key</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`bg-gray-800/40 backdrop-blur-xl rounded-2xl border-2 ${pkg.borderColor} p-6 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
                onClick={() => onSelectPackage(pkg.id)}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {pkg.badge}
                  </div>
                )}
                
                <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-white text-2xl mb-4">{pkg.name}</h3>

                <div className="space-y-3 mb-6">
                  <p className="text-gray-400 text-sm mb-3">Features</p>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-3 rounded-lg hover:shadow-lg transition-all group-hover:shadow-xl`}>
                  Select Package
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
