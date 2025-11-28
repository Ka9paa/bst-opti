// License key validation and package detection
export interface LicenseInfo {
  isValid: boolean;
  packageId: string | null;
  packageName: string | null;
  packageTier: number | null;
  error?: string;
}

// Package hierarchy: 1 (Best) to 8 (Basic)
const packagePrefixes: { [key: string]: { id: string; name: string; tier: number } } = {
  'ELITE': { id: 'elite', name: 'Elite', tier: 1 },           // Best - Full access to everything
  'OCBUNDLE': { id: 'oc-bundle', name: 'OC Bundle', tier: 2 }, // Comprehensive overclocking bundle
  'FOUNDATION': { id: 'foundation', name: 'Foundation', tier: 3 }, // Mid-tier foundation package
  'STREAM': { id: 'stream-setup', name: 'Stream Setup', tier: 4 }, // Streaming optimization
  'DUALPC': { id: 'dual-pc', name: 'Dual PC Setup', tier: 5 },    // Dual PC configuration
  'CPUOC': { id: 'cpu-oc', name: 'CPU Overclock', tier: 6 },      // CPU overclocking only
  'RAMOC': { id: 'ram-oc', name: 'RAM Overclock', tier: 7 },      // RAM overclocking only
  'CHECKUP': { id: 'checkup', name: 'PC Checkup', tier: 8 }       // Basic - PC checkup only
};

export const validateLicenseKey = (key: string): LicenseInfo => {
  if (!key || key.trim().length === 0) {
    return {
      isValid: false,
      packageId: null,
      packageName: null,
      packageTier: null,
      error: 'License key is required'
    };
  }

  // Remove whitespace and convert to uppercase
  const cleanKey = key.trim().toUpperCase();

  // Check if key contains a dash separator
  if (!cleanKey.includes('-')) {
    return {
      isValid: false,
      packageId: null,
      packageName: null,
      packageTier: null,
      error: 'Invalid license key format. Expected format: PREFIX-XXXXX'
    };
  }

  // Extract prefix (everything before first dash)
  const prefix = cleanKey.split('-')[0];
  const keyCode = cleanKey.split('-').slice(1).join('-');

  // Validate prefix exists in our package list
  if (!packagePrefixes[prefix]) {
    return {
      isValid: false,
      packageId: null,
      packageName: null,
      packageTier: null,
      error: `Invalid license key prefix: ${prefix}`
    };
  }

  // Validate key code has minimum length
  if (keyCode.length < 8) {
    return {
      isValid: false,
      packageId: null,
      packageName: null,
      packageTier: null,
      error: 'Invalid license key code length'
    };
  }

  // Key is valid
  const packageInfo = packagePrefixes[prefix];
  return {
    isValid: true,
    packageId: packageInfo.id,
    packageName: packageInfo.name,
    packageTier: packageInfo.tier
  };
};

// Get package info from license key
export const getPackageFromKey = (key: string): string | null => {
  const validation = validateLicenseKey(key);
  return validation.isValid ? validation.packageId : null;
};

// Check if a key is valid for a specific package
export const isKeyValidForPackage = (key: string, packageId: string): boolean => {
  const validation = validateLicenseKey(key);
  return validation.isValid && validation.packageId === packageId;
};