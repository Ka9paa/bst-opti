import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { PricingPage } from './components/PricingPage';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { GameSelection } from './components/GameSelection';

type Page = 'landing' | 'pricing' | 'login' | 'dashboard' | 'game-selection';

interface UserSession {
  username: string;
  licenseKey: string;
  hwid: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<UserSession | null>(null);

  const handleLogin = (username: string, licenseKey: string) => {
    // Mock HWID generation
    const hwid = 'HWID-' + Math.random().toString(36).substring(7);
    
    setUser({
      username,
      licenseKey,
      hwid
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={!!user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentPage === 'login' && <Login onLogin={handleLogin} />}
        {currentPage === 'dashboard' && user && (
          <Dashboard
            username={user.username}
            licenseKey={user.licenseKey}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'game-selection' && user && (
          <GameSelection licenseKey={user.licenseKey} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
