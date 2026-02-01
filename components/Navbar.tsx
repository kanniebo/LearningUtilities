
import React from 'react';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1d]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.location.reload()}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            Learning<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">Utilities</span>
          </span>
        </div>

        <div className="relative w-full sm:w-80 md:w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-indigo-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border-2 border-transparent rounded-2xl bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-500/50 focus:bg-slate-900 transition-all shadow-inner text-base"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
