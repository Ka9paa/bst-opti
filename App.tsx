import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GameSelection from './components/GameSelection';

type Page = 'landing' | 'pricing' | 'login' | 'dashboard' | 'game-selection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [licenseType, setLicenseType] = useState('');

  const handleLoginSuccess = (user: string, license: string) => {
    setUsername(user);
    setLicenseType(license);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setLicenseType('');
    setCurrentPage('landing');
  };

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'pricing':
        return <PricingPage onGetStarted={handleGetStarted} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return (
          <Dashboard
            username={username}
            licenseType={licenseType}
            onSelectGame={() => setCurrentPage('game-selection')}
          />
        );
      case 'game-selection':
        return (
          <GameSelection
            licenseType={licenseType}
            onBack={() => setCurrentPage('dashboard')}
          />
        );
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onNavigate={(page) => setCurrentPage(page as Page)}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderPage()}</main>
      {!isLoggedIn && <Footer />}
    </div>
  );
}
