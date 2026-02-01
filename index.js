// Vanilla JavaScript implementation for Learning Utilities
// Maps data from the SwarmIntelli CDN structure.

let allGames = [];
let filteredGames = [];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const gameModal = document.getElementById('gameModal');
const gameIframe = document.getElementById('gameIframe');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Initialize application
async function init() {
    try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to load games data');
        const data = await response.json();
        
        // Handle cases where data might be wrapped in an object or property
        if (Array.isArray(data)) {
            allGames = data;
        } else if (data.games && Array.isArray(data.games)) {
            allGames = data.games;
        } else if (data.data && Array.isArray(data.data)) {
            allGames = data.data;
        } else {
            allGames = [data]; // Single object case
        }

        filteredGames = [...allGames];
        renderGames();
    } catch (error) {
        console.error('Initialization Error:', error);
        gamesGrid.innerHTML = `<div class="col-span-full text-center py-12">
            <p class="text-red-400 font-bold">Failed to load content.</p>
            <p class="text-slate-500 text-sm mt-2">Please ensure games.json is valid and accessible.</p>
        </div>`;
    }
}

// Render the grid of games
function renderGames() {
    gamesGrid.innerHTML = '';
    
    if (filteredGames.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    filteredGames.forEach(game => {
        if (!game) return;
        
        const card = document.createElement('div');
        card.className = "group relative bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2 hover:shadow-2xl";
        
        // Robust property mapping for different JSON structures
        const title = game.game_title || game.title || game.name || 'Untitled Game';
        const thumb = game.game_image_icon || game.image || game.thumb || game.thumbnail || 'https://images.unsplash.com/photo-1550745679-361093f4955b?auto=format&fit=crop&q=80&w=600';

        card.innerHTML = `
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${thumb}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] to-transparent opacity-80"></div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">${title}</h3>
            </div>
        `;

        card.addEventListener('click', () => openGame(game));
        gamesGrid.appendChild(card);
    });
}

// Safer URL extraction from iframe strings
function extractIframeUrl(source) {
    if (!source) return '';
    const trimmed = source.trim();
    
    // If it's already just a URL
    if (trimmed.startsWith('http')) return trimmed;
    
    // If it's an iframe tag, use a temporary DOM element to parse it
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(trimmed, 'text/html');
        const iframe = doc.querySelector('iframe');
        return iframe ? iframe.getAttribute('src') : '';
    } catch (e) {
        console.warn('Failed to parse iframe string:', e);
        // Fallback to simple regex if DOMParser fails
        const match = trimmed.match(/src=["']([^"']+)["']/i);
        return match ? match[1] : '';
    }
}

// Modal Logic
function openGame(game) {
    const title = game.game_title || game.title || game.name || 'Game';
    modalTitle.textContent = title;
    
    const targetSource = game.iframe || game.url || game.link;
    const url = extractIframeUrl(targetSource);
    
    // Reset iframe to clear any previous state
    gameIframe.src = 'about:blank';
    
    if (url) {
        // Use a small delay to ensure 'about:blank' triggers before the new URL
        setTimeout(() => {
            gameIframe.src = url;
        }, 10);
    } else if (targetSource && targetSource.includes('<iframe')) {
        // Fallback for weird strings that didn't parse a src but are definitely HTML
        gameIframe.srcdoc = targetSource;
    } else {
        console.error('No valid game source found:', game);
    }
    
    gameModal.classList.remove('hidden');
    document.body.classList.add('modal-active');
}

function closeGame() {
    gameModal.classList.add('hidden');
    gameIframe.src = 'about:blank';
    document.body.classList.remove('modal-active');
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filteredGames = allGames.filter(game => {
        const title = (game.game_title || game.title || game.name || '').toLowerCase();
        return title.includes(query);
    });
    renderGames();
});

// Fullscreen Trigger
fullscreenBtn.addEventListener('click', () => {
    try {
        if (gameIframe.requestFullscreen) {
            gameIframe.requestFullscreen();
        } else if (gameIframe.webkitRequestFullscreen) {
            gameIframe.webkitRequestFullscreen();
        } else if (gameIframe.msRequestFullscreen) {
            gameIframe.msRequestFullscreen();
        }
    } catch (err) {
        console.error('Fullscreen error:', err);
    }
});

closeModal.addEventListener('click', closeGame);
closeModalBtn.addEventListener('click', closeGame);

gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) closeGame();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !gameModal.classList.contains('hidden')) {
        closeGame();
    }
});

init();