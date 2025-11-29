import { Zap, Shield, TrendingUp, Gamepad2, CheckCircle, ArrowRight, Cpu, Download, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Logo } from './Logo';

interface LandingPageProps {
  onNavigate: (page: 'pricing' | 'login') => void;
}

const gameImages = {
  fortnite: 'https://images.unsplash.com/photo-1634309490604-1270c0d486e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGb3J0bml0ZSUyMGxvZ298ZW58MXx8fHwxNzY0MzE4MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  apex: 'https://images.unsplash.com/photo-1690233662564-f599cc764cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcGV4JTIwTGVnZW5kcyUyMGxvZ298ZW58MXx8fHwxNzY0MzE4MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  minecraft: 'https://images.unsplash.com/photo-1660080494538-bc62fbc6a30d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaW5lY3JhZnQlMjBsb2dvfGVufDF8fHx8MTc2NDMxODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  cod: 'https://images.unsplash.com/photo-1654527288084-bce1ee2ccfdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWxsJTIwb2YlMjBEdXR5JTIwbG9nb3xlbnwxfHx8fDE3NjQzMTgzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  csgo: 'https://images.unsplash.com/photo-1579248526464-0923efcca35d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3VudGVyJTIwU3RyaWtlJTIwbG9nb3xlbnwxfHx8fDE3NjQzMTgzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  roblox: 'https://images.unsplash.com/photo-1704244377806-43632e6c338d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSb2Jsb3glMjBsb2dvfGVufDF8fHx8MTc2NDMxODMwNHww&ixlib=rb-4.1.0&q=80&w=1080',
  gta: 'https://images.unsplash.com/photo-1646627927874-be8c13d0ae1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHVEElMjBsb2dvfGVufDF8fHx8MTc2NDMxODMwNHww&ixlib=rb-4.1.0&q=80&w=1080',
  valorant: 'https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJnYnxlbnwxfHx8fDE3NjQwMzE0MzJ8MA&ixlib=rb-4.1.0&q=80&w=400'
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  const featuresAnim = useScrollAnimation();
  const gamesAnim = useScrollAnimation();
  const howItWorksAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-32 h-32 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-2xl animate-pulse"></div>
            <Logo size="xl" className="w-28 h-28 relative z-10" />
          </div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl mb-6 tracking-tight">
            Axira Optimizer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Ultimate Game Optimization Suite
          </p>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Maximize your FPS and minimize input lag across 8 popular games with 98 unique optimization tweaks. Professional-grade performance tuning at your fingertips.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-[1.02] flex items-center gap-2 text-lg group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-500 flex items-center gap-2 text-lg hover:scale-[1.02]"
            >
              View Pricing
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">98</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Unique Tweaks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">8</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Games Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">100%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Safe & Transparent</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={featuresAnim.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              featuresAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl mb-6">Why Axira Optimizer?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional-grade optimization tools designed for competitive gamers and performance enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div 
              className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-700 group hover:scale-[1.02] ${
                featuresAnim.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl mb-4">Maximum FPS</h3>
              <p className="text-gray-400">
                Unlock your system's full potential with optimized power settings, disabled background services, and game-specific configurations.
              </p>
            </div>

            {/* Feature 2 */}
            <div 
              className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-700 group hover:scale-[1.02] ${
                featuresAnim.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl mb-4">100% Safe</h3>
              <p className="text-gray-400">
                Every script is fully documented and transparent. No malware, no hidden actions - just Windows registry tweaks you can review before running.
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-700 group hover:scale-[1.02] ${
                featuresAnim.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl mb-4">Lower Latency</h3>
              <p className="text-gray-400">
                Reduce input lag and network latency with optimized network settings, disabled mouse acceleration, and priority configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Games - Infinite Scroll */}
      <section id="games" className="relative py-32 px-6 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={gamesAnim.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              gamesAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4">New Games and Apps Added Every Day!</p>
            <h2 className="text-5xl md:text-6xl mb-6">Supported Games</h2>
            <p className="text-gray-400 text-lg">
              Optimized configurations for your favorite titles
            </p>
          </div>

          {/* Infinite Scrolling Carousel */}
          <div className={`relative transition-all duration-1000 ${
            gamesAnim.isVisible 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}>
            <div className="overflow-hidden">
              <div className="flex gap-6 animate-scroll">
                {/* First set of games */}
                {[
                  { name: 'Fortnite', image: gameImages.fortnite },
                  { name: 'Apex Legends', image: gameImages.apex },
                  { name: 'Minecraft', image: gameImages.minecraft },
                  { name: 'Call of Duty', image: gameImages.cod },
                  { name: 'CS:GO / CS2', image: gameImages.csgo },
                  { name: 'Valorant', image: gameImages.valorant },
                  { name: 'Roblox', image: gameImages.roblox },
                  { name: 'FiveM (GTA V)', image: gameImages.gta },
                ].map((game, index) => (
                  <div
                    key={`set1-${index}`}
                    className="flex-shrink-0 w-64 h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group relative"
                  >
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl text-white">{game.name}</h3>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { name: 'Fortnite', image: gameImages.fortnite },
                  { name: 'Apex Legends', image: gameImages.apex },
                  { name: 'Minecraft', image: gameImages.minecraft },
                  { name: 'Call of Duty', image: gameImages.cod },
                  { name: 'CS:GO / CS2', image: gameImages.csgo },
                  { name: 'Valorant', image: gameImages.valorant },
                  { name: 'Roblox', image: gameImages.roblox },
                  { name: 'FiveM (GTA V)', image: gameImages.gta },
                ].map((game, index) => (
                  <div
                    key={`set2-${index}`}
                    className="flex-shrink-0 w-64 h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group relative"
                  >
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl text-white">{game.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 text-sm uppercase tracking-wider"
              >
                Check All Games
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div 
            ref={howItWorksAnim.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              howItWorksAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl mb-6">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Simple, transparent, and effective
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Choose Your Game',
                description: 'Select from 8 supported games and configure your optimization preferences.',
                icon: Gamepad2
              },
              {
                step: '02',
                title: 'Review the Script',
                description: 'Preview every command before downloading. All tweaks are documented and explained.',
                icon: Download
              },
              {
                step: '03',
                title: 'Run & Optimize',
                description: 'Download the .bat file, run as administrator, and enjoy boosted performance.',
                icon: Cpu
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`flex gap-6 items-start bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-700 group hover:scale-[1.02] ${
                  howItWorksAnim.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-blue-400 text-sm uppercase tracking-widest mb-2 group-hover:text-cyan-400 transition-colors duration-300">Step {item.step}</div>
                  <h3 className="text-2xl mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={ctaAnim.ref}
            className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/20 transition-all duration-1000 ${
              ctaAnim.isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            <h2 className="text-5xl md:text-6xl mb-6">Ready to Optimize?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of gamers who have unlocked their PC's full potential with Axira Optimizer.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-[1.02] text-lg flex items-center gap-2 mx-auto group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" className="!w-6 !h-6" />
            <span className="text-gray-400">© 2024 Axira Optimizer. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Discord</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Support</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
