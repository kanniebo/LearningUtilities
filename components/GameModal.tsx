
import React, { useEffect } from 'react';

const GameModal = ({ game, onClose }) => {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [game]);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-950/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-7xl flex flex-col bg-slate-900 shadow-2xl overflow-hidden rounded-none sm:rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-white leading-tight">{game.title}</h2>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{game.category} Module</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors group"
          >
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow bg-black relative">
          <iframe 
            src={game.url} 
            title={game.title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="px-6 py-4 bg-slate-900/50 flex items-center justify-end gap-2 border-t border-slate-800">
          <button 
            onClick={() => window.open(game.url, '_blank')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700"
          >
            Pop-out
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20"
          >
            Exit Utility
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
