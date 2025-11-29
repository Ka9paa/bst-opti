// TypeScript definitions for Electron API

export interface ElectronAPI {
  // System operations
  applyRegistryTweak: (
    key: string,
    valueName: string,
    type: 'REG_DWORD' | 'REG_SZ' | 'REG_BINARY',
    data: string | number
  ) => Promise<{ success: boolean; output?: string; error?: string }>;

  executePowerShell: (
    command: string
  ) => Promise<{ success: boolean; output?: string; error?: string }>;

  executeBatch: (
    scriptContent: string
  ) => Promise<{ success: boolean; output?: string; error?: string }>;

  // File operations
  saveOptimizationScript: (
    filename: string,
    content: string
  ) => Promise<{ success: boolean; path?: string; error?: string }>;

  openFileLocation: (
    filePath: string
  ) => Promise<{ success: boolean; error?: string }>;

  downloadOptimization: (
    game: string,
    packageType: string
  ) => Promise<{ success: boolean; path?: string; directory?: string; error?: string }>;

  showSaveDialog: (
    defaultPath: string
  ) => Promise<{ success: boolean; filePath?: string; error?: string }>;

  // System info
  getSystemInfo: () => Promise<{
    success: boolean;
    info?: {
      platform: string;
      arch: string;
      cpus: number;
      totalMemory: number;
      freeMemory: number;
      hostname: string;
      version: string;
    };
    error?: string;
  }>;

  checkAdmin: () => Promise<{ isAdmin: boolean }>;

  showAdminPrompt: () => Promise<{ action: number }>;

  // UI helpers
  openExternal: (url: string) => Promise<{ success: boolean; error?: string }>;

  showMessage: (options: {
    type?: 'none' | 'info' | 'error' | 'question' | 'warning';
    title?: string;
    message: string;
    detail?: string;
    buttons?: string[];
  }) => Promise<{ success: boolean; response?: number; error?: string }>;

  // Platform
  platform: string;
  isElectron: boolean;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
