export interface ElectronAPI {
  checkAdminRights: () => Promise<boolean>;
  runOptimization: (type: string, script: string) => Promise<{ success: boolean; output: string }>;
  executePowerShell: (command: string) => Promise<{ success: boolean; output: string; error?: string }>;
  executeBatch: (scriptContent: string) => Promise<{ success: boolean; output: string }>;
  platform: string;
  isElectron: boolean;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {};
