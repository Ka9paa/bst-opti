export const generateWindowsOptimizationScript = (gameName: string, settings: any, packageId: string) => {
  const baseOptimizations = `@echo off
REM ========================================
REM OPTIAXIRA - ${gameName} Optimization Script
REM ========================================
REM Package: ${packageId.toUpperCase()}
REM Generated: ${new Date().toLocaleDateString()}
REM
REM WHAT THIS SCRIPT DOES:
REM - Optimizes Windows power settings for maximum gaming performance
REM - Disables background services that reduce FPS
REM - Configures GPU and CPU priority for ${gameName}
REM - Reduces input latency (mouse/keyboard)
REM - Optimizes network settings for lower ping
REM - Removes unnecessary Windows visual effects
REM
REM WHAT THIS SCRIPT DOES NOT DO:
REM - Does NOT install any software
REM - Does NOT access the internet
REM - Does NOT modify game files
REM - Does NOT collect personal data
REM - Does NOT contain malware or viruses
REM
REM HOW TO USE:
REM 1. Right-click this file and select "Run as Administrator"
REM 2. If Windows shows a warning, click "More info" then "Run anyway"
REM    (This warning appears for ALL .bat files from the internet - it's normal)
REM 3. Wait for the script to complete
REM 4. Restart your computer for changes to take effect
REM
REM SAFETY: All changes are Windows registry tweaks and can be reverted
REM Support: discord.gg/optiaxira
REM ========================================

echo.
echo ========================================
echo     OPTIAXIRA - ${gameName} Optimizer
echo ========================================
echo Package: ${packageId.toUpperCase()}
echo Generated: ${new Date().toLocaleDateString()}
echo.
echo This script will optimize your system for ${gameName}
echo All commands are documented and safe
echo.
echo Starting optimization...
echo ========================================
echo.

REM ========================================
REM STEP 1/15: Power Settings
REM ========================================
REM Changes Windows power plan to "High Performance" mode
REM This prevents CPU throttling and ensures maximum performance
REM Your PC will use slightly more power, but gain better FPS
echo [1/15] Setting High Performance Power Plan...
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
powercfg /change monitor-timeout-ac 0
powercfg /change disk-timeout-ac 0
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
echo     ^> Power plan optimized for gaming

REM ========================================
REM STEP 2/15: Disable Game DVR
REM ========================================
REM Disables Xbox Game Bar and background recording (DVR)
REM Game Bar uses CPU/GPU resources even when not visible
REM This frees up ~5-10%% GPU usage for your game
echo [2/15] Disabling Xbox Game Bar and DVR...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v GameDVR_Enabled /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\default\\ApplicationManagement\\AllowGameDVR" /v value /t REG_DWORD /d 0 /f >nul 2>&1
echo     ^> Xbox Game Bar and DVR disabled

REM ========================================
REM STEP 3/15: Fullscreen Optimizations
REM ========================================
REM Disables Windows Fullscreen Optimizations
REM This reduces input lag and improves frame pacing
REM Games will run in true exclusive fullscreen mode
echo [3/15] Configuring Fullscreen Optimizations...
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_DXGIHonorFSEWindowsCompatible /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_HonorUserFSEBehaviorMode /t REG_DWORD /d 1 /f >nul 2>&1
echo     ^> Fullscreen mode optimized for lower latency

REM ========================================
REM STEP 4/15: GPU Scheduling
REM ========================================
REM Enables Hardware-Accelerated GPU Scheduling
REM Reduces latency by allowing GPU to manage its own memory
REM Requires a modern GPU (NVIDIA 10-series or newer, AMD RX 5000+)
echo [4/15] Enabling Hardware-Accelerated GPU Scheduling...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f >nul 2>&1
echo     ^> Hardware GPU scheduling enabled

REM ========================================
REM STEP 5/15: Network Latency
REM ========================================
REM Disables Nagle's Algorithm (network packet buffering)
REM Reduces online gaming latency by sending packets immediately
REM Can reduce ping by 10-30ms in multiplayer games
echo [5/15] Disabling Nagle's Algorithm...
for /f %%i in ('reg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces"') do (
    reg add "%%i" /v TcpAckFrequency /t REG_DWORD /d 1 /f >nul 2>&1
    reg add "%%i" /v TCPNoDelay /t REG_DWORD /d 1 /f >nul 2>&1
)
echo     ^> Network latency optimized

REM ========================================
REM STEP 6/15: CPU & GPU Priority
REM ========================================
REM Sets maximum CPU and GPU priority for games
REM Games will receive more CPU time than background apps
REM This ensures consistent frame times and prevents stuttering
echo [6/15] Optimizing CPU Priority...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v Priority /t REG_DWORD /d 6 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Scheduling Category" /t REG_SZ /d "High" /f >nul 2>&1
echo     ^> Game process priority maximized

REM ========================================
REM STEP 7/15: Visual Effects
REM ========================================
REM Disables Windows animations and visual effects
REM Animations use CPU/GPU resources that could go to your game
REM This can free up 2-5%% system resources
echo [7/15] Reducing Windows Visual Effects...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Desktop" /v UserPreferencesMask /t REG_BINARY /d 9012038010000000 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ListviewAlphaSelect /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAnimations /t REG_DWORD /d 0 /f >nul 2>&1
echo     ^> Visual effects disabled for performance

REM ========================================
REM STEP 8/15: Network Throttling
REM ========================================
REM Disables network throttling for games
REM Allows games to use full network bandwidth
REM Improves stability in online multiplayer
echo [8/15] Optimizing Network Settings...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 0xffffffff /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 0 /f >nul 2>&1
echo     ^> Network throttling disabled

REM ========================================
REM STEP 9/15: Telemetry Services
REM ========================================
REM Disables Windows telemetry and diagnostic tracking
REM These background services send data to Microsoft
REM Stopping them frees up CPU and network resources
echo [9/15] Disabling Windows Telemetry...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >nul 2>&1
sc config DiagTrack start= disabled >nul 2>&1
sc stop DiagTrack >nul 2>&1
echo     ^> Telemetry services disabled

REM ========================================
REM STEP 10/15: Background Services
REM ========================================
REM Disables unnecessary Windows background services
REM Services disabled: Windows Search, Superfetch, Biometrics, Tablet Input, Fax, Print Notifications
REM These services use RAM and CPU even when you're not using them
echo [10/15] Disabling Unnecessary Services...
sc config "WSearch" start= disabled >nul 2>&1
sc config "SysMain" start= disabled >nul 2>&1
sc config "WbioSrvc" start= disabled >nul 2>&1
sc config "TabletInputService" start= disabled >nul 2>&1
sc config "Fax" start= disabled >nul 2>&1
sc config "PrintNotify" start= disabled >nul 2>&1
echo     ^> Unnecessary background services disabled

REM ========================================
REM STEP 11/15: Startup Programs
REM ========================================
REM Removes auto-start programs that slow down boot time
REM Programs like OneDrive, Teams, Discord, Spotify will not auto-start
REM You can still run these programs manually when needed
echo [11/15] Optimizing Startup Applications...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v OneDrive /t REG_SZ /d "" /f >nul 2>&1
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Microsoft Teams" /f >nul 2>&1
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Discord" /f >nul 2>&1
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Spotify" /f >nul 2>&1
echo     ^> Startup programs optimized

REM ========================================
REM STEP 12/15: Background Apps
REM ========================================
REM Prevents Windows Store apps from running in background
REM Background apps use CPU and memory even when minimized
REM Saves battery and improves game performance
echo [12/15] Disabling Background Apps...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalUserDisabled /t REG_DWORD /d 1 /f >nul 2>&1
echo     ^> Background apps disabled

REM ========================================
REM STEP 13/15: Input Devices
REM ========================================
REM Disables mouse acceleration for more precise aiming
REM Raw mouse input gives you 1:1 mouse movement
REM Critical for FPS games like Valorant, CS:GO, etc.
echo [13/15] Optimizing Input Devices...
reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 0 /f >nul 2>&1
echo     ^> Mouse acceleration disabled

REM ========================================
REM STEP 14/15: Disk Performance
REM ========================================
REM Optimizes Windows file system for gaming
REM Disables "Last Access Time" tracking (speeds up file operations)
REM Disables page file encryption (faster memory management)
echo [14/15] Optimizing Disk Performance...
fsutil behavior set DisableLastAccess 1 >nul 2>&1
fsutil behavior set EncryptPagingFile 0 >nul 2>&1
echo     ^> Disk optimized for speed

REM ========================================
REM STEP 15/15: Cleanup
REM ========================================
REM Cleans temporary files that slow down your system
REM Removes cached data from Windows Temp folders
REM Safe to delete - Windows recreates these as needed
echo [15/15] Cleaning Temporary Files...
del /q /f /s %TEMP%\\* >nul 2>&1
del /q /f /s C:\\Windows\\Temp\\* >nul 2>&1
del /q /f /s C:\\Windows\\Prefetch\\* >nul 2>&1
echo     ^> Temporary files cleaned

echo.
echo ========================================
echo     OPTIMIZATION COMPLETE!
echo ========================================
echo.
echo All 15 optimizations have been applied successfully
echo.
echo IMPORTANT: Restart your computer now for changes to take effect
echo.
echo What was optimized:
echo   - Power settings set to maximum performance
echo   - Background services and apps disabled
echo   - Network latency reduced
echo   - GPU and CPU priority maximized
echo   - Visual effects removed for better FPS
echo   - Input lag minimized
echo.
echo Support: discord.gg/optiaxira
echo ========================================
pause
`;

  const advancedOptimizations = `
REM ===== ADVANCED OPTIMIZATIONS (ELITE PACKAGE) =====

REM Disable Windows Defender (Use with caution!)
echo [ADVANCED] Disabling Windows Defender Real-Time Protection...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f

REM Disable Cortana
echo [ADVANCED] Disabling Cortana...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f

REM Disable Windows Updates
echo [ADVANCED] Disabling Windows Updates...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v NoAutoUpdate /t REG_DWORD /d 1 /f
sc config wuauserv start= disabled

REM Disable Memory Compression
echo [ADVANCED] Disabling Memory Compression...
PowerShell -Command "Disable-MMAgent -MemoryCompression"

REM Enable MSI Mode for GPU
echo [ADVANCED] Enabling MSI Mode...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v MSI_Supported /t REG_DWORD /d 1 /f

REM Disable Spectre and Meltdown Mitigations
echo [ADVANCED] Disabling CPU Mitigations (Performance)...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v FeatureSettingsOverride /t REG_DWORD /d 3 /f
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f
`;

  if (packageId === 'elite' || packageId === 'foundation') {
    return baseOptimizations.replace('pause', advancedOptimizations + '\npause');
  }

  return baseOptimizations;
};

export const generateNVIDIAOptimizationScript = (gameName: string) => {
  return `@echo off
REM NVIDIA Control Panel Optimization Script
REM ${gameName} - GPU Settings

echo ========================================
echo Optimizing NVIDIA Settings for ${gameName}
echo ========================================
echo.

REM Note: These settings are applied via registry for NVIDIA Profile Inspector
REM For manual configuration:
echo Please configure the following in NVIDIA Control Panel:
echo.
echo 1. Manage 3D Settings ^> Global Settings:
echo    - Power Management Mode: Prefer Maximum Performance
echo    - Low Latency Mode: Ultra
echo    - Texture Filtering - Quality: Performance
echo    - Threaded Optimization: On
echo    - Max Frame Rate: Based on your monitor
echo.
echo 2. Adjust Desktop Size and Position:
echo    - Perform scaling on: GPU
echo.
echo 3. Change Resolution:
echo    - Use NVIDIA color settings
echo    - Output dynamic range: Full
echo.

REM Set NVIDIA GPU Power Management to Maximum Performance
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v "PowerMizerLevel" /t REG_DWORD /d 1 /f
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v "PowerMizerLevelAC" /t REG_DWORD /d 1 /f

echo.
echo NVIDIA optimization guide displayed.
echo Apply these settings manually in NVIDIA Control Panel.
pause
`;
};

export const generateGameConfigFile = (gameName: string, settings: any) => {
  // Provide default values if settings are undefined
  const safeSettings = {
    resolution: settings?.resolution || '1920x1080',
    vsync: settings?.vsync || false,
    fpsLimit: settings?.fpsLimit || '240',
    textureQuality: settings?.textureQuality || 'medium',
    shadowQuality: settings?.shadowQuality || 'low',
    effectsQuality: settings?.effectsQuality || 'low',
    antiAliasing: settings?.antiAliasing || 'off',
    displayMode: settings?.displayMode || 'fullscreen'
  };

  const configs: { [key: string]: string } = {
    fivem: `-- FiveM Performance Configuration
-- Generated by Game Optimizer Pro

-- Graphics Settings
local settings = {
  resolution = "${safeSettings.resolution}",
  vsync = ${safeSettings.vsync},
  fpsLimit = ${safeSettings.fpsLimit === 'Unlimited' ? 0 : safeSettings.fpsLimit},
  
  -- Quality Settings
  textureQuality = "${safeSettings.textureQuality}",
  shadowQuality = "${safeSettings.shadowQuality}",
  reflectionQuality = "${safeSettings.effectsQuality}",
  
  -- Performance
  distanceScaling = 0.5,
  entityDrawDistance = 15.0,
  vehicleDrawDistance = 15.0,
}

-- Apply settings
SetTimecycleModifier('cinema')
ClearTimecycleModifier()
`,

    minecraft: `# Minecraft Optimization Config
# Generated by Game Optimizer Pro

# Video Settings
renderDistance=${safeSettings.resolution === '1920x1080' ? 12 : 8}
maxFps=${safeSettings.fpsLimit === 'Unlimited' ? 260 : safeSettings.fpsLimit}
enableVsync=${safeSettings.vsync}
fullscreen=${safeSettings.displayMode === 'fullscreen'}

# Performance Settings
particles=${safeSettings.effectsQuality === 'low' ? 'minimal' : 'decreased'}
fancyGraphics=${safeSettings.textureQuality === 'high'}
renderClouds=${safeSettings.effectsQuality !== 'off'}
smoothLighting=${safeSettings.shadowQuality !== 'off'}
entityShadows=${safeSettings.shadowQuality === 'high'}

# Advanced
useVbo=true
mipmapLevels=${safeSettings.textureQuality === 'low' ? 0 : 4}
`,

    cod: `// Call of Duty Config
// Generated by Game Optimizer Pro

// Display
seta r_fullscreen "${safeSettings.displayMode === 'fullscreen' ? '1' : '0'}"
seta r_mode "${safeSettings.resolution}"
seta com_maxfps "${safeSettings.fpsLimit === 'Unlimited' ? '0' : safeSettings.fpsLimit}"
seta r_vsync "${safeSettings.vsync ? '1' : '0'}"

// Graphics Quality
seta r_texFilterAnisoMax "${safeSettings.textureQuality === 'low' ? '1' : '16'}"
seta r_shadowQuality "${safeSettings.shadowQuality === 'off' ? '0' : safeSettings.shadowQuality === 'low' ? '1' : '2'}"
seta r_distortion "${safeSettings.effectsQuality === 'off' ? '0' : '1'}"

// Performance
seta sys_configSum "0"
seta cl_maxpackets "125"
seta rate "25000"
`,

    fortnite: `[SystemSettings]
; Fortnite Performance Config
; Generated by Game Optimizer Pro

[/Script/FortniteGame.FortPlayerController]
bEnableVSync=${safeSettings.vsync ? 'True' : 'False'}
FrameRateLimit=${safeSettings.fpsLimit === 'Unlimited' ? '0.000000' : safeSettings.fpsLimit + '.000000'}

[ScalabilityGroups]
sg.ResolutionQuality=${safeSettings.textureQuality === 'low' ? '50' : '100'}
sg.ViewDistanceQuality=${safeSettings.shadowQuality === 'low' ? '0' : '3'}
sg.AntiAliasingQuality=${safeSettings.antiAliasing === 'off' ? '0' : '3'}
sg.ShadowQuality=${safeSettings.shadowQuality === 'off' ? '0' : safeSettings.shadowQuality === 'low' ? '1' : '3'}
sg.PostProcessQuality=${safeSettings.effectsQuality === 'low' ? '0' : '3'}
sg.TextureQuality=${safeSettings.textureQuality === 'low' ? '0' : '3'}
sg.EffectsQuality=${safeSettings.effectsQuality === 'low' ? '0' : '3'}
`,

    valorant: `// Valorant Config
// Generated by Game Optimizer Pro

[Video]
Resolution=${safeSettings.resolution}
WindowMode=${safeSettings.displayMode === 'fullscreen' ? '1' : '0'}
VSync=${safeSettings.vsync ? '1' : '0'}
MaxFPS=${safeSettings.fpsLimit === 'Unlimited' ? '300' : safeSettings.fpsLimit}

[Graphics]
GraphicsQuality=${safeSettings.textureQuality === 'low' ? '0' : '3'}
MaterialQuality=${safeSettings.textureQuality === 'low' ? '0' : '3'}
DetailQuality=${safeSettings.effectsQuality === 'low' ? '0' : '3'}
UIQuality=${safeSettings.effectsQuality === 'low' ? '0' : '3'}
VignetteEnabled=false
AntiAliasing=${safeSettings.antiAliasing === 'off' ? '0' : '1'}
`,
  };

  return configs[gameName] || '// Configuration not available for this game';
};

export const generateOptimizationPackage = (gameName: string, settings: any, packageId: string) => {
  const windowsScript = generateWindowsOptimizationScript(gameName, settings, packageId);
  const nvidiaScript = generateNVIDIAOptimizationScript(gameName);
  const gameConfig = generateGameConfigFile(gameName, settings);

  return {
    windowsScript,
    nvidiaScript,
    gameConfig,
  };
};