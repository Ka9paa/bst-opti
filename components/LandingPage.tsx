import { Zap, Shield, TrendingUp, Users } from 'lucide-react';
import Logo from './Logo';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Logo size="lg" className="mx-auto mb-8" />
          <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Unlock Maximum FPS
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional game optimization tools trusted by thousands of gamers. Boost your performance with our proven optimization scripts.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-16">Why Choose Axira?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="mb-3">Instant Optimization</h3>
              <p className="text-gray-400">
                Apply optimizations in seconds with our one-click scripts.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="mb-3">100% Safe</h3>
              <p className="text-gray-400">
                Preview every change before applying. No malware, no risks.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="mb-3">Proven Results</h3>
              <p className="text-gray-400">
                Average 40% FPS increase across supported games.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="mb-3">10K+ Users</h3>
              <p className="text-gray-400">
                Join thousands of satisfied gamers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Games */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="mb-16">Supported Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Fortnite', 'Valorant', 'CS2', 'Apex Legends', 'Call of Duty', 'Rainbow Six'].map((game) => (
              <div
                key={game}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <p className="text-white">{game}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-blue-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Ready to Dominate?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start optimizing your games today and experience the difference.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Get Access Now
          </button>
        </div>
      </div>
    </div>
  );
}
