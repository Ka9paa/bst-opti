import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PricingPage } from './components/PricingPage';
import { LoginPage } from './components/LoginPage';
import { GameSelection } from './components/GameSelection';
import { GameSpecificOptimizer } from './components/GameSpecificOptimizer';
import { AdminPanel } from './components/AdminPanel';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Settings from './components/Settings';
import { Toaster } from 'sonner';
import { clearSession } from './utils/keyauth';

// IMPORTANT: Change this to YOUR username (the owner)
const OWNER_USERNAME = "deccc"; // ✅ Owner username set!

console.log('🚀 App.tsx loaded!');

export default function App() {
  console.log('🎯 App component rendering...');
  const [currentView, setCurrentView] = useState<'landing' | 'pricing' | 'login' | 'app'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packageName, setPackageName] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'games' | 'settings' | 'history'>('dashboard');

  // Check if user has admin access
  const hasAdminAccess = () => {
    // Owner always has access
    if (username.toLowerCase() === OWNER_USERNAME.toLowerCase()) {
      return true;
    }

    // Check admin whitelist
    const adminList = localStorage.getItem('admin_whitelist');
    if (adminList) {
      const admins = JSON.parse(adminList);
      return admins.includes(username.toLowerCase());
    }

    return false;
  };

  const handleNavigate = (page: 'home' | 'pricing' | 'login' | 'dashboard') => {
    if (page === 'home') {
      setCurrentView('landing');
    } else if (page === 'pricing') {
      setCurrentView('pricing');
    } else if (page === 'login') {
      setCurrentView('login');
    } else if (page === 'dashboard' && isLoggedIn) {
      setCurrentView('app');
      setCurrentPage('dashboard');
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add fade out effect
      document.body.style.opacity = '0.7';
      document.body.style.transition = 'opacity 0.3s ease-out';
      
      // Scroll to element
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Fade back in after scroll starts
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 300);
    }
  };

  const handleLogin = (user: string, packageId: string, pkgName: string, key?: string) => {
    setUsername(user);
    setSelectedPackage(packageId);
    setPackageName(pkgName);
    setLicenseKey(key || '');
    setIsLoggedIn(true);
    setCurrentView('app');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setUsername('');
    setSelectedPackage(null);
    setPackageName('');
    setSelectedGame(null);
    setCurrentPage('dashboard');
    setCurrentView('landing');
  };

  const handleSelectGame = (game: string) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setCurrentPage('games');
  };

  const handlePageNavigate = (page: 'games' | 'settings' | 'history') => {
    setCurrentPage(page);
  };

  // Show different views based on currentView
  if (currentView === 'landing') {
    return (
      <>
        <Navbar onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} isLoggedIn={isLoggedIn} />
        <LandingPage onNavigate={handleNavigate} />
        <Toaster />
      </>
    );
  }

  if (currentView === 'pricing') {
    return (
      <>
        <Navbar onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} isLoggedIn={isLoggedIn} />
        <PricingPage onNavigate={handleNavigate} />
        <Toaster />
      </>
    );
  }

  if (currentView === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} onBack={() => setCurrentView('landing')} />
        <Toaster />
      </>
    );
  }

  // App view (after login)
  return (
    <>
      {showAdminPanel && hasAdminAccess() ? (
        <AdminPanel 
          currentUsername={username} 
          onLogout={() => {
            setShowAdminPanel(false);
            handleLogout();
          }} 
        />
      ) : selectedGame ? (
        <GameSpecificOptimizer game={selectedGame} packageId={selectedPackage!} onBack={handleBackToGames} />
      ) : currentPage === 'dashboard' ? (
        <Dashboard 
          username={username}
          licenseKey={licenseKey}
          onNavigate={handlePageNavigate}
        />
      ) : currentPage === 'games' ? (
        <GameSelection
          username={username}
          packageName={packageName}
          onSelectGame={handleSelectGame}
          onLogout={handleLogout}
          hasAdminAccess={hasAdminAccess()}
          onOpenAdminPanel={() => setShowAdminPanel(true)}
          onBackToDashboard={() => setCurrentPage('dashboard')}
        />
      ) : currentPage === 'history' ? (
        <History onBack={() => setCurrentPage('dashboard')} />
      ) : currentPage === 'settings' ? (
        <Settings onBack={() => setCurrentPage('dashboard')} />
      ) : (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl mb-4">Page Not Found</h2>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
}
