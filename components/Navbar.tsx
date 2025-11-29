import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onNavigate, currentPage, isLoggedIn, onLogout }: NavbarProps) {
  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo size="sm" />
            <span className="text-xl font-bold text-white">Axira Optimizer</span>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('landing')}
                  className={`hover:text-blue-400 transition-colors ${
                    currentPage === 'landing' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className={`hover:text-blue-400 transition-colors ${
                    currentPage === 'pricing' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`hover:text-blue-400 transition-colors ${
                    currentPage === 'dashboard' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
