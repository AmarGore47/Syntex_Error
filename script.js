// DATA
const simulations = [
    { id: 1, title: "The Human Mind", description: "A deep dive into thoughts, emotions, creations, and behavior.", category: "biology", status: "Unlocked", progress: 65, image: "🧠", reward: 145, difficulty: "Advanced" },
    { id: 2, title: "Molecular Dynamics", description: "Explore the behavior of atoms in complex systems.", category: "chemistry", status: "In Progress", progress: 42, image: "🧪", reward: 120, difficulty: "Intermediate" },
    { id: 3, title: "Quantum Mechanics 101", description: "Understand the fundamental principles of quantum states.", category: "physics", status: "Locked", progress: 0, image: "⚛️", reward: 300, difficulty: "Expert" },
    { id: 4, title: "The Industrial Revolution", description: "Revisit the era that changed modern production forever.", category: "history", status: "Unlocked", progress: 100, image: "⚙️", reward: 80, difficulty: "Beginner" },
    { id: 5, title: "Cellular Respiration", description: "Visualize how cells convert nutrients into energy.", category: "biology", status: "Unlocked", progress: 15, image: "🧬", reward: 200, difficulty: "Intermediate" },
    { id: 6, title: "Acid-Base Titration", description: "Determine the concentration of an unknown acid solution.", category: "chemistry", status: "Unlocked", progress: 88, image: "⚗️", reward: 150, difficulty: "Beginner" }
];

let state = {
    activeTab: 'dashboard',
    selectedCategory: 'all',
    searchQuery: ''
};

// INITIALIZATION
window.onload = () => {
    lucide.createIcons();
    render();
};

// STATE ACTIONS
function switchTab(tabId) {
    state.activeTab = tabId;
    state.selectedCategory = 'all';
    
    // Update Nav UI
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active-nav');
        el.classList.add('text-slate-500', 'hover:bg-slate-50');
    });
    document.getElementById(`nav-${tabId}`).classList.add('active-nav');
    document.getElementById(`nav-${tabId}`).classList.remove('text-slate-500', 'hover:bg-slate-50');

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

function startSimulation(id) {
    const sim = simulations.find(s => s.id === id);
    if (sim.status === 'Locked') return;

    // Open secondary HTML file
    window.location.href = "simulation.html";
}
function exitSimulation() {
    document.getElementById('sim-overlay').classList.add('hidden');
}

// RENDERING ENGINE
function render() {
    const container = document.getElementById('view-container');
    container.innerHTML = '';

    if (state.activeTab === 'dashboard') {
        renderDashboard(container);
    } else if (state.activeTab === 'sims') {
        renderSims(container);
    } else if (state.activeTab === 'challenges') {
        renderChallenges(container);
    } else if (state.activeTab === 'profile') {
        renderProfile(container);
    }

    lucide.createIcons();
}

function renderDashboard(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
                <!-- Progress Hero -->
                <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <h2 class="text-slate-400 font-medium mb-1 uppercase tracking-wider text-xs">Overall Progress</h2>
                            <h1 class="text-3xl font-extrabold text-slate-800">Complete Today's Tasks</h1>
                            <p class="text-slate-500 mt-2">You have 12 challenges active this week.</p>
                        </div>
                        <div class="text-right">
                            <div class="text-4xl font-black text-slate-800">78%</div>
                            <div class="flex items-center gap-1 text-green-500 text-xs font-bold justify-end">
                                <i data-lucide="trending-up" class="w-3 h-3"></i> 2.3%
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 flex items-end gap-2 h-32">
                        ${[40, 20, 60, 45, 80, 50, 90, 70, 65, 85, 95, 100].map(h => `
                            <div class="flex-1 bg-slate-100 rounded-t-lg relative group transition-all duration-300 hover:bg-blue-500" style="height: ${h}%">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${h}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Categories -->
                <section>
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold">Select Category</h3>
                        <button onclick="switchTab('sims')" class="text-blue-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View all <i data-lucide="chevron-right" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div onclick="filterCategory('chemistry')" class="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div class="bg-orange-100 text-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="flask-conical"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Chemistry</h4>
                        </div>
                        <div onclick="filterCategory('biology')" class="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div class="bg-blue-100 text-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="activity"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Biology</h4>
                        </div>
                        <div onclick="filterCategory('physics')" class="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div class="bg-green-100 text-green-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="target"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">Physics</h4>
                        </div>
                        <div onclick="filterCategory('history')" class="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div class="bg-purple-100 text-purple-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="history"></i></div>
                            <h4 class="font-bold text-slate-800 text-sm">History</h4>
                        </div>
                    </div>
                </section>

                <!-- Featured Simulation -->
                <section class="bg-[#FFF9E5] rounded-[2.5rem] p-8 flex items-center justify-between border border-orange-100/50 group">
                    <div class="flex gap-6 items-center">
                        <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm group-hover:rotate-6 transition-transform">🧠</div>
                        <div>
                            <h3 class="text-xl font-black text-slate-800">The Human Mind</h3>
                            <p class="text-slate-600 text-xs mt-1">Advanced cognitive research simulation.</p>
                        </div>
                    </div>
                    <button onclick="startSimulation(1)" class="bg-slate-900 text-white p-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                        <i data-lucide="play" class="w-6 h-6 fill-white"></i>
                    </button>
                </section>
            </div>

            <!-- Right Column: Leaderboard & Challenges -->
            <div class="space-y-8">
                <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                    <h3 class="font-bold mb-6">Top Students</h3>
                    <div class="space-y-4">
                        ${['Jack', 'Brody', 'Timothy'].map((name, i) => `
                            <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                                <div class="flex items-center gap-3">
                                    <span class="font-bold text-slate-400 text-xs">#${i+1}</span>
                                    <div class="w-8 h-8 rounded-full bg-white overflow-hidden shadow-sm">
                                        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${name}" />
                                    </div>
                                    <span class="font-bold text-slate-700 text-xs">${name}</span>
                                </div>
                                <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                                    <i data-lucide="gem" class="w-2 h-2 text-blue-500"></i>
                                    <span class="text-[10px] font-black">48K</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                     <h3 class="font-bold mb-6">Daily Quests</h3>
                     <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center"><i data-lucide="flask-conical" class="w-4 h-4"></i></div>
                            <div class="flex-1"><h4 class="text-xs font-bold">Lab Master</h4><div class="h-1 w-full bg-slate-100 mt-1 rounded-full"><div class="h-full bg-orange-500 w-1/2 rounded-full"></div></div></div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center"><i data-lucide="target" class="w-4 h-4"></i></div>
                            <div class="flex-1"><h4 class="text-xs font-bold">Deep Focus</h4><div class="h-1 w-full bg-slate-100 mt-1 rounded-full"><div class="h-full bg-blue-500 w-1/3 rounded-full"></div></div></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    `;
}

function renderSims(container) {
    const filtered = simulations.filter(sim => {
        const matchesCat = state.selectedCategory === 'all' || sim.category === state.selectedCategory;
        const matchesSearch = sim.title.toLowerCase().includes(state.searchQuery);
        return matchesCat && matchesSearch;
    });

    const categoriesList = [
        { id: 'all', name: 'All' },
        { id: 'chemistry', name: 'Chemistry' },
        { id: 'biology', name: 'Biology' },
        { id: 'physics', name: 'Physics' },
        { id: 'history', name: 'History' }
    ];

    container.innerHTML = `
        <div class="space-y-8">
            <div class="flex justify-between items-end">
                <div>
                    <h1 class="text-3xl font-black text-slate-800">Simulations</h1>
                    <p class="text-slate-500 text-sm mt-1">Explore interactive laboratories.</p>
                </div>
                <div class="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                    ${categoriesList.map(cat => `
                        <button onclick="filterCategory('${cat.id}')" class="px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${state.selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}">
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                ${filtered.map(sim => `
                    <div class="bg-white rounded-[2rem] p-6 border border-slate-100 transition-all sim-card ${sim.status === 'Locked' ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'}">
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl border border-slate-100 shadow-sm">${sim.image}</div>
                            <div class="text-right">
                                <span class="text-[9px] font-black px-2 py-1 rounded-full uppercase ${sim.status === 'Locked' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-600'}">${sim.status}</span>
                                <div class="text-[9px] font-bold text-slate-400 mt-1">${sim.difficulty}</div>
                            </div>
                        </div>
                        <h3 class="font-bold text-slate-800">${sim.title}</h3>
                        <p class="text-slate-500 text-[11px] mt-2 mb-6 line-clamp-2">${sim.description}</p>
                        <div class="space-y-4">
                            <div class="flex justify-between text-[10px] font-bold">
                                <span class="text-slate-400 uppercase tracking-widest">Progress</span>
                                <span>${sim.progress}%</span>
                            </div>
                            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full bg-blue-500 transition-all duration-1000" style="width: ${sim.progress}%"></div>
                            </div>
                            <div class="flex justify-between items-center pt-2">
                                <div class="flex items-center gap-1 text-blue-600 font-black text-xs">
                                    <i data-lucide="gem" class="w-3 h-3"></i> +${sim.reward}
                                </div>
                                <button onclick="startSimulation(${sim.id})" class="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-slate-800 flex items-center gap-1">
                                    ${sim.progress > 0 ? 'Resume' : 'Start'} <i data-lucide="play" class="w-3 h-3 fill-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderChallenges(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-8">
            <h1 class="text-3xl font-black text-slate-800">Challenges</h1>
            <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-12">
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <h3 class="font-bold flex items-center gap-2"><i data-lucide="target" class="text-blue-500"></i> Weekly Simulation Goal</h3>
                        <span class="font-black text-blue-600">+500 Gems</span>
                    </div>
                    <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
                        <div class="h-full bg-blue-500 rounded-full w-3/4"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>75% COMPLETED</span>
                        <span>3 DAYS LEFT</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <h3 class="font-bold flex items-center gap-2"><i data-lucide="award" class="text-orange-500"></i> Perfectionist</h3>
                        <span class="font-black text-blue-600">+200 Gems</span>
                    </div>
                    <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
                        <div class="h-full bg-orange-500 rounded-full w-1/4"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>25% COMPLETED</span>
                        <span>NO TIME LIMIT</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProfile(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-[3rem] p-12 text-center shadow-sm border border-slate-100">
                <div class="relative w-32 h-32 mx-auto mb-6">
                    <div class="w-full h-full rounded-full border-8 border-slate-50 overflow-hidden shadow-xl">
                        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix" />
                    </div>
                    <div class="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full border-4 border-white shadow-lg">
                        <i data-lucide="settings" class="w-4 h-4"></i>
                    </div>
                </div>
                <h2 class="text-2xl font-black text-slate-800">Felix Scientist</h2>
                <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Level 24 Master</p>
                
                <div class="grid grid-cols-3 gap-8 mt-12 w-full pt-12 border-t border-slate-50">
                    <div>
                        <div class="text-xl font-black text-slate-800">1,240</div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase">Points</div>
                    </div>
                    <div>
                        <div class="text-xl font-black text-slate-800">42</div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase">Sims</div>
                    </div>
                    <div>
                        <div class="text-xl font-black text-slate-800">#12</div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase">Rank</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
