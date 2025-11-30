import { Zap, Shield, TrendingUp, Download } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Unlock Maximum FPS
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional game optimization tool trusted by thousands of gamers. Boost your performance across all popular titles.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg transition-all backdrop-blur-sm"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-white">Why Choose Axira?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-white mb-3">Instant Performance</h3>
              <p className="text-gray-400">
                Optimized scripts that deliver immediate FPS improvements with one click
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-white mb-3">100% Safe</h3>
              <p className="text-gray-400">
                Preview scripts before download. No malware, no hidden code, complete transparency
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-white mb-3">Multi-Game Support</h3>
              <p className="text-gray-400">
                Optimizations for Fortnite, Valorant, Apex Legends, CS2, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl p-12 border border-blue-500/30">
          <Download className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-white mb-4">Ready to Boost Your Performance?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of gamers who've already upgraded their experience
          </p>
          <button
            onClick={() => onNavigate('pricing')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg transition-all hover:scale-105 shadow-xl shadow-blue-500/50"
          >
            View Pricing
          </button>
        </div>
      </section>
    </div>
  );
}
