/**
 * Optimization Engine Service
 * Generates game-specific optimization scripts for Electron app
 */

interface OptimizationResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

export class OptimizationService {
  /**
   * Generate optimization script for a specific game
   * Returns the script content as a string (for download in browser)
   */
  generateOptimization(gameName: string, packageType: string, username: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    
    // Generate script content based on game and package
    const scriptContent = this.generateScriptContent(gameName, packageType, username);
    
    return scriptContent;
  }

  /**
   * Get the filename for the optimization script
   */
  getScriptFilename(gameName: string, packageType: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const cleanGameName = gameName.replace(/\s+/g, '_');
    return `${cleanGameName}_${packageType}_${timestamp}.bat`;
  }

  /**
   * Generate the actual optimization script content
   */
  private generateScriptContent(gameName: string, packageType: string, username: string): string {
    const timestamp = new Date().toLocaleString();
    
    // Base optimizations (all packages get these)
    const baseOptimizations = `@echo off
echo ========================================
echo OPTIAXIRA Game Optimization Tool
echo Game: ${gameName}
echo Package: ${packageType}
echo User: ${username}
echo Generated: ${timestamp}
echo ========================================
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges!
    echo Right-click and select "Run as Administrator"
    pause
    exit /b 1
)

echo [1/5] Applying Windows Performance Tweaks...
REM Disable Game DVR
reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AutoGameModeEnabled" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f >nul 2>&1

REM Set High Performance Power Plan
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c >nul 2>&1

REM Disable Fullscreen Optimizations
reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f >nul 2>&1

echo [2/5] Optimizing Network Settings...
REM Disable Nagle's Algorithm
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v "TcpAckFrequency" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v "TCPNoDelay" /t REG_DWORD /d 1 /f >nul 2>&1

REM Optimize DNS
netsh interface ip set dns "Ethernet" static 1.1.1.1 primary >nul 2>&1
netsh interface ip add dns "Ethernet" 1.0.0.1 index=2 >nul 2>&1

echo [3/5] Disabling Unnecessary Services...
sc config "SysMain" start=disabled >nul 2>&1
sc stop "SysMain" >nul 2>&1

echo [4/5] Optimizing GPU Settings...
REM Disable Hardware Acceleration in Windows
reg add "HKCU\\Software\\Microsoft\\Avalon.Graphics" /v "DisableHWAcceleration" /t REG_DWORD /d 0 /f >nul 2>&1

echo [5/5] Clearing Temporary Files...
del /q /f /s "%TEMP%\\*" >nul 2>&1
del /q /f /s "C:\\Windows\\Temp\\*" >nul 2>&1

`;

    // Game-specific optimizations
    const gameSpecific = this.getGameSpecificTweaks(gameName);
    
    // Package-tier specific (higher tiers get more tweaks)
    const tierSpecific = this.getTierSpecificTweaks(packageType);
    
    // Completion message
    const completion = `
echo.
echo ========================================
echo Optimization Complete!
echo ========================================
echo.
echo Please restart your computer for all changes to take effect.
echo.
pause
`;
    
    return baseOptimizations + gameSpecific + tierSpecific + completion;
  }

  /**
   * Get game-specific optimizations
   */
  private getGameSpecificTweaks(gameName: string): string {
    const gameTweaks: Record<string, string> = {
      "FiveM": `
echo [FIVEM] Applying FiveM-specific optimizations...
REM Increase FiveM priority
reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "FiveM.exe" /t REG_SZ /d "~ HIGHDPIAWARE RUNASADMIN" /f >nul 2>&1

REM Clear FiveM cache
if exist "%LOCALAPPDATA%\\FiveM\\FiveM.app\\cache" (
    echo Clearing FiveM cache...
    rd /s /q "%LOCALAPPDATA%\\FiveM\\FiveM.app\\cache" >nul 2>&1
)
`,
      "Call of Duty": `
echo [COD] Applying Call of Duty optimizations...
REM Disable Xbox Game Bar
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f >nul 2>&1

REM Set CPU priority for COD
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\CoDWaW.exe\\PerfOptions" /v "CpuPriorityClass" /t REG_DWORD /d 3 /f >nul 2>&1
`,
      "Minecraft": `
echo [MINECRAFT] Applying Minecraft optimizations...
REM Allocate more RAM to Java
echo Setting Java memory allocation...
setx _JAVA_OPTIONS "-Xmx4G -Xms2G" >nul 2>&1

REM Disable Java telemetry
reg add "HKCU\\Software\\JavaSoft\\Java Update\\Policy" /v "EnableJavaUpdate" /t REG_DWORD /d 0 /f >nul 2>&1
`,
      "Fortnite": `
echo [FORTNITE] Applying Fortnite optimizations...
REM Clear Fortnite shader cache
if exist "%LOCALAPPDATA%\\FortniteGame\\Saved" (
    echo Clearing Fortnite cache...
    del /q /f /s "%LOCALAPPDATA%\\FortniteGame\\Saved\\Config\\*.ini" >nul 2>&1
)
`,
      "Valorant": `
echo [VALORANT] Applying Valorant optimizations...
REM Optimize Riot Client
reg add "HKCU\\Software\\Riot Games\\Valorant" /v "LowLatencyMode" /t REG_DWORD /d 1 /f >nul 2>&1

REM Disable input lag
reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f >nul 2>&1
`,
      "Apex Legends": `
echo [APEX] Applying Apex Legends optimizations...
REM Clear Origin cache
if exist "%PROGRAMDATA%\\Origin\\Logs" (
    echo Clearing Origin cache...
    del /q /f /s "%PROGRAMDATA%\\Origin\\Logs\\*" >nul 2>&1
)

REM Optimize EA app
reg add "HKCU\\Software\\EA\\EA Desktop" /v "AutoPatchEnabled" /t REG_DWORD /d 0 /f >nul 2>&1
`,
      "CS:GO": `
echo [CSGO] Applying CS:GO optimizations...
REM Set optimal launch options (user must add to Steam)
echo Recommended CS:GO Launch Options:
echo -novid -high -threads 4 +cl_forcepreload 1 -freq 144 +rate 128000
echo.

REM Clear CS:GO cache
if exist "%PROGRAMFILES(X86)%\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\csgo" (
    echo Clearing shader cache...
    del /q /f /s "%PROGRAMFILES(X86)%\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\csgo\\cache\\*" >nul 2>&1
)
`,
      "Roblox": `
echo [ROBLOX] Applying Roblox optimizations...
REM Clear Roblox cache
if exist "%LOCALAPPDATA%\\Roblox\\logs" (
    echo Clearing Roblox logs...
    del /q /f /s "%LOCALAPPDATA%\\Roblox\\logs\\*" >nul 2>&1
)

REM Optimize Roblox performance
reg add "HKCU\\Software\\Roblox\\RobloxStudioBrowser\\roblox.com" /v "GpuAcceleration" /t REG_DWORD /d 1 /f >nul 2>&1
`,
    };

    return gameTweaks[gameName] || "";
  }

  /**
   * Get package tier-specific optimizations
   */
  private getTierSpecificTweaks(packageType: string): string {
    // Tier 1-3 get advanced tweaks
    if (["ELITE", "OCBUNDLE", "FOUNDATION"].includes(packageType)) {
      let tweaks = `
echo [PREMIUM] Applying advanced optimizations...
REM CPU optimization
bcdedit /set disabledynamictick yes >nul 2>&1
bcdedit /set useplatformclock no >nul 2>&1

REM Memory optimization
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "ClearPageFileAtShutdown" /t REG_DWORD /d 0 /f >nul 2>&1

REM GPU scheduling
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v "HwSchMode" /t REG_DWORD /d 2 /f >nul 2>&1

REM Disable background apps
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v "GlobalUserDisabled" /t REG_DWORD /d 1 /f >nul 2>&1
`;

      // Tier 1-2 get overclocking utilities info
      if (["ELITE", "OCBUNDLE"].includes(packageType)) {
        tweaks += `
echo [ELITE] Elite package optimizations...
REM Note: For overclocking, use MSI Afterburner or Ryzen Master
echo.
echo ELITE PACKAGE INCLUDES:
echo - All base optimizations
echo - Advanced CPU tweaks
echo - GPU optimization
echo - RAM tuning recommendations
echo.
echo For CPU/GPU overclocking, please use:
echo - MSI Afterburner (GPU): https://www.msi.com/Landing/afterburner
echo - Ryzen Master (AMD CPU): https://www.amd.com/en/technologies/ryzen-master
echo - Intel XTU (Intel CPU): https://downloadcenter.intel.com/download/24075
echo.
`;
      }

      return tweaks;
    }

    return "";
  }
}
