
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import GameCard from './components/GameCard.tsx';
import GameModal from './components/GameModal.tsx';

const App = () => {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch('./games.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setGames(data))
      .catch(err => console.error("Could not load library data:", err));
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const query = searchQuery.toLowerCase();
      return game.title.toLowerCase().includes(query) ||
             game.description.toLowerCase().includes(query) ||
             game.category.toLowerCase().includes(query);
    });
  }, [games, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col text-slate-200 bg-[#0a0f1d] selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-sm">
            Learning <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">Utilities</span>
          </h1>
          <p className="mt-4 text-slate-500 text-sm font-medium tracking-widest uppercase">
            Productivity & Logic Training Modules
          </p>
        </header>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in zoom-in-95 duration-500">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setSelectedGame} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-900/30 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">No modules found</h3>
            <p className="text-slate-400 mt-2 text-lg">Adjust your search parameters for broader results.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <footer className="bg-slate-900/50 backdrop-blur-md border-t border-slate-800/50 py-12 px-4 sm:px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default duration-500">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-white text-sm font-bold tracking-widest uppercase">Learning Utilities Portal</span>
          </div>
          <div className="text-slate-500 text-[10px] sm:text-xs max-w-2xl text-center leading-relaxed font-medium space-y-2 uppercase tracking-tight">
            <p>
              © 2024 Learning Utilities Group. Licensed under the Global Educational Open Access Agreement (GEOAA). 
              All interactive modules are provided as-is for logical research and academic simulation purposes. 
            </p>
            <p>
              Content is indexed from third-party sources and remains the intellectual property of original copyright holders. 
              Users are responsible for compliance with local network usage policies.
            </p>
          </div>
        </div>
      </footer>

      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
};

export default App;
