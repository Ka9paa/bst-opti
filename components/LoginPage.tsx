import { useState } from 'react';
import { User, Lock, Key, Loader2 } from 'lucide-react';
import { keyAuthLogin, keyAuthRegister } from '../utils/keyauth';
import { generateDeviceFingerprint, getUserIP, isDeviceAuthorized, lockUserToDevice } from '../utils/deviceFingerprint';
import { Logo } from './Logo';

interface LoginPageProps {
  onLogin: (username: string, packageId: string, packageName: string, key?: string) => void;
  onBack?: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Generate device fingerprint (HWID for web)
      const hwid = await generateDeviceFingerprint();
      const ip = await getUserIP();

      if (isSignUp) {
        // Register new user - requires license key
        const result = await keyAuthRegister(username, password, licenseKey);
        if (result.success) {
          // Save user registration data for admin panel
          const userData = {
            key: licenseKey,
            username: username,
            password: password, // Store for admin visibility (KeyAuth still handles auth)
            packageTier: licenseKey.split('-')[0].toUpperCase(),
            registeredDate: new Date().toLocaleDateString(),
            lastLogin: 'Never',
            notes: '',
            status: 'active' as const,
            expiryDate: 'Unknown',
            hwid: hwid, // Lock to this device
            hwidLocked: true,
            lastIP: ip,
            loginAttempts: [],
            totalLogins: 0
          };

          // Get existing users
          const savedUsers = localStorage.getItem('optiaxira_users');
          const users = savedUsers ? JSON.parse(savedUsers) : [];
          
          // Add new user
          users.push(userData);
          
          // Save back to localStorage
          localStorage.setItem('optiaxira_users', JSON.stringify(users));

          alert('Account created successfully! Please login.');
          setIsSignUp(false);
          setPassword('');
          setLicenseKey('');
        } else {
          setErrorMessage(result.message);
        }
      } else {
        // Check HWID before allowing login
        const savedUsers = localStorage.getItem('optiaxira_users');
        if (savedUsers) {
          const users = JSON.parse(savedUsers);
          const existingUser = users.find((u: any) => u.username === username);
          
          // If user exists and has HWID lock enabled
          if (existingUser && existingUser.hwidLocked && existingUser.hwid) {
            if (existingUser.hwid !== hwid) {
              // HWID MISMATCH - BLOCK LOGIN
              const userIndex = users.findIndex((u: any) => u.username === username);
              if (userIndex !== -1) {
                if (!users[userIndex].loginAttempts) users[userIndex].loginAttempts = [];
                users[userIndex].loginAttempts.push({
                  timestamp: new Date().toLocaleString(),
                  status: '🚫 HWID MISMATCH - BLOCKED',
                  ip: ip,
                  hwid: hwid.substring(0, 8) + '...',
                  expectedHwid: existingUser.hwid.substring(0, 8) + '...'
                });
                localStorage.setItem('optiaxira_users', JSON.stringify(users));
              }
              
              setErrorMessage(`🚫 ACCOUNT LOCKED!\n\nThis account is locked to a different device.\n\nYour HWID: ${hwid.substring(0, 12)}...\nAuthorized HWID: ${existingUser.hwid.substring(0, 12)}...\n\nContact admin to reset your HWID.`);
              setIsLoading(false);
              return;
            }
          }
        }

        // Login existing user - no license key needed
        const result = await keyAuthLogin(username, password, licenseKey);
        if (result.success && result.packageType && result.packageName) {
          // Get existing users
          const savedUsers = localStorage.getItem('optiaxira_users');
          const users = savedUsers ? JSON.parse(savedUsers) : [];

          // Check if user already exists
          const existingUserIndex = users.findIndex((u: any) => u.username === username);
          
          if (existingUserIndex !== -1) {
            // Update existing user's last login
            users[existingUserIndex].lastLogin = new Date().toLocaleString();
            users[existingUserIndex].password = password; // Update password in case they changed it
            users[existingUserIndex].packageTier = result.packageType;
            users[existingUserIndex].expiryDate = result.expiryDate;
            users[existingUserIndex].lastIP = ip;
            users[existingUserIndex].totalLogins = (users[existingUserIndex].totalLogins || 0) + 1;
            
            // Log successful login attempt
            if (!users[existingUserIndex].loginAttempts) users[existingUserIndex].loginAttempts = [];
            users[existingUserIndex].loginAttempts.push({
              timestamp: new Date().toLocaleString(),
              status: 'Success',
              ip: ip,
              hwid: hwid.substring(0, 8) + '...'
            });

            // Keep only last 10 login attempts
            if (users[existingUserIndex].loginAttempts.length > 10) {
              users[existingUserIndex].loginAttempts = users[existingUserIndex].loginAttempts.slice(-10);
            }

            // Lock to device if not already locked
            if (!users[existingUserIndex].hwid) {
              users[existingUserIndex].hwid = hwid;
              users[existingUserIndex].hwidLocked = true;
            }
          } else {
            // Add new user
            const userData = {
              key: licenseKey || 'N/A',
              username: username,
              password: password, // Store for admin visibility
              packageTier: result.packageType,
              registeredDate: new Date().toLocaleDateString(),
              lastLogin: new Date().toLocaleString(),
              notes: '',
              status: 'active' as const,
              expiryDate: result.expiryDate,
              hwid: hwid,
              hwidLocked: true,
              lastIP: ip,
              loginAttempts: [{
                timestamp: new Date().toLocaleString(),
                status: 'Success',
                ip: ip,
                hwid: hwid.substring(0, 8) + '...'
              }],
              totalLogins: 1
            };
            users.push(userData);
          }

          // Save back to localStorage
          localStorage.setItem('optiaxira_users', JSON.stringify(users));

          onLogin(username, result.packageType, result.packageName, licenseKey);
        } else {
          // Log failed login attempt
          const savedUsers = localStorage.getItem('optiaxira_users');
          if (savedUsers) {
            const users = JSON.parse(savedUsers);
            const userIndex = users.findIndex((u: any) => u.username === username);
            if (userIndex !== -1) {
              if (!users[userIndex].loginAttempts) users[userIndex].loginAttempts = [];
              users[userIndex].loginAttempts.push({
                timestamp: new Date().toLocaleString(),
                status: 'Failed - Wrong Password',
                ip: ip,
                hwid: hwid.substring(0, 8) + '...'
              });
              localStorage.setItem('optiaxira_users', JSON.stringify(users));
            }
          }
          
          setErrorMessage(result.message);
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/5 backdrop-blur-xl text-white rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-32 h-32 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <div className="relative z-10 w-24 h-24 flex items-center justify-center">
              <Logo size="xl" className="!w-24 !h-24 drop-shadow-2xl" />
            </div>
          </div>
          <h1 className="text-white text-5xl mb-3 tracking-tight">Axira Optimizer</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">Performance Optimization Suite</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-8 border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-500">
          <div className="flex gap-1 mb-8 bg-white/5 p-1 rounded-lg">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-md transition-all duration-300 ${
                !isSignUp
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-md transition-all duration-300 ${
                isSignUp
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-300 text-xs uppercase tracking-wider block mb-2">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-xs uppercase tracking-wider block mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Only show license key field for Sign Up */}
            {isSignUp && (
              <div>
                <label className="text-gray-300 text-xs uppercase tracking-wider block mb-2">License Key</label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="ELITE-XXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all uppercase"
                    required
                  />
                </div>
                <p className="text-gray-400 text-xs mt-2">Purchase your license key from our Discord bot</p>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                  <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5" />
                  Remember me
                </label>
                <a href="#" className="text-blue-400 hover:text-cyan-400 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Login to Axira Optimizer'
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm text-center whitespace-pre-line">{errorMessage}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-center text-gray-500 text-xs">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 hover:text-cyan-400 transition-colors"
              >
                {isSignUp ? 'Login here' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>

        {/* HWID Lock Info */}
        <div className="mt-6 bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-400 text-xs">🔒 HWID Lock Protection Active</p>
          </div>
          <p className="text-gray-500 text-xs">
            Your account will be locked to this device. Login from other devices will be blocked for security.
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}