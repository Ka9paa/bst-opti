import { Check } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const plans = [
    {
      name: 'CHECKUP',
      prefix: 'CHECKUP-',
      price: '$4.99',
      period: 'one-time',
      features: [
        'Basic system optimization',
        'Single game support',
        'Standard FPS boost',
        'Email support'
      ]
    },
    {
      name: 'FOUNDATION',
      prefix: 'FOUNDATION-',
      price: '$9.99',
      period: 'one-time',
      popular: true,
      features: [
        'Advanced optimization',
        '5 game profiles',
        'Enhanced FPS boost',
        'Priority support',
        'Regular updates'
      ]
    },
    {
      name: 'ELITE',
      prefix: 'ELITE-',
      price: '$19.99',
      period: 'one-time',
      features: [
        'Premium optimization suite',
        'All games supported',
        'Maximum FPS boost',
        '24/7 VIP support',
        'Instant updates',
        'Custom tweaks',
        'HWID protection'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border transition-all hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open('https://discord.gg/axira', '_blank')}
                className={`w-full py-3 rounded-lg transition-all ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Purchase on Discord
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Already have a license key?</p>
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Login to your account
          </button>
        </div>
      </div>
    </div>
  );
}
