// DATA
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

window.onload = () => {
    lucide.createIcons();
    updateHeader();
    render();
};

function updateHeader() {
    document.getElementById('header-user-name').innerText = state.user.name;
    document.getElementById('header-avatar').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${state.user.seed}`;
    document.getElementById('header-gems').innerText = state.user.gems;
    document.getElementById('header-coins').innerText = state.user.coins.toLocaleString();
}

function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active-nav'));
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
    state.searchQuery = document.getElementById('search-input').value.toLowerCase();
    if (state.activeTab !== 'sims') switchTab('sims');
    else render();
}

function openProfileModal() {
    document.getElementById('modal-name-input').value = state.user.name;
    document.getElementById('modal-seed-input').value = state.user.seed;
    updateAvatarPreview();
    document.getElementById('profile-modal').classList.remove('hidden');
    lucide.createIcons();
}

<<<<<<< HEAD
function closeProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function updateAvatarPreview() {
    const seed = document.getElementById('modal-seed-input').value || 'User';
    document.getElementById('modal-avatar-preview').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
}

function saveProfile() {
    state.user.name = document.getElementById('modal-name-input').value;
    state.user.seed = document.getElementById('modal-seed-input').value;
    updateHeader();
    closeProfileModal();
    render();
}

function claimReward(id) {
    const c = state.challenges.find(ch => ch.id === id);
    if (c && c.progress >= c.total && !c.claimed) {
        c.claimed = true;
        state.user.gems += c.reward;
        if (c.badge && !state.user.badges.includes(c.badge)) {
            state.user.badges.push(c.badge);
        }
        updateHeader();
        render();
    }
}

function buyItem(id) {
    const item = shopItems.find(i => i.id === id);
    if (item && state.user.coins >= item.price) {
        state.user.coins -= item.price;
        state.user.inventory.push(id);
        updateHeader();
        render();
    }
}

function startSimulation(id) {
    const sim = state.sims.find(s => s.id === id);
    if (!sim || sim.status === 'Locked') return;
    document.getElementById('active-sim-title').innerText = sim.title;
    document.getElementById('active-sim-emoji').innerText = sim.image;
    document.getElementById('active-sim-progress-bar').style.width = `${sim.progress}%`;
    document.getElementById('sim-overlay').classList.remove('hidden');
    lucide.createIcons();
=======
    // Open secondary HTML file
    window.location.href = "simulation.html";
>>>>>>> 8189c35337064428d19690ec047e230dd8be14f0
}
function exitSimulation() {
    document.getElementById('sim-overlay').classList.add('hidden');
}

function render() {
    const container = document.getElementById('view-container');
    container.innerHTML = '';
    if (state.activeTab === 'dashboard') renderDashboard(container);
    else if (state.activeTab === 'sims') renderSims(container);
    else if (state.activeTab === 'challenges') renderChallenges(container);
    else if (state.activeTab === 'store') renderStore(container);
    else if (state.activeTab === 'profile') renderProfile(container);
    lucide.createIcons();
}

function renderDashboard(container) {
    const top3 = state.leaderboard.slice(0, 3);
    const others = state.leaderboard.slice(3);

    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-7 space-y-8">
                <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
                    <div class="relative z-10 flex justify-between items-start">
                        <div><h1 class="text-3xl font-black text-slate-800 leading-tight tracking-tight">Complete Today's Lab</h1><p class="text-slate-500 text-sm mt-1">Daily Research Target: 2 Experiments remaining.</p></div>
                        <div class="text-right">
                            <div class="text-4xl font-black text-blue-600">78%</div>
                            <div class="text-[10px] font-bold text-green-500 flex items-center justify-end uppercase tracking-widest"><i data-lucide="trending-up" class="w-3 h-3 mr-1"></i> +2.3%</div>
                        </div>
                    </div>
                    <div class="mt-8 flex items-end gap-2 h-32">${[40, 60, 30, 80, 50, 95, 70, 85, 40, 60, 50, 90].map(h => `<div class="flex-1 bg-slate-100 rounded-t-xl hover:bg-blue-500 transition-all duration-300" style="height: ${h}%"></div>`).join('')}</div>
                </div>

                <section>
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-black text-slate-800">Select Category</h3>
                        <button onclick="switchTab('sims')" class="text-blue-600 text-xs font-bold flex items-center gap-1">View All <i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div onclick="filterCategory('chemistry')" class="category-card bg-white p-5 rounded-[2rem] border border-slate-100 text-center cursor-pointer transition-all group">
                            <div class="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner"><i data-lucide="flask-conical"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Chemistry</h4>
                        </div>
                        <div onclick="filterCategory('physics')" class="category-card bg-white p-5 rounded-[2rem] border border-slate-100 text-center cursor-pointer transition-all group">
                            <div class="w-14 h-14 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner"><i data-lucide="zap"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Physics</h4>
                        </div>
                        <div onclick="filterCategory('history')" class="category-card bg-white p-5 rounded-[2rem] border border-slate-100 text-center cursor-pointer transition-all group">
                            <div class="w-14 h-14 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner"><i data-lucide="history"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">History</h4>
                        </div>
                        <div onclick="filterCategory('biology')" class="category-card bg-white p-5 rounded-[2rem] border border-slate-100 text-center cursor-pointer transition-all group">
                            <div class="w-14 h-14 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner"><i data-lucide="activity"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Biology</h4>
                        </div>
                    </div>
                </section>

                <section class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                     <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-black text-slate-800">Daily Quests Report</h3>
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wed, April 1</span>
                     </div>
                     <div class="space-y-5">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><i data-lucide="check-circle-2" class="w-5 h-5"></i></div>
                            <div class="flex-1">
                                <div class="flex justify-between mb-1 text-[11px] font-bold"><span>Login Streak</span><span class="text-blue-600">Complete!</span></div>
                                <div class="h-1.5 bg-slate-50 rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-full"></div></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shrink-0"><i data-lucide="circle" class="w-5 h-5"></i></div>
                            <div class="flex-1">
                                <div class="flex justify-between mb-1 text-[11px] font-bold"><span>Complete 1 Lab Simulation</span><span class="text-slate-400">0/1</span></div>
                                <div class="h-1.5 bg-slate-50 rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-0"></div></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shrink-0"><i data-lucide="circle" class="w-5 h-5"></i></div>
                            <div class="flex-1">
                                <div class="flex justify-between mb-1 text-[11px] font-bold"><span>Earn 100 Coins</span><span class="text-slate-400">42/100</span></div>
                                <div class="h-1.5 bg-slate-50 rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-[42%]"></div></div>
                            </div>
                        </div>
                     </div>
                </section>

                <section class="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-100 flex justify-between items-center group cursor-pointer" onclick="startSimulation(1)">
                    <div class="flex gap-6 items-center">
                        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-6 transition-transform">🧠</div>
                        <div><h3 class="text-xl font-bold">The Human Mind</h3><p class="text-blue-100 text-xs mt-1">Resume mapping neural pathways.</p></div>
                    </div>
                    <i data-lucide="play" class="fill-current w-6 h-6"></i>
                </section>
            </div>

            <div class="lg:col-span-5 flex flex-col space-y-4">
                <div class="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden min-h-[600px]">
                    <div class="absolute inset-0 podium-aura pointer-events-none"></div>
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-64 spotlight-beam opacity-20 pointer-events-none"></div>
                    
                    <div class="relative z-10 flex justify-between items-center mb-10">
                        <h3 class="text-xl font-black text-slate-800">Global Arena</h3>
                        <span class="text-[9px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">Season 4</span>
                    </div>

                    <div class="flex items-end justify-center gap-2 mb-14 relative z-10 pt-16">
                        <div class="flex flex-col items-center">
                            <div class="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden mb-3 bg-slate-50 relative z-10">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${top3[1].seed}" alt="rank2">
                            </div>
                            <div class="pedestal-2 w-20 h-28 rounded-t-[1.5rem] flex flex-col items-center justify-center text-white font-black shadow-lg relative">
                                <span class="text-sm opacity-80">#2</span>
                                <div class="absolute -bottom-7 text-[10px] text-slate-500 font-bold whitespace-nowrap bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">${top3[1].name.split(' ')[0]}</div>
                            </div>
                        </div>
                        <div class="flex flex-col items-center relative -top-8">
                            <div class="absolute -top-12 z-20 animate-bounce"><i data-lucide="crown" class="text-yellow-500 w-10 h-10 fill-current"></i></div>
                            <div class="w-24 h-24 rounded-full border-4 border-white gold-glow overflow-hidden mb-3 bg-slate-50 ring-4 ring-yellow-400/20 z-10">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${top3[0].seed}" alt="rank1">
                            </div>
                            <div class="pedestal-1 w-28 h-44 rounded-t-[2.5rem] flex flex-col items-center justify-center text-white font-black shadow-2xl relative">
                                <span class="text-3xl">#1</span>
                                <div class="absolute -bottom-8 text-xs text-slate-900 font-black whitespace-nowrap bg-yellow-400 px-4 py-1 rounded-full shadow-lg border-2 border-white">${top3[0].name.split(' ')[0]}</div>
                            </div>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden mb-3 bg-slate-50 relative z-10">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${top3[2].seed}" alt="rank3">
                            </div>
                            <div class="pedestal-3 w-20 h-20 rounded-t-[1.5rem] flex flex-col items-center justify-center text-white font-black shadow-lg relative">
                                <span class="text-xs opacity-80">#3</span>
                                <div class="absolute -bottom-7 text-[10px] text-slate-500 font-bold whitespace-nowrap bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">${top3[2].name.split(' ')[0]}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 space-y-3 pt-10 border-t border-slate-50 relative z-10 custom-scrollbar overflow-y-auto pr-1">
                        ${others.map(p => `
                            <div class="rank-card flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-200 group">
                                <div class="flex items-center gap-4">
                                    <span class="text-[11px] font-black text-slate-300 min-w-[20px]">#${p.rank}</span>
                                    <div class="relative">
                                        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${p.seed}" class="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                                        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                                            <div class="w-2 h-2 rounded-full ${p.division === 'Diamond' ? 'bg-blue-400' : p.division === 'Platinum' ? 'bg-purple-400' : 'bg-yellow-600'}"></div>
                                        </div>
                                    </div>
                                    <div><h5 class="text-sm font-bold text-slate-800">${p.name}</h5><span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">${p.division} LEAGUE</span></div>
                                </div>
                                <div class="text-right">
                                    <div class="text-[11px] font-black text-blue-700 tabular-nums">${p.points.toLocaleString()}</div>
                                    <div class="text-[7px] font-black ${p.trend === 'up' ? 'text-green-500' : 'text-red-400'} flex items-center justify-end uppercase tracking-tighter">
                                        <i data-lucide="${p.trend === 'up' ? 'arrow-up' : 'arrow-down'}" class="w-2.5 h-2.5 mr-0.5"></i> TREND
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSims(container) {
    const filtered = state.sims.filter(sim => {
        const matchesCat = state.selectedCategory === 'all' || sim.category === state.selectedCategory;
        const matchesSearch = sim.title.toLowerCase().includes(state.searchQuery);
        return matchesCat && matchesSearch;
        
    });

    container.innerHTML = `
        <div class="space-y-8 pb-10">
            <div class="flex justify-between items-end">
                <div><h1 class="text-3xl font-black text-slate-800 tracking-tight">Laboratory Catalog</h1><p class="text-slate-500 mt-1">Browse interactive simulations by category.</p></div>
                <div class="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                    ${['all', 'chemistry', 'physics', 'history', 'biology'].map(cat => `
                        <button onclick="filterCategory('${cat}')" class="px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${state.selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}">${cat.toUpperCase()}</button>
                    `).join('')}
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${filtered.map(sim => `
                    <div class="bg-white p-6 rounded-[2rem] border border-slate-100 transition-all hover:shadow-xl group">
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">${sim.image}</div>
                            <span class="text-[9px] font-black px-2 py-1 rounded-full uppercase ${sim.status === 'Locked' ? 'bg-slate-100 text-slate-400' : 'bg-green-100 text-green-600'}">${sim.status}</span>
                        </div>
                        <h3 class="font-bold text-slate-800 mb-4">${sim.title}</h3>
                        <div class="space-y-2 mb-6 text-[10px] font-bold text-slate-400">
                            <div class="flex justify-between uppercase tracking-widest"><span>Progress</span><span>${sim.progress}%</span></div>
                            <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden"><div class="h-full bg-blue-500" style="width:${sim.progress}%"></div></div>
                        </div>
                        <button onclick="startSimulation(${sim.id})" class="w-full py-3 ${sim.status === 'Locked' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'} rounded-xl text-xs font-bold transition-all">Start Laboratory</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderChallenges(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-8 pb-10">
            <h1 class="text-3xl font-black text-slate-800 text-center tracking-tight">Mastery Goals</h1>
            <div class="grid grid-cols-1 gap-4">
                ${state.challenges.map(c => `
                    <div class="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-8 relative overflow-hidden group">
                        <div class="w-16 h-16 bg-${c.color}-100 text-${c.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"><i data-lucide="${c.icon}"></i></div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1"><span class="text-[9px] font-black uppercase text-${c.color}-600 bg-${c.color}-50 px-2 py-0.5 rounded-full">${c.type} Challenge</span></div>
                            <h3 class="text-xl font-bold">${c.title}</h3>
                            <div class="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-${c.color}-500" style="width:${(c.progress/c.total)*100}%"></div></div>
                        </div>
                        <div class="text-center bg-blue-50 p-4 rounded-3xl min-w-[120px]">
                            <div class="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Reward</div>
                            <div class="text-lg font-black text-blue-700 flex items-center justify-center gap-1 mb-3"><i data-lucide="gem" class="w-4 h-4"></i> ${c.reward}</div>
                            <button onclick="claimReward('${c.id}')" class="w-full py-2 ${c.progress >= c.total && !c.claimed ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'} rounded-xl text-[10px] font-black">${c.claimed ? 'Claimed' : 'Claim'}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
function openIOTLab() {
    window.location.href = "iot.html";
}

function renderStore(container) {
    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-8 pb-10">
            <h1 class="text-3xl font-black text-slate-800 tracking-tight">Study Store</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${shopItems.map(item => `
                    <div class="bg-white p-6 rounded-[2.5rem] border border-slate-100 text-center flex flex-col items-center">
                        <div class="w-16 h-16 bg-${item.color}-100 text-${item.color}-600 rounded-[2rem] flex items-center justify-center mb-6"><i data-lucide="${item.icon}" class="w-8 h-8"></i></div>
                        <h3 class="font-bold text-slate-800 mb-6 text-sm">${item.title}</h3>
                        <button onclick="buyItem('${item.id}')" class="mt-auto w-full py-3 ${state.user.inventory.includes(item.id) ? 'bg-green-50 text-green-600' : 'bg-slate-900 text-white'} rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all">
                            ${state.user.inventory.includes(item.id) ? 'Purchased' : `<i data-lucide="coins" class="w-3 h-3"></i> ${item.price}`}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProfile(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-8 pb-10">
            <div class="bg-white rounded-[3rem] p-12 text-center shadow-sm border border-slate-100 relative">
                <button onclick="openProfileModal()" class="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl transition-all border border-slate-100"><i data-lucide="edit-3" class="w-5 h-5"></i></button>
                <div class="w-32 h-32 mx-auto mb-6 rounded-full border-8 border-slate-50 overflow-hidden shadow-xl ring-4 ring-blue-500/10"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=${state.user.seed}" /></div>
                <h2 class="text-3xl font-black text-slate-800 leading-tight">${state.user.name}</h2>
                <div class="flex items-center justify-center gap-2 mt-2"><span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-xs">Level ${state.user.level}</span></div>
            </div>

            <div class="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                <h3 class="text-xl font-bold mb-8 flex items-center gap-2"><i data-lucide="award" class="text-yellow-500"></i> My Badges</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    ${state.user.badges.map(bId => {
                        const b = state.badgeData[bId];
                        return `
                            <div class="flex flex-col items-center gap-3 group relative cursor-help">
                                <div class="w-16 h-16 ${b.bg} ${b.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"><i data-lucide="${b.icon}" class="w-8 h-8"></i></div>
                                <span class="text-[9px] font-black text-slate-800 uppercase tracking-widest text-center leading-tight">${b.name}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
} 
