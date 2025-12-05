// KeyAuth Integration for License Validation
// Documentation: https://keyauth.cc/api/

interface KeyAuthConfig {
  name: string; // Your application name from KeyAuth dashboard
  ownerid: string; // Your owner ID from KeyAuth dashboard
  version: string; // Your application version
}

// Configure your KeyAuth credentials here
// Get these from https://keyauth.cc/app/ - Select your app and copy the code snippet
const KEYAUTH_CONFIG: KeyAuthConfig = {
  name: "OPTIAXIRA",
  ownerid: "RohyrFsC4P",
  version: "1.0",
};

const KEYAUTH_API = "https://keyauth.win/api/1.2/";

// Session management - store session ID to reuse it
let currentSessionId: string | null = null;
let sessionInitTime: number = 0;
const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes - KeyAuth sessions expire

// Check if KeyAuth is configured
function isConfigured(): boolean {
  return (
    KEYAUTH_CONFIG.name.length > 0 &&
    KEYAUTH_CONFIG.ownerid.length > 0 &&
    KEYAUTH_CONFIG.name !== "YOUR_APP_NAME" &&
    KEYAUTH_CONFIG.ownerid !== "YOUR_OWNER_ID"
  );
}

// Package hierarchy: 1 (Best) to 8 (Basic)
const PACKAGE_TIERS: Record<
  string,
  { name: string; tier: number }
> = {
  ELITE: { name: "Elite Package", tier: 1 }, // Best - Full access to everything
  OCBUNDLE: { name: "OC Bundle", tier: 2 }, // Comprehensive overclocking bundle
  FOUNDATION: { name: "Foundation Package", tier: 3 }, // Mid-tier foundation package
  STREAM: { name: "Streaming Package", tier: 4 }, // Streaming optimization
  DUALPC: { name: "Dual PC Package", tier: 5 }, // Dual PC configuration
  CPUOC: { name: "CPU Overclock", tier: 6 }, // CPU overclocking only
  RAMOC: { name: "RAM Overclock", tier: 7 }, // RAM overclocking only
  CHECKUP: { name: "Checkup Package", tier: 8 }, // Basic - PC checkup only
};

interface KeyAuthResponse {
  success: boolean;
  message: string;
  sessionid?: string; // Session ID is here!
  info?: {
    username: string;
    subscriptions: Array<{
      subscription: string;
      key: string;
      expiry: string;
      timeleft: number;
    }>;
    ip: string;
    hwid: string;
    createdate: string;
    lastlogin: string;
  };
}

// Initialize KeyAuth session
async function initSession(): Promise<string> {
  // IMPORTANT: KeyAuth requires a fresh session for each request
  // DO NOT cache sessions - it causes "Session not found" errors
  
  console.log('Creating new KeyAuth session...');
  const formData = new FormData();
  formData.append("type", "init");
  formData.append("name", KEYAUTH_CONFIG.name);
  formData.append("ownerid", KEYAUTH_CONFIG.ownerid);
  formData.append("ver", KEYAUTH_CONFIG.version);

  try {
    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data: KeyAuthResponse = await response.json();
    
    console.log('KeyAuth init response:', data);

    if (data.success) {
      // KeyAuth returns session ID in the 'sessionid' field (NOT 'message')
      const sessionId = data.sessionid || data.message;
      console.log('KeyAuth session created:', sessionId);
      return sessionId;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("KeyAuth init failed:", error);
    throw error;
  }
}

// Clear the current session (call on logout)
export function clearSession(): void {
  console.log('Clearing KeyAuth session');
  currentSessionId = null;
  sessionInitTime = 0;
}

// Login with username, password, and license key
export async function keyAuthLogin(
  username: string,
  password: string,
  licenseKey: string,
): Promise<{
  success: boolean;
  message: string;
  packageType?: string;
  packageName?: string;
  expiryDate?: string;
}> {
  // Check if KeyAuth is configured
  if (!isConfigured()) {
    return {
      success: false,
      message:
        "⚠️ KeyAuth not configured. Please update KEYAUTH_CONFIG in /utils/keyauth.ts with your credentials from https://keyauth.cc/app/",
    };
  }

  try {
    // Initialize session first
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "login");
    formData.append("username", username);
    formData.append("pass", password);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data: KeyAuthResponse = await response.json();

    if (!data.success) {
      // Special handling for session errors
      if (data.message.toLowerCase().includes('session') || 
          data.message.toLowerCase().includes('already open') ||
          data.message.toLowerCase().includes('use latest code')) {
        clearSession(); // Clear the cached session
        return {
          success: false,
          message: data.message + "\n\n💡 Tip: Close all instances of the app and try again. Only one instance can run at a time.",
        };
      }
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    // Validate the license key matches the user's subscription
    if (
      data.info?.subscriptions &&
      data.info.subscriptions.length > 0
    ) {
      // Get the user's active subscription
      const subscription = data.info.subscriptions[0];
      
      // Extract package type from the subscription key (NOT the entered key)
      const subscriptionKey = subscription.key || subscription.subscription;
      const prefix = subscriptionKey.split("-")[0].toUpperCase();
      const packageInfo = PACKAGE_TIERS[prefix];

      return {
        success: true,
        message: "Login successful",
        packageType: prefix,
        packageName: packageInfo?.name || "Standard Package",
        expiryDate: subscription.expiry,
      };
    }

    return {
      success: false,
      message: "No active subscription found",
    };
  } catch (error) {
    console.error("KeyAuth login error:", error);
    return {
      success: false,
      message: "Login failed. Please try again.",
    };
  }
}

// Register new user with license key
export async function keyAuthRegister(
  username: string,
  password: string,
  licenseKey: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  // Check if KeyAuth is configured
  if (!isConfigured()) {
    return {
      success: false,
      message:
        "⚠️ KeyAuth not configured. Please update KEYAUTH_CONFIG in /utils/keyauth.ts with your credentials from https://keyauth.cc/app/",
    };
  }

  try {
    // Initialize session first
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "register");
    formData.append("username", username);
    formData.append("pass", password);
    formData.append("key", licenseKey);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data: KeyAuthResponse = await response.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("KeyAuth register error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
}

// Upgrade/add license to existing user
export async function keyAuthUpgrade(
  username: string,
  licenseKey: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "upgrade");
    formData.append("username", username);
    formData.append("key", licenseKey);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data: KeyAuthResponse = await response.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("KeyAuth upgrade error:", error);
    return {
      success: false,
      message: "Upgrade failed. Please try again.",
    };
  }
}

// Check if license key is valid
export async function keyAuthValidateLicense(
  licenseKey: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "license");
    formData.append("key", licenseKey);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data: KeyAuthResponse = await response.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("KeyAuth license validation error:", error);
    return {
      success: false,
      message: "License validation failed. Please try again.",
    };
  }
}