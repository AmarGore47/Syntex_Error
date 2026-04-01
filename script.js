// =====================
// APPLICATION STATE
// =====================
const state = {
    activeTab: 'dashboard',
    selectedCategory: 'all',
    searchQuery: '',
    user: {
        name: "Felix Scientist",
        seed: "Felix",
        level: 24,
        gems: 144,
        coins: 2321,
        points: 1240,
        simsCompleted: 42,
        badges: ["atom", "brain"],
        inventory: []
    },
    leaderboard: [
        { name: "Brody Bennet", points: 48522, rank: 1, seed: "Brody", trend: 'up', division: 'Diamond' },
        { name: "Jack Nicholson", points: 41322, rank: 2, seed: "Jack", trend: 'up', division: 'Diamond' },
        { name: "Timothy Bell", points: 21780, rank: 3, seed: "Tim", trend: 'down', division: 'Platinum' },
        { name: "Sarah Connor", points: 19231, rank: 4, seed: "Sarah", trend: 'up', division: 'Platinum' },
        { name: "Alex Mercer", points: 18522, rank: 5, seed: "Alex", trend: 'same', division: 'Gold' },
        { name: "Lara Croft", points: 17100, rank: 6, seed: "Lara", trend: 'up', division: 'Gold' },
        { name: "Nathan Drake", points: 16500, rank: 7, seed: "Drake", trend: 'down', division: 'Silver' }
    ],
    challenges: [
        { id: 'c1', title: "Titration King", type: "Daily", progress: 10, total: 32, reward: 200, badge: 'flask-conical', claimed: false, icon: "flask-conical", color: "orange" },
        { id: 'c2', title: "Energy Pioneer", type: "Weekly", progress: 5, total: 5, reward: 500, badge: 'zap', claimed: false, icon: "zap", color: "blue" },
        { id: 'c3', title: "Micro-Explorer", type: "Legendary", progress: 12, total: 20, reward: 1000, badge: 'microscope', claimed: false, icon: "microscope", color: "green" }
    ],
    sims: [
        { id: 1, title: "The Human Mind", image: "🧠", status: "Unlocked", progress: 65, difficulty: "Advanced", category: "biology" },
        { id: 2, title: "Molecular Fusion", image: "🧪", status: "In Progress", progress: 42, difficulty: "Intermediate", category: "chemistry" },
        { id: 3, title: "Acid-Base Titration", image: "⚗️", status: "Unlocked", progress: 0, difficulty: "Beginner", category: "chemistry" },
        { id: 4, title: "Microscope Lab", image: "🔬", status: "Unlocked", progress: 15, difficulty: "Intermediate", category: "biology" },
        { id: 5, title: "Circuit Builder", image: "🔋", status: "Unlocked", progress: 85, difficulty: "Intermediate", category: "physics" },
        { id: 6, title: "Periodic Table Quest", image: "📔", status: "Unlocked", progress: 10, difficulty: "Beginner", category: "chemistry" }
    ],
    badgeData: {
        "atom": { name: "Quantum Starter", icon: "atom", color: "text-blue-500", bg: "bg-blue-100" },
        "brain": { name: "Mind Specialist", icon: "brain", color: "text-purple-500", bg: "bg-purple-100" },
        "zap": { name: "Energy Pioneer", icon: "zap", color: "text-yellow-500", bg: "bg-yellow-100" },
        "flask-conical": { name: "Titration King", icon: "flask-conical", color: "text-orange-500", bg: "bg-orange-100" },
        "microscope": { name: "Micro-Explorer", icon: "microscope", color: "text-green-500", bg: "bg-green-100" }
    }
};

const shopItems = [
    { id: 'm1', title: "Organic Chemistry PDF", price: 500, type: "PDF Guide", icon: "book-open", color: "orange" },
    { id: 'm2', title: "Quantum Masterclass", price: 1200, type: "Video Course", icon: "play-circle", color: "blue" },
    { id: 'm3', title: "Lab Safety Toolkit", price: 300, type: "Interactive", icon: "shield-check", color: "green" }
];

// =====================
// INITIALIZE APP
// =====================
window.onload = () => {
    lucide.createIcons();
    updateHeader();
    render();
};

// =====================
// HEADER UPDATE
// =====================
function updateHeader() {
    const nameEl = document.getElementById('header-user-name');
    const avatarEl = document.getElementById('header-avatar');
    const gemsEl = document.getElementById('header-gems');
    const coinsEl = document.getElementById('header-coins');

    if (nameEl) nameEl.innerText = state.user.name;
    if (avatarEl) avatarEl.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${state.user.seed}`;
    if (gemsEl) gemsEl.innerText = state.user.gems;
    if (coinsEl) coinsEl.innerText = state.user.coins.toLocaleString();
}

// =====================
// NAVIGATION
// =====================
function switchTab(tabId) {
    state.activeTab = tabId;

    document.querySelectorAll('.nav-item').forEach(el => 
        el.classList.remove('active-nav')
    );

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) activeNav.classList.add('active-nav');

    render();
}

function filterCategory(catId) {
    state.activeTab = 'sims';
    state.selectedCategory = catId;
    render();
}

function handleSearch() {
    const input = document.getElementById('search-input');
    state.searchQuery = input ? input.value.toLowerCase() : '';
    render();
}

// =====================
// SIMULATION ROUTING
// =====================
function startSimulation(id) {
    const sim = state.sims.find(s => s.id === id);
    if (!sim || sim.status === 'Locked') return;

    if (sim.category === "chemistry") {
        window.location.href = "chemistry.html";
    } 
    else if (sim.category === "physics") {
        window.location.href = "physics.html";
    } 
    else if (sim.category === "biology") {
        window.location.href = "biology.html";
    } 
    else {
        window.location.href = "simulation.html";
    }
}

// =====================
// DASHBOARD + VIEWS
// =====================
function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.innerHTML = '';

    if (state.activeTab === 'dashboard') renderDashboard(container);
    else if (state.activeTab === 'sims') renderSims(container);
    else if (state.activeTab === 'challenges') renderChallenges(container);
    else if (state.activeTab === 'store') renderStore(container);
    else if (state.activeTab === 'profile') renderProfile(container);

    lucide.createIcons();
}

// =====================
// DASHBOARD VIEW
// =====================
function renderDashboard(container) {
    container.innerHTML = `
        <h1 class="text-3xl font-black mb-6">Welcome back, ${state.user.name}</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${state.sims.slice(0,3).map(sim => `
                <div class="bg-white p-6 rounded-2xl border">
                    <div class="text-4xl mb-4">${sim.image}</div>
                    <h3 class="font-bold mb-2">${sim.title}</h3>
                    <button onclick="startSimulation(${sim.id})"
                        class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
                        Start Simulation
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// =====================
// SIMULATION LIST VIEW
// =====================
function renderSims(container) {
    const filtered = state.sims.filter(sim => {
        const matchesCat = state.selectedCategory === 'all' || sim.category === state.selectedCategory;
        const matchesSearch = sim.title.toLowerCase().includes(state.searchQuery);
        return matchesCat && matchesSearch;
    });

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filtered.map(sim => `
                <div class="bg-white p-6 rounded-2xl border">
                    <div class="text-4xl mb-3">${sim.image}</div>
                    <h3 class="font-bold mb-2">${sim.title}</h3>
                    <button onclick="startSimulation(${sim.id})"
                        class="mt-3 w-full bg-slate-900 text-white py-2 rounded-xl text-sm">
                        Start Laboratory
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// =====================
// CHALLENGES VIEW
// =====================
function renderChallenges(container) {
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">Challenges</h1>
        ${state.challenges.map(c => `
            <div class="bg-white p-4 rounded-xl border mb-3">
                <div class="flex justify-between">
                    <span>${c.title}</span>
                    <span>${c.progress}/${c.total}</span>
                </div>
            </div>
        `).join('')}
    `;
}

// =====================
// STORE VIEW
// =====================
function renderStore(container) {
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">Store</h1>
        <div class="grid grid-cols-3 gap-4">
            ${shopItems.map(item => `
                <div class="bg-white p-4 rounded-xl border text-center">
                    <h3>${item.title}</h3>
                    <button onclick="buyItem('${item.id}')"
                        class="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                        ${item.price} coins
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// =====================
// PROFILE VIEW
// =====================
function renderProfile(container) {
    container.innerHTML = `
        <div class="text-center">
            <img class="mx-auto w-24 h-24 rounded-full"
                src="https://api.dicebear.com/7.x/bottts/svg?seed=${state.user.seed}">
            <h2 class="text-xl font-bold mt-3">${state.user.name}</h2>
        </div>
    `;
}
