import { useState, useEffect } from 'react';
import { Shield, Users, Key, Search, Plus, X, Edit2, Ban, UserCheck, Clock, Package, RefreshCw } from 'lucide-react';

// Admin utilities - these would normally be in a separate file
// For web version, storing in localStorage (in production, use a real backend/database)
const saveKeyNotes = (key: string, notes: string) => {
  const allNotes = getAllKeyNotes();
  allNotes[key] = notes;
  localStorage.setItem('admin_key_notes', JSON.stringify(allNotes));
};

const getKeyNotes = (key: string): string => {
  const allNotes = getAllKeyNotes();
  return allNotes[key] || '';
};

const getAllKeyNotes = (): Record<string, string> => {
  const notes = localStorage.getItem('admin_key_notes');
  return notes ? JSON.parse(notes) : {};
};

const banUser = (username: string) => {
  const banned = JSON.parse(localStorage.getItem('banned_users') || '[]');
  if (!banned.includes(username)) {
    banned.push(username);
    localStorage.setItem('banned_users', JSON.stringify(banned));
  }
};

const unbanUser = (username: string) => {
  const banned = JSON.parse(localStorage.getItem('banned_users') || '[]');
  const filtered = banned.filter((u: string) => u !== username);
  localStorage.setItem('banned_users', JSON.stringify(filtered));
};

const fetchAllUsers = async () => {
  // In web version, return mock data
  // In production, this would call your backend API
  return [];
};

// IMPORTANT: Change this to YOUR username (the owner)
const OWNER_USERNAME = "deccc"; // ✅ Owner username set!

interface KeyData {
  key: string;
  username: string;
  packageTier: string;
  registeredDate: string;
  lastLogin: string;
  notes: string; // Custom notes to identify the real person
  status: 'active' | 'banned';
  hwid?: string;
  ip?: string;
  expiry?: string;
}

interface AdminPanelProps {
  currentUsername: string;
  onLogout: () => void;
}

export function AdminPanel({ currentUsername, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'keys' | 'admins'>('keys');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminList, setAdminList] = useState<string[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const isOwner = currentUsername.toLowerCase() === OWNER_USERNAME.toLowerCase();

  // Load users from KeyAuth on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from KeyAuth API
  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      console.log('🔄 Loading users from KeyAuth...');
      const users = await fetchAllUsers();
      
      console.log('📊 Received users:', users);
      
      if (users.length === 0) {
        setErrorMessage('');
        // Show setup instructions instead
      } else {
        setErrorMessage('');
      }
      
      // Load saved notes from localStorage
      const savedNotes = getAllKeyNotes();
      
      // Merge KeyAuth data with saved notes
      const usersWithNotes = users.map(user => ({
        ...user,
        notes: savedNotes[user.key] || user.notes || ''
      }));
      
      setKeyData(usersWithNotes);
      console.log(`✅ Loaded ${users.length} users from KeyAuth`);
    } catch (error) {
      console.error('❌ Failed to load users:', error);
      setErrorMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  // Load admin list from localStorage
  useEffect(() => {
    const savedAdmins = localStorage.getItem('admin_whitelist');
    if (savedAdmins) {
      setAdminList(JSON.parse(savedAdmins));
    }
  }, []);

  // Save admin list to localStorage
  const saveAdminList = (newList: string[]) => {
    setAdminList(newList);
    localStorage.setItem('admin_whitelist', JSON.stringify(newList));
  };

  // Add admin (owner only)
  const handleAddAdmin = () => {
    if (!isOwner) {
      alert('Only the owner can add admins!');
      return;
    }

    if (!newAdminUsername.trim()) {
      alert('Please enter a username');
      return;
    }

    if (adminList.includes(newAdminUsername.toLowerCase())) {
      alert('This user is already an admin');
      return;
    }

    saveAdminList([...adminList, newAdminUsername.toLowerCase()]);
    setNewAdminUsername('');
    alert(`Added ${newAdminUsername} as admin`);
  };

  // Remove admin (owner only)
  const handleRemoveAdmin = (username: string) => {
    if (!isOwner) {
      alert('Only the owner can remove admins!');
      return;
    }

    if (confirm(`Remove ${username} from admin list?`)) {
      saveAdminList(adminList.filter(admin => admin !== username));
    }
  };

  // Update key notes
  const handleSaveNotes = (key: string) => {
    // Save to localStorage
    saveKeyNotes(key, editNotes);
    
    // Update local state
    setKeyData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, notes: editNotes } : item
      )
    );
    setEditingKey(null);
    setEditNotes('');
    alert('✅ Notes saved successfully!');
  };

  // Ban/Unban user
  const handleToggleBan = (key: string) => {
    setKeyData(prevData =>
      prevData.map(item =>
        item.key === key
          ? { ...item, status: item.status === 'active' ? 'banned' : 'active' }
          : item
      )
    );
  };

  // Filter keys based on search
  const filteredKeys = keyData.filter(
    item =>
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Package tier colors
  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      ELITE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      OCBUNDLE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      FOUNDATION: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      STREAM: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      DUALPC: 'bg-green-500/20 text-green-400 border-green-500/30',
      CPUOC: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      RAMOC: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      CHECKUP: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[tier] || colors.CHECKUP;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-white text-2xl">Admin Panel</h1>
                <p className="text-gray-400 text-sm">
                  {isOwner ? '👑 Owner Access' : '🛡️ Admin Access'} • Logged in as: {currentUsername}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/30"
            >
              Logout
            </button>
          </div>

          {/* Warning if owner username not set */}
          {OWNER_USERNAME === "YOUR_OWNER_USERNAME_HERE" as string && (
            <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">
                ⚠️ <strong>SETUP REQUIRED:</strong> Change OWNER_USERNAME in /components/AdminPanel.tsx to your username!
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('keys')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'keys'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-900/80 text-gray-400 hover:bg-gray-800/80'
            }`}
          >
            <Key className="w-5 h-5" />
            Key Management
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'admins'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-900/80 text-gray-400 hover:bg-gray-800/80'
            }`}
          >
            <Users className="w-5 h-5" />
            Admin Management
            {isOwner && <span className="text-xs bg-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded">Owner Only</span>}
          </button>
        </div>

        {/* Key Management Tab */}
        {activeTab === 'keys' && (
          <div className="space-y-4">
            {/* Search Bar & Stats */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-white text-2xl">{keyData.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Active</p>
                    <p className="text-green-400 text-2xl">{keyData.filter(k => k.status === 'active').length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Banned</p>
                    <p className="text-red-400 text-2xl">{keyData.filter(k => k.status === 'banned').length}</p>
                  </div>
                </div>
                <button
                  onClick={loadUsers}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all border border-blue-500/30 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by key, username, or notes..."
                  className="w-full bg-black/50 border border-blue-500/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Keys List */}
            <div className="space-y-3">
              {isLoading ? (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 text-center">
                  <RefreshCw className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-400">Loading users from KeyAuth...</p>
                </div>
              ) : keyData.length === 0 ? (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/30">
                  <div className="text-center mb-6">
                    <Key className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl mb-2">⚙️ Seller Key Setup Required</h3>
                    <p className="text-gray-400 mb-6">
                      To view all registered users, you need to configure your KeyAuth Seller Key
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-6 text-left space-y-4">
                    <h4 className="text-white flex items-center gap-2">
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      Go to KeyAuth Seller Settings
                    </h4>
                    <p className="text-gray-400 text-sm ml-8">
                      Visit: <a href="https://keyauth.cc/app/?page=seller-settings" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                        https://keyauth.cc/app/?page=seller-settings
                      </a>
                    </p>

                    <h4 className="text-white flex items-center gap-2">
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      Copy Your Seller Key
                    </h4>
                    <p className="text-gray-400 text-sm ml-8">
                      Find the "Seller Key" field (must be exactly 32 characters long)
                    </p>

                    <h4 className="text-white flex items-center gap-2">
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                      Update the Code
                    </h4>
                    <p className="text-gray-400 text-sm ml-8">
                      Open: <code className="bg-black/50 px-2 py-1 rounded text-blue-400">/utils/adminKeyAuth.ts</code>
                    </p>
                    <p className="text-gray-400 text-sm ml-8">
                      Line 15: Replace <code className="bg-black/50 px-2 py-1 rounded text-yellow-400">YOUR_SELLER_KEY_HERE</code>
                    </p>
                    <p className="text-gray-400 text-sm ml-8">
                      With your actual 32-character seller key
                    </p>

                    <h4 className="text-white flex items-center gap-2">
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                      Rebuild the App
                    </h4>
                    <p className="text-gray-400 text-sm ml-8">
                      Run: <code className="bg-black/50 px-2 py-1 rounded text-green-400">AUTO-FIX-AND-BUILD.bat</code>
                    </p>

                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        💡 <strong>Note:</strong> The Seller Key is different from your App Owner ID or API Key. It must come from the Seller Settings page specifically.
                      </p>
                    </div>

                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">
                        ⚠️ <strong>Common Issue:</strong> "Seller key should be 32 characters long" means you're using the wrong key. Make sure to get it from the Seller Settings page, not the main app settings.
                      </p>
                    </div>
                  </div>
                </div>
              ) : filteredKeys.length === 0 ? (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No users match your search</p>
                  <p className="text-gray-500 text-sm mt-2">Try different keywords or clear the search</p>
                </div>
              ) : (
                filteredKeys.map((item) => (
                  <div
                    key={item.key}
                    className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border ${
                      item.status === 'banned' ? 'border-red-500/50' : 'border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Side - Key Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg border text-sm ${getTierColor(item.packageTier)}`}>
                            {item.packageTier}
                          </span>
                          {item.status === 'banned' && (
                            <span className="px-3 py-1 rounded-lg border bg-red-500/20 text-red-400 border-red-500/30 text-sm">
                              🚫 BANNED
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-xs mb-1">License Key</p>
                            <p className="text-white font-mono text-sm">{item.key}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Username</p>
                            <p className="text-white text-sm">{item.username}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Registered</p>
                            <p className="text-white text-sm">{item.registeredDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Last Login</p>
                            <p className="text-white text-sm">{item.lastLogin}</p>
                          </div>
                        </div>

                        {/* Notes Section */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-gray-400 text-xs">Notes (Real Identity)</p>
                            <button
                              onClick={() => {
                                setEditingKey(item.key);
                                setEditNotes(item.notes);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>

                          {editingKey === item.key ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="e.g. John Smith - Discord: john#1234"
                                className="flex-1 bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm"
                              />
                              <button
                                onClick={() => handleSaveNotes(item.key)}
                                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingKey(null)}
                                className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <p className="text-white text-sm bg-black/30 px-3 py-2 rounded-lg">
                              {item.notes || <span className="text-gray-500 italic">No notes added</span>}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleToggleBan(item.key)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            item.status === 'banned'
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                          }`}
                        >
                          {item.status === 'banned' ? (
                            <>
                              <UserCheck className="w-4 h-4 inline mr-1" />
                              Unban
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4 inline mr-1" />
                              Ban
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Admin Management Tab */}
        {activeTab === 'admins' && (
          <div className="space-y-4">
            {!isOwner ? (
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30 text-center">
                <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-white text-xl mb-2">Owner Access Required</h3>
                <p className="text-gray-400">Only the owner can manage admin permissions</p>
              </div>
            ) : (
              <>
                {/* Add Admin */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Admin
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      placeholder="Enter username..."
                      className="flex-1 bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                    />
                    <button
                      onClick={handleAddAdmin}
                      className="px-6 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all border border-green-500/30"
                    >
                      Add Admin
                    </button>
                  </div>
                </div>

                {/* Admin List */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-white text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Current Admins ({adminList.length})
                  </h3>

                  {adminList.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No admins added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {adminList.map((admin) => (
                        <div
                          key={admin}
                          className="flex items-center justify-between bg-black/30 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <span className="text-white">{admin}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveAdmin(admin)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all border border-red-500/30 text-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}