interface KeyAuthConfig {
  name: string;
  ownerid: string;
  secret: string;
  version: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  info?: {
    username: string;
    subscriptions: Array<{
      subscription: string;
      expiry: string;
      timeleft: number;
    }>;
    hwid: string;
  };
}

class KeyAuth {
  private config: KeyAuthConfig;
  private sessionid: string = '';
  private baseUrl: string = 'https://keyauth.win/api/1.2/';

  constructor(config: KeyAuthConfig) {
    this.config = config;
  }

  async init(): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        type: 'init',
        name: this.config.name,
        ownerid: this.config.ownerid,
        secret: this.config.secret,
        ver: this.config.version,
      }),
    });

    const data = await response.json();
    if (data.success) {
      this.sessionid = data.sessionid;
    } else {
      throw new Error('Failed to initialize KeyAuth');
    }
  }

  async login(username: string, password: string, licenseKey: string): Promise<LoginResponse> {
    if (!this.sessionid) {
      await this.init();
    }

    // Generate HWID from browser fingerprint
    const hwid = await this.generateHWID();

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        type: 'login',
        username: username,
        pass: password,
        hwid: hwid,
        sessionid: this.sessionid,
        name: this.config.name,
        ownerid: this.config.ownerid,
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Validate license key matches
      const hasValidLicense = data.info.subscriptions.some((sub: any) => 
        licenseKey.startsWith(sub.subscription.toUpperCase())
      );

      if (!hasValidLicense) {
        return {
          success: false,
          message: 'License key does not match your account',
        };
      }

      return {
        success: true,
        message: 'Login successful',
        info: data.info,
      };
    }

    return {
      success: false,
      message: data.message || 'Login failed',
    };
  }

  private async generateHWID(): Promise<string> {
    // Generate a browser fingerprint as HWID
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join('|');

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return Math.abs(hash).toString(16);
  }

  getLicenseType(licenseKey: string): string {
    const prefix = licenseKey.split('-')[0].toUpperCase();
    const licenseTypes: { [key: string]: string } = {
      'ELITE': 'Elite Package',
      'FOUNDATION': 'Foundation Package',
      'CHECKUP': 'Checkup Package',
      'PREMIUM': 'Premium Package',
      'STANDARD': 'Standard Package',
    };
    return licenseTypes[prefix] || 'Unknown Package';
  }
}

// Initialize with your KeyAuth credentials
// IMPORTANT: Replace these with your actual KeyAuth credentials
export const keyauth = new KeyAuth({
  name: 'AxiraOptimizer',
  ownerid: 'YOUR_OWNER_ID',
  secret: 'YOUR_APP_SECRET',
  version: '1.0',
});

export default keyauth;
