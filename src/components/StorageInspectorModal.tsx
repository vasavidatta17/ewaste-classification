import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS, resetDatabaseToDemo } from '../utils/storage';
import { Database, RefreshCw, X, Copy, Check, FileJson, AlertTriangle } from 'lucide-react';
import { useToast } from './Toast';

interface StorageInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageInspectorModal: React.FC<StorageInspectorModalProps> = ({ isOpen, onClose }) => {
  const [selectedKey, setSelectedKey] = useState<string>(STORAGE_KEYS.USERS);
  const [dataSnapshot, setDataSnapshot] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const refreshData = () => {
    const snap: Record<string, any> = {};
    Object.values(STORAGE_KEYS).forEach(k => {
      try {
        const raw = localStorage.getItem(k);
        snap[k] = raw ? JSON.parse(raw) : null;
      } catch {
        snap[k] = localStorage.getItem(k);
      }
    });
    setDataSnapshot(snap);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    const currentVal = dataSnapshot[selectedKey];
    navigator.clipboard.writeText(JSON.stringify(currentVal, null, 2));
    setCopied(true);
    toast.success('Copied to Clipboard', `JSON data for ${selectedKey} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all Local Storage tables to initial demo data? This will restore sample users, bookings, and testimonials.')) {
      resetDatabaseToDemo();
      refreshData();
      toast.info('Database Reset', 'Local Storage initialized with fresh demo dataset.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Local Storage Database Explorer
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-md">
                  Browser Web API
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live inspection of stored JSON records for MCA project validation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Key selector sidebar */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-800 p-3 sm:p-4 bg-slate-950/40 space-y-2 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Database Tables / Keys
            </div>
            {Object.entries(STORAGE_KEYS).map(([label, key]) => {
              const val = dataSnapshot[key];
              const count = Array.isArray(val) ? val.length : val ? 1 : 0;
              const isSelected = selectedKey === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileJson className="w-4 h-4 shrink-0 opacity-80" />
                    <span className="truncate">{key}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans font-bold ${
                      isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count} {Array.isArray(val) ? 'rows' : 'item'}
                  </span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <button
                onClick={handleResetData}
                className="w-full py-2 px-3 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Reset Demo Database
              </button>
            </div>
          </div>

          {/* JSON Viewer */}
          <div className="md:col-span-8 p-4 flex flex-col min-h-0 bg-slate-900/90 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-400">
                Key: <strong className="text-white">{selectedKey}</strong>
              </span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1 rounded-md border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            </div>

            <pre className="flex-1 bg-slate-950 p-4 rounded-xl text-[11px] font-mono text-emerald-300/90 overflow-auto border border-slate-800 leading-relaxed">
              {JSON.stringify(dataSnapshot[selectedKey], null, 2) || '// Key is currently empty or not initialized'}
            </pre>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 text-[11px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
          <span>Persisted via browser <code>window.localStorage</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
