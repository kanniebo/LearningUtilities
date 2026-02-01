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
        allGames = await response.json();
        filteredGames = [...allGames];
        renderGames();
    } catch (error) {
        console.error('Initialization Error:', error);
        gamesGrid.innerHTML = `<p class="col-span-full text-center text-red-400 py-12">Failed to load content. Please check your connection.</p>`;
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
        const card = document.createElement('div');
        card.className = "group relative bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2 hover:shadow-2xl";
        
        const thumb = game.game_image_icon || 'https://images.unsplash.com/photo-1550745679-361093f4955b?auto=format&fit=crop&q=80&w=600';
        const title = game.game_title || 'Untitled Module';

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

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filteredGames = allGames.filter(game => 
        (game.game_title && game.game_title.toLowerCase().includes(query))
    );
    renderGames();
});

// Modal Logic
function openGame(game) {
    modalTitle.textContent = game.game_title;
    let targetSource = game.iframe;
    
    // Clear previous content
    gameIframe.removeAttribute('srcdoc');
    gameIframe.src = 'about:blank';

    if (targetSource.includes('<iframe')) {
        const match = targetSource.match(/src=["']([^"']+)["']/);
        if (match && match[1]) {
            gameIframe.src = match[1];
        } else {
            // Fallback to srcdoc if no src attribute but it's an iframe string
            gameIframe.srcdoc = targetSource;
        }
    } else {
        gameIframe.src = targetSource;
    }
    
    gameModal.classList.remove('hidden');
    document.body.classList.add('modal-active');
}

function closeGame() {
    gameModal.classList.add('hidden');
    gameIframe.src = '';
    gameIframe.removeAttribute('srcdoc');
    document.body.classList.remove('modal-active');
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

// Fullscreen Trigger
fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
        gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
        gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
        gameIframe.msRequestFullscreen();
    }
});

closeModal.addEventListener('click', closeGame);
closeModalBtn.addEventListener('click', closeGame);

gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) closeGame();
});

init();