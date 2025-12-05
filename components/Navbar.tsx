import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (page: 'home' | 'pricing' | 'login' | 'dashboard') => void;
  onScrollToSection?: (section: string) => void;
  isLoggedIn?: boolean;
}

export function Navbar({ onNavigate, onScrollToSection, isLoggedIn }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all"></div>
              <Logo size="md" className="relative z-10" />
            </div>
            <span className="text-white text-xl tracking-tight">Axira Optimizer</span>
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleScrollTo('games')}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105"
            >
              Games
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105"
            >
              Pricing
            </button>
            <button
              onClick={() => handleScrollTo('features')}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105"
            >
              Features
            </button>
            <button
              onClick={() => handleScrollTo('cta')}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 text-sm uppercase tracking-wider"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-5 py-2 text-gray-300 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider border border-white/10 rounded-full hover:border-white/30"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 text-sm uppercase tracking-wider"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <button
              onClick={() => {
                handleScrollTo('games');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2 text-sm uppercase tracking-wider"
            >
              Games
            </button>
            <button
              onClick={() => {
                handleScrollTo('how-it-works');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2 text-sm uppercase tracking-wider"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                onNavigate('pricing');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2 text-sm uppercase tracking-wider"
            >
              Pricing
            </button>
            <button
              onClick={() => {
                handleScrollTo('features');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2 text-sm uppercase tracking-wider"
            >
              Features
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all text-sm uppercase tracking-wider"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all text-sm uppercase tracking-wider"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}