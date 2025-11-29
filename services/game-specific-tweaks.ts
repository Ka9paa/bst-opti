// Game-specific optimization configurations
// ONLY tweaks that are UNIQUE to each specific game

export interface GameSpecificTweak {
  key: string;
  label: string;
  desc: string;
  category: 'quick' | 'engine' | 'graphics' | 'performance' | 'network' | 'advanced';
  defaultValue?: boolean | string;
}

export const getGameSpecificTweaks = (game: string): GameSpecificTweak[] => {
  const tweaksByGame: { [key: string]: GameSpecificTweak[] } = {
    // ====================================
    // FIVEM - GTA V MULTIPLAYER ONLY
    // ====================================
    fivem: [
      // FiveM-Specific Cache & Files
      { key: 'fivemClearCache', label: 'Auto-Clear FiveM Cache Folder', desc: 'Clear %localappdata%\\FiveM\\FiveM.app\\cache', category: 'quick', defaultValue: false },
      { key: 'fivemClearCitCache', label: 'Clear CitizenFX Cache', desc: 'Remove citizen/cache and data folders', category: 'quick', defaultValue: false },
      { key: 'fivemServerCache', label: 'Clear Server-Specific Cache', desc: 'Remove server IP cache folders', category: 'quick', defaultValue: false },
      
      // CitizenFX.ini Configuration
      { key: 'fivemStreamingMemory', label: 'Increase StreamingMemory (CitizenFX.ini)', desc: 'Set to 512-1024MB in config', category: 'engine', defaultValue: false },
      { key: 'fivemExtendedTexture', label: 'Extended Texture Budget (CitizenFX.ini)', desc: 'Increase VRAM allocation for GTA V', category: 'engine', defaultValue: false },
      { key: 'fivemSafeMode', label: 'Disable FiveM Safe Mode', desc: 'Remove -safemode from launch', category: 'engine', defaultValue: false },
      
      // FiveM Launch Parameters
      { key: 'fivemLaunchArgs', label: 'Add FiveM Launch Arguments', desc: '+set r_disableProximityBlur true', category: 'performance', defaultValue: false },
      { key: 'fivemNoSplash', label: 'Disable FiveM Splash Screen', desc: '-noSplash launch parameter', category: 'performance', defaultValue: false },
      
      // GTA V Settings for FiveM
      { key: 'fivemGTASettings', label: 'Optimize GTA V settings.xml', desc: 'Edit Documents\\Rockstar Games\\GTA V', category: 'advanced', defaultValue: false },
      { key: 'fivemDisableRecording', label: 'Disable Rockstar Editor (GTA V)', desc: 'Turn off built-in recording', category: 'advanced', defaultValue: false },
      
      // FiveM-Specific Network
      { key: 'fivemConnectionTimeout', label: 'Increase Connection Timeout', desc: 'Modify FiveM server timeout values', category: 'network', defaultValue: false },
      { key: 'fivemPacketLoss', label: 'FiveM Packet Loss Mitigation', desc: 'Adjust cl_packetloss settings', category: 'network', defaultValue: false }
    ],

    // ====================================
    // CALL OF DUTY - WARZONE & MW ONLY
    // ====================================
    cod: [
      // COD Config Files
      { key: 'codConfigMP', label: 'Edit config_mp.cfg (COD Directory)', desc: 'Modify player/config_mp.cfg settings', category: 'quick', defaultValue: false },
      { key: 'codAdvconfigini', label: 'Edit adv_options.ini', desc: 'Change advanced video options file', category: 'quick', defaultValue: false },
      { key: 'codClearShaderCache', label: 'Clear COD Shader Cache', desc: 'Remove %ProgramData%\\NVIDIA\\shaders\\COD', category: 'quick', defaultValue: false },
      
      // Warzone-Specific Settings
      { key: 'codRenderWorkers', label: 'Set RenderWorkerCount (config_mp.cfg)', desc: 'seta r_renderWorkerCount "X"', category: 'engine', defaultValue: false },
      { key: 'codVideoMemory', label: 'VideoMemoryScale (config_mp.cfg)', desc: 'seta VideoMemoryScale "0.85"', category: 'engine', defaultValue: false },
      { key: 'codMaxFPS', label: 'Set com_maxfps (config_mp.cfg)', desc: 'Uncap framerate limit', category: 'engine', defaultValue: false },
      
      // Battle.net / COD Launcher
      { key: 'codBattlenetOptimize', label: 'Disable Battle.net Background Services', desc: 'Close Battle.net after launch', category: 'performance', defaultValue: false },
      { key: 'codWarzoneCache', label: 'Clear Warzone Temp Files', desc: 'Remove Modern Warfare cache folder', category: 'performance', defaultValue: false },
      
      // COD-Specific Launch Options
      { key: 'codLaunchParameters', label: 'Add COD Launch Parameters', desc: 'Battle.net: -d3d11 or -dx12', category: 'advanced', defaultValue: false },
      { key: 'codDisableCrosshair', label: 'Custom Crosshair Overlay Support', desc: 'Prepare for external crosshairs', category: 'advanced', defaultValue: false },
      
      // COD Network Config
      { key: 'codNetworkSettings', label: 'Optimize COD Network Settings (CFG)', desc: 'cl_maxpackets, snaps, rate', category: 'network', defaultValue: false },
      { key: 'codPortConfig', label: 'COD Port Configuration', desc: 'Forward ports 3074, 27015-27030', category: 'network', defaultValue: false }
    ],

    // ====================================
    // MINECRAFT - JAVA EDITION ONLY
    // ====================================
    minecraft: [
      // Minecraft Launcher Settings
      { key: 'mcJVMArguments', label: 'Add JVM Arguments (Launcher)', desc: '-Xmx8G -Xms8G -XX:+UseG1GC', category: 'quick', defaultValue: false },
      { key: 'mcRAMAllocation', label: 'Increase RAM Allocation (Launcher)', desc: 'Set to 4-8GB in launcher settings', category: 'quick', defaultValue: false },
      { key: 'mcJavaPath', label: 'Force Java 17/21 (Launcher)', desc: 'Point to latest Java install', category: 'quick', defaultValue: false },
      
      // options.txt Configuration
      { key: 'mcOptionsFile', label: 'Edit options.txt', desc: 'Modify .minecraft\\options.txt directly', category: 'engine', defaultValue: false },
      { key: 'mcFOVOptimize', label: 'Set FOV to Quake Pro (options.txt)', desc: 'fov:1.0 in config', category: 'engine', defaultValue: false },
      { key: 'mcRenderDistanceCFG', label: 'Set Render Distance (options.txt)', desc: 'renderDistance:8-12', category: 'engine', defaultValue: false },
      
      // Minecraft-Specific Performance
      { key: 'mcAikarsFlags', label: 'Aikar\'s JVM Flags (Launcher)', desc: 'Advanced GC flags for servers/client', category: 'performance', defaultValue: false },
      { key: 'mcSodiumInstall', label: 'Install Sodium Mod', desc: 'Download from modrinth.com/mod/sodium', category: 'performance', defaultValue: false },
      { key: 'mcLithiumInstall', label: 'Install Lithium Mod', desc: 'Server-side optimization mod', category: 'performance', defaultValue: false },
      
      // .minecraft Folder Optimization
      { key: 'mcClearLogs', label: 'Clear .minecraft\\logs Folder', desc: 'Remove old log files', category: 'advanced', defaultValue: false },
      { key: 'mcClearResourcePacks', label: 'Disable Resource Packs', desc: 'Remove from .minecraft\\resourcepacks', category: 'advanced', defaultValue: false },
      
      // Minecraft Server Files
      { key: 'mcServerProperties', label: 'Optimize server.properties', desc: 'If running local server', category: 'network', defaultValue: false },
      { key: 'mcPaperSpigot', label: 'Use Paper/Spigot Server', desc: 'Better than vanilla for performance', category: 'network', defaultValue: false }
    ],

    // ====================================
    // FORTNITE - BATTLE ROYALE ONLY
    // ====================================
    fortnite: [
      // Fortnite Config Files
      { key: 'fnGameUserSettings', label: 'Edit GameUserSettings.ini', desc: 'Modify %localappdata%\\FortniteGame\\Saved\\Config', category: 'quick', defaultValue: false },
      { key: 'fnEngineIni', label: 'Edit GameEngine.ini (Fortnite)', desc: 'Custom Unreal Engine settings', category: 'quick', defaultValue: false },
      { key: 'fnClearEpicCache', label: 'Clear Epic Games Launcher Cache', desc: 'Remove webcache folder', category: 'quick', defaultValue: false },
      
      // Fortnite-Specific Settings
      { key: 'fnDisableReplays', label: 'Disable Replay Recording (INI)', desc: 'bDisableReplayRecording=True', category: 'engine', defaultValue: false },
      { key: 'fnTexturePoolSize', label: 'r.Streaming.PoolSize (GameUserSettings)', desc: 'Increase texture streaming budget', category: 'engine', defaultValue: false },
      { key: 'fnDX12Mode', label: 'Force DirectX 12 Mode', desc: 'Add -dx12 to Epic launcher', category: 'engine', defaultValue: false },
      
      // Fortnite Performance Mode
      { key: 'fnPerformanceMode', label: 'Enable Performance Mode (INI)', desc: 'sg.ResolutionQuality=70', category: 'performance', defaultValue: false },
      { key: 'fnLowLatencyMode', label: 'NVIDIA Reflex for Fortnite', desc: 'Enable in-game + driver settings', category: 'performance', defaultValue: false },
      
      // Epic Games Launcher
      { key: 'fnEpicAutoLaunch', label: 'Disable Epic Auto-Launch', desc: 'Prevent Epic from starting on boot', category: 'advanced', defaultValue: false },
      { key: 'fnEACOptimize', label: 'Optimize Easy Anti-Cheat for Fortnite', desc: 'Reduce EasyAntiCheat_x64.exe CPU', category: 'advanced', defaultValue: false },
      
      // Fortnite Network
      { key: 'fnMatchmakingDelay', label: 'Reduce Matchmaking Delay', desc: 'Custom matchmaking region settings', category: 'network', defaultValue: false },
      { key: 'fnNetStatCommands', label: 'Enable Net Stats (Console)', desc: 'Use stat fps, stat net in-game', category: 'network', defaultValue: false }
    ],

    // ====================================
    // VALORANT - RIOT GAMES ONLY
    // ====================================
    valorant: [
      // Valorant Config Files
      { key: 'valGameUserSettings', label: 'Edit GameUserSettings.ini (Valorant)', desc: 'Modify %localappdata%\\VALORANT\\Saved\\Config', category: 'quick', defaultValue: false },
      { key: 'valRiotClientServices', label: 'Disable Riot Client Background Services', desc: 'Close RiotClientServices.exe after launch', category: 'quick', defaultValue: false },
      { key: 'valClearVanguardLogs', label: 'Clear Vanguard Log Files', desc: 'Remove C:\\Program Files\\Riot Vanguard\\Logs', category: 'quick', defaultValue: false },
      
      // Vanguard-Specific Optimization
      { key: 'valVanguardOptimize', label: 'Optimize Vanguard Anti-Cheat', desc: 'Reduce vgc.sys CPU usage', category: 'engine', defaultValue: false },
      { key: 'valVanguardDelay', label: 'Delay Vanguard Startup', desc: 'Start Vanguard only when needed', category: 'engine', defaultValue: false },
      
      // Valorant-Specific Settings
      { key: 'valRawInputBuffer', label: 'Enable Raw Input Buffer (Registry)', desc: 'VALORANT.exe raw input settings', category: 'performance', defaultValue: false },
      { key: 'valNVIDIAReflex', label: 'Force NVIDIA Reflex (Valorant)', desc: 'Enable in driver + in-game', category: 'performance', defaultValue: false },
      { key: 'valAMDAntiLag', label: 'Force AMD Anti-Lag (Valorant)', desc: 'Radeon Software profile for Valorant', category: 'performance', defaultValue: false },
      
      // Riot Client Optimization
      { key: 'valRiotClientDisable', label: 'Close Riot Client After Launch', desc: 'Kill RiotClientUx.exe post-launch', category: 'advanced', defaultValue: false },
      { key: 'valCrashpadHandler', label: 'Disable Crashpad Handler', desc: 'Reduce RiotClientCrashHandler.exe', category: 'advanced', defaultValue: false },
      
      // Valorant Network Config
      { key: 'valServerPicker', label: 'Force Specific Valorant Server', desc: 'Edit server region preference', category: 'network', defaultValue: false },
      { key: 'valPacketPriority', label: 'Prioritize Valorant Packets (QoS)', desc: 'Router QoS for VALORANT.exe', category: 'network', defaultValue: false }
    ],

    // ====================================
    // APEX LEGENDS - EA / RESPAWN ONLY
    // ====================================
    apex: [
      // Apex Config Files
      { key: 'apexAutoexec', label: 'Create autoexec.cfg (Apex)', desc: 'Create in cfg folder with launch commands', category: 'quick', defaultValue: false },
      { key: 'apexVideoConfig', label: 'Edit videoconfig.txt (Apex)', desc: 'Modify local\\settings\\videoconfig.txt', category: 'quick', defaultValue: false },
      { key: 'apexClearRespawnCache', label: 'Clear Respawn Cache Folder', desc: 'Remove cache from Apex directory', category: 'quick', defaultValue: false },
      
      // Apex Launch Options
      { key: 'apexLaunchOptions', label: 'Add Apex Launch Options (Steam/Origin)', desc: '+fps_max unlimited -novid -high', category: 'engine', defaultValue: false },
      { key: 'apexNoIntro', label: 'Skip Apex Intro Videos', desc: '-dev -preload in launch options', category: 'engine', defaultValue: false },
      { key: 'apexConsoleCmds', label: 'Add Console Commands (autoexec)', desc: 'fps_max, cl_showfps, etc.', category: 'engine', defaultValue: false },
      
      // Source Engine Optimization
      { key: 'apexSourceEngineCVAR', label: 'Optimize Source Engine CVARs', desc: 'r_dynamic, mat_queue_mode settings', category: 'performance', defaultValue: false },
      { key: 'apexModelLOD', label: 'Set Model LOD Distance (videoconfig)', desc: 'Reduce detail on distant objects', category: 'performance', defaultValue: false },
      
      // EA App / Origin
      { key: 'apexEAAppDisable', label: 'Close EA App After Launch', desc: 'Kill EADesktop.exe background process', category: 'advanced', defaultValue: false },
      { key: 'apexOriginOverlay', label: 'Disable Origin In-Game Overlay', desc: 'Turn off Origin overlay completely', category: 'advanced', defaultValue: false },
      
      // Apex Network Config
      { key: 'apexDataCenter', label: 'Select Best Data Center (Manual)', desc: 'Connect to lowest ping server', category: 'network', defaultValue: false },
      { key: 'apexNetworking', label: 'Apex Network Rate (autoexec)', desc: 'cl_updaterate_mp, cl_cmdrate', category: 'network', defaultValue: false }
    ],

    // ====================================
    // CS:GO / CS2 - VALVE ONLY
    // ====================================
    csgo: [
      // CS Config Files
      { key: 'csAutoexec', label: 'Create autoexec.cfg (CS:GO/CS2)', desc: 'Create in csgo/cfg or game/csgo/cfg', category: 'quick', defaultValue: false },
      { key: 'csVideoTxt', label: 'Edit video.txt (CS:GO)', desc: 'Modify video settings file directly', category: 'quick', defaultValue: false },
      { key: 'csCS2VideoTxt', label: 'Edit cs2_video.txt (CS2)', desc: 'CS2-specific video configuration', category: 'quick', defaultValue: false },
      
      // CS Launch Options
      { key: 'csLaunchOptions', label: 'Add CS Launch Options (Steam)', desc: '-high -novid -nojoy +fps_max 0', category: 'engine', defaultValue: false },
      { key: 'csTickrate', label: 'Set Tickrate (Launch Options)', desc: '-tickrate 128 for practice', category: 'engine', defaultValue: false },
      { key: 'csThreads', label: 'Set Thread Count (Launch)', desc: '-threads X for CPU cores', category: 'engine', defaultValue: false },
      
      // CS Console Commands
      { key: 'csFPSCommands', label: 'Add FPS Commands (autoexec)', desc: 'fps_max 0, cl_showfps 1', category: 'performance', defaultValue: false },
      { key: 'csNetworkRates', label: 'Optimize Network Rates (autoexec)', desc: 'rate 786432, cl_updaterate 128', category: 'performance', defaultValue: false },
      { key: 'csInterp', label: 'Set Interp Settings (autoexec)', desc: 'cl_interp 0, cl_interp_ratio 1', category: 'performance', defaultValue: false },
      
      // CS2-Specific
      { key: 'csUberShaders', label: 'Enable Uber Shaders (CS2)', desc: 'Pre-compile shaders for CS2', category: 'advanced', defaultValue: false },
      { key: 'csClearShaderCache', label: 'Clear CS:GO/CS2 Shader Cache', desc: 'Remove shadercache folder', category: 'advanced', defaultValue: false },
      
      // CS Matchmaking
      { key: 'csMaxPing', label: 'Set Max Acceptable Ping (autoexec)', desc: 'mm_dedicated_search_maxping 50', category: 'network', defaultValue: false },
      { key: 'csMatchmakingIP', label: 'Block High Ping Servers (Firewall)', desc: 'Block specific server IPs', category: 'network', defaultValue: false }
    ],

    // ====================================
    // ROBLOX - ROBLOX CORPORATION ONLY
    // ====================================
    roblox: [
      // Roblox External Tools
      { key: 'rbxFPSUnlocker', label: 'Install rbxfpsunlocker (GitHub)', desc: 'Download FPS unlocker from GitHub', category: 'quick', defaultValue: false },
      { key: 'rbxBloxstrap', label: 'Install Bloxstrap (Alternative Launcher)', desc: 'Better launcher with more options', category: 'quick', defaultValue: false },
      { key: 'rbxClearCache', label: 'Clear Roblox Cache Folder', desc: 'Remove %localappdata%\\Roblox\\cache', category: 'quick', defaultValue: false },
      
      // Roblox Client Flags
      { key: 'rbxClientFlags', label: 'Create ClientSettings Folder', desc: 'Add ClientAppSettings.json tweaks', category: 'engine', defaultValue: false },
      { key: 'rbxFlagEditor', label: 'Use Bloxstrap Flag Editor', desc: 'Edit FastFlags via Bloxstrap', category: 'engine', defaultValue: false },
      { key: 'rbxDisableVulkan', label: 'Disable Vulkan Renderer (Flag)', desc: 'Force DirectX 11 instead', category: 'engine', defaultValue: false },
      
      // Roblox Performance Flags
      { key: 'rbxGraphicsMode', label: 'Set Graphics Mode (Flag)', desc: 'FFlagDebugGraphicsPreferD3D11', category: 'performance', defaultValue: false },
      { key: 'rbxTextureQuality', label: 'Set Texture Quality (Flag)', desc: 'DFIntTextureCompositorActiveJobs', category: 'performance', defaultValue: false },
      
      // Roblox Privacy/Telemetry
      { key: 'rbxDisableTelemetry', label: 'Block Roblox Telemetry (Hosts)', desc: 'Add telemetry domains to hosts file', category: 'advanced', defaultValue: false },
      { key: 'rbxDisableCrashReporting', label: 'Disable Crash Reporting (Flag)', desc: 'FFlagDisableCrashReporting', category: 'advanced', defaultValue: false },
      
      // Roblox Studio
      { key: 'rbxStudioKill', label: 'Auto-Kill Roblox Studio on Launch', desc: 'Task kill RobloxStudioBeta.exe', category: 'network', defaultValue: false },
      { key: 'rbxMultiInstance', label: 'Enable Multiple Roblox Instances', desc: 'Remove singleton check', category: 'network', defaultValue: false }
    ]
  };

  return tweaksByGame[game] || [];
};

// Get default optimizations for a specific game
export const getDefaultOptimizations = (game: string): any => {
  const tweaks = getGameSpecificTweaks(game);
  const defaults: any = {};
  
  tweaks.forEach(tweak => {
    defaults[tweak.key] = tweak.defaultValue !== undefined ? tweak.defaultValue : false;
  });
  
  return defaults;
};

// Get tweaks by category
export const getTweaksByCategory = (game: string, category: string): GameSpecificTweak[] => {
  return getGameSpecificTweaks(game).filter(tweak => tweak.category === category);
};
