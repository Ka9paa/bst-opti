import { useState } from 'react';
import { LoginPage } from '../components/LoginPage';
import { GameSelection } from '../components/GameSelection';
import { GameOptimizer } from '../components/GameOptimizer';
import { Toaster } from '../components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packageName, setPackageName] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleLogin = (user: string, packageId: string, pkgName: string) => {
    setUsername(user);
    setSelectedPackage(packageId);
    setPackageName(pkgName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setSelectedPackage(null);
    setPackageName('');
    setSelectedGame(null);
  };

  const handleSelectGame = (game: string) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : selectedGame ? (
        <GameOptimizer game={selectedGame} packageId={selectedPackage!} onBack={handleBackToGames} />
      ) : (
        <GameSelection
          username={username}
          packageName={packageName}
          onSelectGame={handleSelectGame}
          onLogout={handleLogout}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}
