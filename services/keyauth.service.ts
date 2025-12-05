/**
 * KeyAuth Integration Service
 * Handles license validation and user authentication
 */

interface KeyAuthResponse {
  success: boolean;
  message?: string;
  sessionid?: string;
  info?: {
    subscriptions?: Array<{
      key: string;
      expiry: string;
    }>;
  };
}

interface LoginResult {
  success: boolean;
  message: string;
  package_type?: string;
  package_name?: string;
  package_tier?: number;
  expiry?: string;
  username?: string;
}

interface RegisterResult {
  success: boolean;
  message: string;
}

interface ValidateResult {
  success: boolean;
  message: string;
}

export class KeyAuthService {
  // KeyAuth Configuration
  private static readonly APP_NAME = "OPTIAXIRA";
  private static readonly OWNER_ID = "RohyrFsC4P";
  private static readonly APP_VERSION = "1.0";
  private static readonly API_URL = "https://keyauth.win/api/1.2/";

  // Package tier mapping
  private static readonly PACKAGE_TIERS: Record<string, { name: string; tier: number }> = {
    ELITE: { name: "Elite Package", tier: 1 },
    OCBUNDLE: { name: "OC Bundle", tier: 2 },
    FOUNDATION: { name: "Foundation Package", tier: 3 },
    STREAM: { name: "Streaming Package", tier: 4 },
    DUALPC: { name: "Dual PC Package", tier: 5 },
    CPUOC: { name: "CPU Overclock", tier: 6 },
    RAMOC: { name: "RAM Overclock", tier: 7 },
    CHECKUP: { name: "Checkup Package", tier: 8 },
  };

  private sessionId: string | null = null;

  /**
   * Initialize a new KeyAuth session
   */
  private async initSession(): Promise<boolean> {
    try {
      const payload = new URLSearchParams({
        type: "init",
        name: KeyAuthService.APP_NAME,
        ownerid: KeyAuthService.OWNER_ID,
        ver: KeyAuthService.APP_VERSION,
      });

      const response = await fetch(KeyAuthService.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      const data: KeyAuthResponse = await response.json();

      if (data.success) {
        this.sessionId = data.sessionid || data.message || null;
        return true;
      } else {
        console.error(`KeyAuth init failed: ${data.message}`);
        return false;
      }
    } catch (error) {
      console.error(`KeyAuth init error:`, error);
      return false;
    }
  }

  /**
   * Authenticate user with KeyAuth
   */
  async login(username: string, password: string, licenseKey: string): Promise<LoginResult> {
    // Initialize session
    if (!(await this.initSession())) {
      return {
        success: false,
        message: "Failed to connect to KeyAuth server",
      };
    }

    try {
      const payload = new URLSearchParams({
        type: "login",
        username,
        pass: password,
        sessionid: this.sessionId!,
        name: KeyAuthService.APP_NAME,
        ownerid: KeyAuthService.OWNER_ID,
      });

      const response = await fetch(KeyAuthService.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      const data: KeyAuthResponse = await response.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      // Validate license key
      const info = data.info || {};
      const subscriptions = info.subscriptions || [];

      if (subscriptions.length === 0) {
        return {
          success: false,
          message: "No active subscription found",
        };
      }

      // Check if license key matches
      const subscription = subscriptions[0];
      if (subscription.key.toUpperCase() !== licenseKey.toUpperCase()) {
        return {
          success: false,
          message: "License key does not match your account",
        };
      }

      // Extract package type from key prefix
      const packagePrefix = licenseKey.split("-")[0].toUpperCase();
      const packageInfo = KeyAuthService.PACKAGE_TIERS[packagePrefix] || {
        name: "Standard Package",
        tier: 99,
      };

      return {
        success: true,
        message: "Login successful",
        package_type: packagePrefix,
        package_name: packageInfo.name,
        package_tier: packageInfo.tier,
        expiry: subscription.expiry,
        username,
      };
    } catch (error) {
      console.error(`Login error:`, error);
      return {
        success: false,
        message: `Login error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Register new user with KeyAuth
   */
  async register(username: string, password: string, licenseKey: string): Promise<RegisterResult> {
    // Initialize session
    if (!(await this.initSession())) {
      return {
        success: false,
        message: "Failed to connect to KeyAuth server",
      };
    }

    try {
      const payload = new URLSearchParams({
        type: "register",
        username,
        pass: password,
        key: licenseKey,
        sessionid: this.sessionId!,
        name: KeyAuthService.APP_NAME,
        ownerid: KeyAuthService.OWNER_ID,
      });

      const response = await fetch(KeyAuthService.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      const data: KeyAuthResponse = await response.json();

      return {
        success: data.success || false,
        message: data.message || "Registration failed",
      };
    } catch (error) {
      console.error(`Registration error:`, error);
      return {
        success: false,
        message: `Registration error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Validate a license key
   */
  async validateLicense(licenseKey: string): Promise<ValidateResult> {
    if (!(await this.initSession())) {
      return {
        success: false,
        message: "Failed to connect to KeyAuth server",
      };
    }

    try {
      const payload = new URLSearchParams({
        type: "license",
        key: licenseKey,
        sessionid: this.sessionId!,
        name: KeyAuthService.APP_NAME,
        ownerid: KeyAuthService.OWNER_ID,
      });

      const response = await fetch(KeyAuthService.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      const data: KeyAuthResponse = await response.json();

      return {
        success: data.success || false,
        message: data.message || "Validation failed",
      };
    } catch (error) {
      console.error(`License validation error:`, error);
      return {
        success: false,
        message: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }
}
