/**
 * Electron-specific optimization utilities
 * These functions use the Electron API to perform real system tweaks
 */

export const isElectronApp = (): boolean => {
  return typeof window !== 'undefined' && window.electronAPI?.isElectron === true;
};

export const checkAdminRights = async (): Promise<boolean> => {
  if (!isElectronApp()) return false;
  
  try {
    const result = await window.electronAPI!.checkAdmin();
    return result.isAdmin;
  } catch (error) {
    console.error('Failed to check admin rights:', error);
    return false;
  }
};

export const promptAdminRights = async (): Promise<void> => {
  if (!isElectronApp()) return;
  
  try {
    await window.electronAPI!.showAdminPrompt();
  } catch (error) {
    console.error('Failed to show admin prompt:', error);
  }
};

export const getSystemInfo = async () => {
  if (!isElectronApp()) return null;
  
  try {
    const result = await window.electronAPI!.getSystemInfo();
    return result.success ? result.info : null;
  } catch (error) {
    console.error('Failed to get system info:', error);
    return null;
  }
};

export const applyOptimization = async (
  game: string,
  packageType: string,
  scriptContent: string
): Promise<{ success: boolean; path?: string; error?: string }> => {
  if (!isElectronApp()) {
    // Fallback to download for web version
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game.replace(/\s+/g, '_')}_${packageType}_optimization.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return { success: true };
  }
  
  try {
    // Check admin rights first
    const isAdmin = await checkAdminRights();
    
    if (!isAdmin) {
      const result = await window.electronAPI!.showMessage({
        type: 'warning',
        title: 'Administrator Rights Required',
        message: 'To apply optimizations automatically, this app needs Administrator privileges.',
        detail: 'Would you like to save the optimization script to run manually instead?',
        buttons: ['Save Script', 'Cancel']
      });
      
      if (!result.success || result.response === 1) {
        return { success: false, error: 'Admin rights required' };
      }
    }
    
    // Save the script
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `${game.replace(/\s+/g, '_')}_${packageType}_${timestamp}.bat`;
    
    const saveResult = await window.electronAPI!.saveOptimizationScript(filename, scriptContent);
    
    if (!saveResult.success) {
      return { success: false, error: saveResult.error };
    }
    
    // Ask user if they want to run it now or just save
    if (isAdmin) {
      const runResult = await window.electronAPI!.showMessage({
        type: 'question',
        title: 'Optimization Ready',
        message: `Optimization script created for ${game}!`,
        detail: `Do you want to run it now or save it for later?\n\nSaved to: ${saveResult.path}`,
        buttons: ['Run Now', 'Just Save', 'Open Location']
      });
      
      if (runResult.success) {
        if (runResult.response === 0) {
          // Run the script
          const execResult = await window.electronAPI!.executeBatch(scriptContent);
          
          if (execResult.success) {
            await window.electronAPI!.showMessage({
              type: 'info',
              title: 'Success',
              message: 'Optimizations applied successfully!',
              detail: 'Please restart your computer for all changes to take effect.'
            });
          } else {
            return { success: false, error: execResult.error };
          }
        } else if (runResult.response === 2) {
          // Open file location
          await window.electronAPI!.openFileLocation(saveResult.path!);
        }
      }
    } else {
      // Just show success message
      const result = await window.electronAPI!.showMessage({
        type: 'info',
        title: 'Script Saved',
        message: `Optimization script saved successfully!`,
        detail: `Location: ${saveResult.path}\n\nRight-click the file and select "Run as Administrator" to apply optimizations.`,
        buttons: ['Open Location', 'OK']
      });
      
      if (result.success && result.response === 0) {
        await window.electronAPI!.openFileLocation(saveResult.path!);
      }
    }
    
    return { success: true, path: saveResult.path };
  } catch (error) {
    console.error('Failed to apply optimization:', error);
    return { success: false, error: String(error) };
  }
};

export const openExternalLink = async (url: string): Promise<void> => {
  if (!isElectronApp()) {
    window.open(url, '_blank');
    return;
  }
  
  try {
    await window.electronAPI!.openExternal(url);
  } catch (error) {
    console.error('Failed to open external link:', error);
    window.open(url, '_blank');
  }
};

export const showSuccessMessage = async (
  title: string,
  message: string,
  detail?: string
): Promise<void> => {
  if (!isElectronApp()) {
    alert(`${title}\n\n${message}${detail ? '\n\n' + detail : ''}`);
    return;
  }
  
  try {
    await window.electronAPI!.showMessage({
      type: 'info',
      title,
      message,
      detail
    });
  } catch (error) {
    console.error('Failed to show message:', error);
  }
};

export const showErrorMessage = async (
  title: string,
  message: string,
  detail?: string
): Promise<void> => {
  if (!isElectronApp()) {
    alert(`${title}\n\n${message}${detail ? '\n\n' + detail : ''}`);
    return;
  }
  
  try {
    await window.electronAPI!.showMessage({
      type: 'error',
      title,
      message,
      detail
    });
  } catch (error) {
    console.error('Failed to show error:', error);
  }
};
