// Vanilla JavaScript implementation for Learning Utilities
// No React, No JSX, No Babel required.

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
        gamesGrid.innerHTML = `<p class="col-span-full text-center text-red-400 py-12">Failed to load system modules. Please check your connection.</p>`;
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
        
        card.innerHTML = `
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] to-transparent opacity-80"></div>
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 text-[10px] uppercase font-black text-white bg-indigo-500/80 backdrop-blur-sm rounded-full">${game.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">${game.title}</h3>
                <p class="text-sm text-slate-400 mt-2 line-clamp-2">${game.description}</p>
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
        game.title.toLowerCase().includes(query) || 
        game.category.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
    renderGames();
});

// Modal Logic
function openGame(game) {
    modalTitle.textContent = game.title;
    gameIframe.src = game.url;
    gameModal.classList.remove('hidden');
    document.body.classList.add('modal-active');
}

function closeGame() {
    gameModal.classList.add('hidden');
    gameIframe.src = '';
    document.body.classList.remove('modal-active');
}

closeModal.addEventListener('click', closeGame);
closeModalBtn.addEventListener('click', closeGame);

// Close on outside click
gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) closeGame();
});

// Start the app
init();