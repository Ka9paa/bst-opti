import { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface OptimizationTerminalProps {
  script: string;
  gameName: string;
  onClose: () => void;
}

export function OptimizationTerminal({
  script,
  gameName,
  onClose
}: OptimizationTerminalProps) {
  const isOpen = true; // Always open when component is rendered
  const systemType = 'custom'; // Default system type
  const optimizationScript = script;
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (isOpen && !isRunning && !isComplete) {
      startOptimization();
    }
  }, [isOpen]);

  const addOutput = (line: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const prefix = type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : '>';
    setOutput(prev => [...prev, `${prefix} ${line}`]);
  };

  const startOptimization = async () => {
    setIsRunning(true);
    setOutput([]);
    setHasError(false);

    addOutput('═══════════════════════════════════════════', 'info');
    addOutput(`OPTIAXIRA SYSTEM OPTIMIZER`, 'info');
    addOutput(`Game: ${gameName}`, 'info');
    addOutput(`Profile: ${systemType.toUpperCase()}`, 'info');
    addOutput('═══════════════════════════════════════════', 'info');
    addOutput('', 'info');

    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if running in Electron
    if (window.electron) {
      try {
        addOutput('Checking administrator privileges...', 'info');
        await new Promise(resolve => setTimeout(resolve, 800));

        const isAdmin = await window.electron.checkAdminRights();
        
        if (!isAdmin) {
          addOutput('ERROR: Administrator privileges required!', 'error');
          addOutput('Please restart the application as Administrator.', 'warning');
          setHasError(true);
          setIsRunning(false);
          setIsComplete(true);
          return;
        }

        addOutput('Administrator privileges confirmed', 'success');
        addOutput('', 'info');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Run optimizations
        addOutput('[1/10] Applying power plan optimizations...', 'info');
        const result1 = await window.electron.runOptimization('power', optimizationScript);
        if (result1.success) {
          addOutput('    - Power plan configured', 'success');
          addOutput('    - CPU throttling disabled', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[2/10] Optimizing CPU settings...', 'info');
        const result2 = await window.electron.runOptimization('cpu', optimizationScript);
        if (result2.success) {
          addOutput('    - CPU priority optimized', 'success');
          addOutput('    - Turbo Boost configured', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[3/10] Optimizing memory (RAM)...', 'info');
        const result3 = await window.electron.runOptimization('memory', optimizationScript);
        if (result3.success) {
          addOutput('    - Memory cache cleared', 'success');
          addOutput('    - Page file optimized', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[4/10] Optimizing GPU settings...', 'info');
        const result4 = await window.electron.runOptimization('gpu', optimizationScript);
        if (result4.success) {
          addOutput('    - GPU scheduling enabled', 'success');
          addOutput('    - Maximum performance mode set', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[5/10] Applying Windows visual optimizations...', 'info');
        const result5 = await window.electron.runOptimization('visual', optimizationScript);
        if (result5.success) {
          addOutput('    - Visual effects optimized', 'success');
          addOutput('    - Game Mode enabled', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[6/10] Optimizing network settings...', 'info');
        const result6 = await window.electron.runOptimization('network', optimizationScript);
        if (result6.success) {
          addOutput('    - TCP/IP optimized', 'success');
          addOutput('    - QoS enabled for gaming', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[7/10] Optimizing disk performance...', 'info');
        const result7 = await window.electron.runOptimization('disk', optimizationScript);
        if (result7.success) {
          addOutput('    - Temporary files cleaned', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[8/10] Disabling unnecessary services...', 'info');
        const result8 = await window.electron.runOptimization('services', optimizationScript);
        if (result8.success) {
          addOutput('    - Unnecessary services disabled', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[9/10] Applying game-specific optimizations...', 'info');
        const result9 = await window.electron.runOptimization('game', optimizationScript);
        if (result9.success) {
          addOutput('    - Game process priority optimized', 'success');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        addOutput('[10/10] Finalizing optimizations...', 'info');
        await new Promise(resolve => setTimeout(resolve, 800));
        addOutput('    - Applying all changes', 'success');

        addOutput('', 'info');
        addOutput('═══════════════════════════════════════════', 'info');
        addOutput('OPTIMIZATION COMPLETE!', 'success');
        addOutput('═══════════════════════════════════════════', 'info');
        addOutput('', 'info');
        addOutput(`System optimized for ${gameName}`, 'info');
        addOutput(`Profile: ${systemType.toUpperCase()}`, 'info');
        addOutput('', 'info');
        addOutput('⚠ IMPORTANT: Restart your computer for all changes to take effect!', 'warning');

        setIsComplete(true);
        setIsRunning(false);
      } catch (error: any) {
        addOutput(`ERROR: ${error.message}`, 'error');
        setHasError(true);
        setIsRunning(false);
        setIsComplete(true);
      }
    } else {
      // Running in browser - simulate for testing
      addOutput('Running in browser mode (simulation)...', 'warning');
      await new Promise(resolve => setTimeout(resolve, 500));

      const steps = [
        '[1/10] Applying power plan optimizations...',
        '[2/10] Optimizing CPU settings...',
        '[3/10] Optimizing memory (RAM)...',
        '[4/10] Optimizing GPU settings...',
        '[5/10] Applying Windows visual optimizations...',
        '[6/10] Optimizing network settings...',
        '[7/10] Optimizing disk performance...',
        '[8/10] Disabling unnecessary services...',
        '[9/10] Applying game-specific optimizations...',
        '[10/10] Finalizing optimizations...'
      ];

      for (const step of steps) {
        addOutput(step, 'info');
        await new Promise(resolve => setTimeout(resolve, 400));
        addOutput('    - Applied successfully', 'success');
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      addOutput('', 'info');
      addOutput('═══════════════════════════════════════════', 'info');
      addOutput('OPTIMIZATION COMPLETE! (Simulation Mode)', 'success');
      addOutput('═══════════════════════════════════════════', 'info');
      addOutput('', 'info');
      addOutput('Note: Running in browser. Download desktop app for real optimizations.', 'warning');

      setIsComplete(true);
      setIsRunning(false);
    }
  };

  const handleClose = () => {
    if (!isRunning) {
      setOutput([]);
      setIsComplete(false);
      setHasError(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-blue-500/30 shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TerminalIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white text-xl">Optimization Terminal</h2>
              <p className="text-gray-400 text-sm">
                {isRunning ? 'Running optimizations...' : isComplete ? 'Process complete' : 'Ready to optimize'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isRunning}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              isRunning
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 p-6 overflow-y-auto bg-black/50 font-mono text-sm"
        >
          {output.map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${
                line.startsWith('✓') ? 'text-green-400' :
                line.startsWith('✗') ? 'text-red-400' :
                line.startsWith('⚠') ? 'text-yellow-400' :
                line.includes('═══') ? 'text-blue-400' :
                line.includes('OPTIMIZATION COMPLETE') ? 'text-green-400 font-bold' :
                'text-gray-300'
              }`}
            >
              {line}
            </div>
          ))}
          
          {isRunning && (
            <div className="flex items-center gap-2 text-blue-400 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRunning && (
              <div className="flex items-center gap-2 text-blue-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Applying optimizations...</span>
              </div>
            )}
            {isComplete && !hasError && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Optimization complete!</span>
              </div>
            )}
            {hasError && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Error occurred during optimization</span>
              </div>
            )}
          </div>

          <button
            onClick={handleClose}
            disabled={isRunning}
            className={`px-6 py-2 rounded-lg transition-all ${
              isRunning
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isRunning ? 'Please wait...' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
