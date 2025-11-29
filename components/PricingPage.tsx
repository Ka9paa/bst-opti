import { Check } from 'lucide-react';

interface PricingPageProps {
  onGetStarted: () => void;
}

export default function PricingPage({ onGetStarted }: PricingPageProps) {
  const plans = [
    {
      name: 'Checkup',
      price: '$4.99',
      period: 'one-time',
      features: [
        'Basic system analysis',
        'Performance report',
        'General recommendations',
        'Discord support',
      ],
      popular: false,
    },
    {
      name: 'Foundation',
      price: '$9.99',
      period: 'month',
      features: [
        'All Checkup features',
        'Basic optimization scripts',
        '5 supported games',
        'Regular updates',
        'Priority support',
      ],
      popular: false,
    },
    {
      name: 'Elite',
      price: '$19.99',
      period: 'month',
      features: [
        'All Foundation features',
        'Advanced optimization scripts',
        'All supported games',
        'Custom tweaks',
        'Early access to new features',
        'VIP Discord support',
        'HWID lock protection',
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect optimization package for your gaming needs. Purchase through our Discord bot.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900 rounded-2xl p-8 border-2 ${
                plan.popular
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onGetStarted}
                className={`w-full py-3 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Discord CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-800">
            <h3 className="mb-4">Purchase through Discord</h3>
            <p className="text-gray-300 mb-6">
              All purchases are handled through our Discord bot. Join our server to get your license key instantly.
            </p>
            <a
              href="https://discord.gg/axira"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Join Discord Server
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="mb-3">How do license keys work?</h3>
              <p className="text-gray-400">
                Each license key is unique and tied to your account. Keys are prefixed with the package name (ELITE-, FOUNDATION-, etc.) and are validated on login.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="mb-3">What is HWID lock?</h3>
              <p className="text-gray-400">
                HWID (Hardware ID) lock prevents account sharing. Your account is locked to your device, ensuring maximum security and preventing unauthorized access.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="mb-3">Can I upgrade my plan?</h3>
              <p className="text-gray-400">
                Yes! Contact us on Discord and we'll help you upgrade to a higher tier package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
