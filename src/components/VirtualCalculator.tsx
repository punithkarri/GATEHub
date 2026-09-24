import React, { useState } from 'react';
import { Calculator as CalcIcon, X } from 'lucide-react';

interface VirtualCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualCalculator: React.FC<VirtualCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [isRad, setIsRad] = useState(true);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (op: string) => {
    if (display.endsWith('+') || display.endsWith('-') || display.endsWith('*') || display.endsWith('/')) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + ' ' + op + ' ');
    }
  };

  const handleClear = () => setDisplay('0');

  const handleBackspace = () => {
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay(display.trimEnd().slice(0, -1).trimEnd());
    }
  };

  const handleEvaluate = () => {
    try {
      const expr = display.replace(/×/g, '*').replace(/÷/g, '/');
      // Safe indirect evaluation using Function constructor
      const safeEval = new Function(`"use strict"; return (${expr});`);
      const res = safeEval();
      if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
        setDisplay('Error');
      } else {
        setDisplay(Number(res.toFixed(6)).toString());
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleFunction = (fn: string) => {
    try {
      const val = parseFloat(display);
      if (isNaN(val)) return;

      let result = 0;
      const angleMultiplier = isRad ? 1 : Math.PI / 180;

      switch (fn) {
        case 'sin': result = Math.sin(val * angleMultiplier); break;
        case 'cos': result = Math.cos(val * angleMultiplier); break;
        case 'tan': result = Math.tan(val * angleMultiplier); break;
        case 'ln': result = Math.log(val); break;
        case 'log': result = Math.log10(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'sqr': result = val * val; break;
        case 'inv': result = 1 / val; break;
        case 'factorial':
          result = 1;
          for (let i = 2; i <= Math.min(val, 170); i++) result *= i;
          break;
        default: break;
      }
      setDisplay(Number(result.toFixed(6)).toString());
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
      {/* Header */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between cursor-move select-none">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
          <CalcIcon className="w-4 h-4" />
          <span>GATE Virtual Scientific Calculator</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsRad(!isRad)} className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-indigo-300 border border-slate-700">
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <button onClick={onClose} className="p-1 hover:text-white text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Screen */}
      <div className="p-3 bg-slate-950 text-right font-mono text-xl font-bold text-emerald-400 overflow-x-auto border-b border-slate-800 tracking-wider">
        {display}
      </div>

      {/* Grid Keyboard */}
      <div className="p-3 grid grid-cols-5 gap-1 text-xs">
        {/* Row 1 Scientific Functions */}
        <button onClick={() => handleFunction('sin')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold">sin</button>
        <button onClick={() => handleFunction('cos')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold">cos</button>
        <button onClick={() => handleFunction('tan')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold">tan</button>
        <button onClick={() => handleFunction('ln')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold">ln</button>
        <button onClick={() => handleFunction('log')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold">log</button>

        {/* Row 2 Functions */}
        <button onClick={() => handleFunction('sqrt')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold">√</button>
        <button onClick={() => handleFunction('sqr')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold">x²</button>
        <button onClick={() => handleFunction('inv')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold">1/x</button>
        <button onClick={() => handleFunction('factorial')} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold">n!</button>
        <button onClick={handleBackspace} className="p-2 rounded bg-rose-600/30 text-rose-300 font-semibold hover:bg-rose-600/50">⌫</button>

        {/* Row 3 Digits & Basic Ops */}
        <button onClick={() => handleDigit('7')} className="p-2.5 rounded bg-slate-800/90 font-bold">7</button>
        <button onClick={() => handleDigit('8')} className="p-2.5 rounded bg-slate-800/90 font-bold">8</button>
        <button onClick={() => handleDigit('9')} className="p-2.5 rounded bg-slate-800/90 font-bold">9</button>
        <button onClick={() => handleOp('/')} className="p-2.5 rounded bg-indigo-600/30 text-indigo-300 font-bold">÷</button>
        <button onClick={handleClear} className="p-2.5 rounded bg-rose-600 text-white font-bold">C</button>

        {/* Row 4 */}
        <button onClick={() => handleDigit('4')} className="p-2.5 rounded bg-slate-800/90 font-bold">4</button>
        <button onClick={() => handleDigit('5')} className="p-2.5 rounded bg-slate-800/90 font-bold">5</button>
        <button onClick={() => handleDigit('6')} className="p-2.5 rounded bg-slate-800/90 font-bold">6</button>
        <button onClick={() => handleOp('*')} className="p-2.5 rounded bg-indigo-600/30 text-indigo-300 font-bold">×</button>
        <button onClick={() => handleDigit('(')} className="p-2.5 rounded bg-slate-800 text-slate-300">(</button>

        {/* Row 5 */}
        <button onClick={() => handleDigit('1')} className="p-2.5 rounded bg-slate-800/90 font-bold">1</button>
        <button onClick={() => handleDigit('2')} className="p-2.5 rounded bg-slate-800/90 font-bold">2</button>
        <button onClick={() => handleDigit('3')} className="p-2.5 rounded bg-slate-800/90 font-bold">3</button>
        <button onClick={() => handleOp('-')} className="p-2.5 rounded bg-indigo-600/30 text-indigo-300 font-bold">-</button>
        <button onClick={() => handleDigit(')')} className="p-2.5 rounded bg-slate-800 text-slate-300">)</button>

        {/* Row 6 */}
        <button onClick={() => handleDigit('0')} className="p-2.5 rounded bg-slate-800/90 font-bold col-span-2">0</button>
        <button onClick={() => handleDigit('.')} className="p-2.5 rounded bg-slate-800/90 font-bold">.</button>
        <button onClick={() => handleOp('+')} className="p-2.5 rounded bg-indigo-600/30 text-indigo-300 font-bold">+</button>
        <button onClick={handleEvaluate} className="p-2.5 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-500">=</button>
      </div>
    </div>
  );
};
