import { Check, ArrowLeft, Zap, Star, Crown } from 'lucide-react';
import { Logo } from './Logo';
import { Snowflakes } from './Snowflakes';

interface PricingPageProps {
  onNavigate: (page: 'home' | 'login') => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Snowflakes />
      
      {/* CHRISTMAS BANNER */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 py-6 text-center animate-pulse z-[100] shadow-2xl shadow-blue-500/50">
        <p className="text-3xl">🎅 MERRY CHRISTMAS! HAPPY HOLIDAYS! 🎄 SPECIAL FESTIVE EDITION! ❄️</p>
      </div>
      
      <div className="pt-20">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl mb-6">Choose Your Plan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              One-time payment. Lifetime access. No subscriptions.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-500 hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/20'
                    : 'border-white/10 hover:border-cyan-400/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs uppercase tracking-wider">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} bg-opacity-20 rounded-xl flex items-center justify-center mb-6`}>
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => onNavigate('login')}
                  className={`w-full py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-xl mb-3">How do I purchase a license?</h3>
                <p className="text-gray-400">
                  Purchase your license key through our Discord bot. Once purchased, you'll receive a key with the format {'{'}PACKAGE{'}'}-XXXXXXXX that you can use to create your account.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-xl mb-3">Is this safe to use?</h3>
                <p className="text-gray-400">
                  Absolutely! Every optimization script is fully documented and transparent. We only modify Windows registry settings - no malware, no hidden code. You can review every command before running it.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-xl mb-3">Can I upgrade my plan later?</h3>
                <p className="text-gray-400">
                  Yes! Contact our Discord support and we can help you upgrade to a higher tier. You'll only pay the difference.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h3 className="text-xl mb-3">What if I need help?</h3>
                <p className="text-gray-400">
                  All plans include Discord support. ELITE users get priority support. Join our Discord server for help, guides, and community tips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: 'CHECKUP',
    prefix: 'CHECKUP-',
    price: '$4.99',
    period: 'one-time',
    description: 'Perfect for trying out basic optimizations',
    icon: Star,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Basic Windows Optimizations',
      '1 Game Configuration',
      'Power Plan Optimization',
      'Network Tweaks',
      'Visual Effects Reduction'
    ]
  },
  {
    name: 'FOUNDATION',
    prefix: 'FOUNDATION-',
    price: '$9.99',
    period: 'one-time',
    description: 'Great for casual gamers looking for more',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    features: [
      'All CHECKUP features',
      'Up to 4 Games',
      'Advanced GPU Settings',
      'Input Lag Reduction',
      'Background Service Management',
      'NVIDIA Control Panel Guide',
      'Discord Support'
    ]
  },
  {
    name: 'ELITE',
    prefix: 'ELITE-',
    price: '$19.99',
    period: 'one-time',
    description: 'Ultimate package for competitive gamers',
    icon: Crown,
    color: 'from-yellow-500 to-orange-500',
    features: [
      'All FOUNDATION features',
      'All 8 Games Unlocked',
      'Advanced System Tweaks',
      'CPU Mitigation Disabling',
      'Memory Compression Control',
      'MSI Mode Configuration',
      'Priority Discord Support',
      'Lifetime Updates',
      '98 Unique Optimizations'
    ]
  }
];