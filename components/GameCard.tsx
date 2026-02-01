
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-80"></div>
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
           </div>
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-[10px] uppercase font-black tracking-widest text-white bg-indigo-500/80 backdrop-blur-sm rounded-full shadow-lg">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 leading-tight">
          {game.title}
        </h3>
        <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed font-medium">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
