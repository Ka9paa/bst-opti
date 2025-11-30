import { Logo } from './Logo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export function Navbar({ currentPage, onNavigate, isLoggedIn, onLogout }: NavbarProps) {
  return (
    <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`text-sm transition-colors ${
                    currentPage === 'dashboard' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('landing')}
                  className={`text-sm transition-colors ${
                    currentPage === 'landing' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className={`text-sm transition-colors ${
                    currentPage === 'pricing' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
