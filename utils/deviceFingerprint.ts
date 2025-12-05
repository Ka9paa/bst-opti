// Browser Fingerprinting for HWID-like Device Locking
// Creates a unique device ID based on browser/hardware characteristics

async function getCanvasFingerprint(): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'no-canvas';

  canvas.width = 200;
  canvas.height = 50;

  // Draw text with specific styling
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText('Axira HWID 🔒', 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText('Axira HWID 🔒', 4, 17);

  return canvas.toDataURL();
}

async function getWebGLFingerprint(): Promise<string> {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'no-debug-info';

    const vendor = (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    return `${vendor}~${renderer}`;
  } catch (e) {
    return 'webgl-error';
  }
}

function getScreenFingerprint(): string {
  return `${screen.width}x${screen.height}x${screen.colorDepth}`;
}

function getTimezoneFingerprint(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getPlatformFingerprint(): string {
  return `${navigator.platform}|${navigator.hardwareConcurrency}|${navigator.deviceMemory || 'unknown'}`;
}

// Simple hash function
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 32); // First 32 chars (like HWID format)
}

// Generate unique device fingerprint (HWID equivalent for web)
export async function generateDeviceFingerprint(): Promise<string> {
  try {
    const canvas = await getCanvasFingerprint();
    const webgl = await getWebGLFingerprint();
    const screen = getScreenFingerprint();
    const timezone = getTimezoneFingerprint();
    const platform = getPlatformFingerprint();
    const userAgent = navigator.userAgent;

    const fingerprint = `${canvas}|${webgl}|${screen}|${timezone}|${platform}|${userAgent}`;
    const hash = await hashString(fingerprint);

    console.log('🔒 Device Fingerprint Generated:', hash.substring(0, 8) + '...');
    return hash;
  } catch (error) {
    console.error('Error generating device fingerprint:', error);
    // Fallback to basic fingerprint
    const fallback = `${navigator.userAgent}|${screen.width}x${screen.height}`;
    return await hashString(fallback);
  }
}

// Get user's IP address (approximate)
export async function getUserIP(): Promise<string> {
  try {
    // Use ipify API (free IP lookup)
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'Unknown';
  }
}

// Check if device is authorized
export function isDeviceAuthorized(username: string, currentHWID: string): boolean {
  const savedUsers = localStorage.getItem('optiaxira_users');
  if (!savedUsers) return true; // First time user

  const users = JSON.parse(savedUsers);
  const user = users.find((u: any) => u.username === username);

  if (!user) return true; // New user

  // If user has no HWID set, they're authorized
  if (!user.hwid) return true;

  // Check if HWID matches
  return user.hwid === currentHWID;
}

// Lock user to current device
export function lockUserToDevice(username: string, hwid: string): void {
  const savedUsers = localStorage.getItem('optiaxira_users');
  if (!savedUsers) return;

  const users = JSON.parse(savedUsers);
  const userIndex = users.findIndex((u: any) => u.username === username);

  if (userIndex !== -1) {
    users[userIndex].hwid = hwid;
    users[userIndex].hwidLocked = true;
    localStorage.setItem('optiaxira_users', JSON.stringify(users));
    console.log('🔒 User locked to device:', hwid.substring(0, 8) + '...');
  }
}

// Reset HWID (admin function)
export function resetUserHWID(username: string): void {
  const savedUsers = localStorage.getItem('optiaxira_users');
  if (!savedUsers) return;

  const users = JSON.parse(savedUsers);
  const userIndex = users.findIndex((u: any) => u.username === username);

  if (userIndex !== -1) {
    users[userIndex].hwid = null;
    users[userIndex].hwidLocked = false;
    localStorage.setItem('optiaxira_users', JSON.stringify(users));
    console.log('🔓 User HWID reset:', username);
  }
}
