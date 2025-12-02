import { experiences } from '../../core/data.js';

const experienceContainer = document.getElementById('experience-container');
if (experienceContainer && experiences) {
    experiences.forEach(exp => {
        const expCard = `
            <div class="relative group">
                <!-- 1️⃣ Nœud Planétaire (Timeline Dot) -->
                <div class="absolute -left-[43px] md:-left-[59px] top-2 h-5 w-5 rounded-full bg-slate-950 border-2 border-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.9)] transition-all duration-300 z-20">
                    <!-- Point lumineux central -->
                    <div class="absolute inset-[5px] rounded-full bg-sky-400/40 group-hover:bg-sky-300/60 transition-colors"></div>
                </div>
                
                <!-- 2️⃣ Carte Mission (Style HUD Glassmorphic) -->
                <div class="relative p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-md hover:bg-slate-800/40 hover:border-sky-500/40 hover:shadow-[0_8px_40px_-10px_rgba(14,165,233,0.2)] transition-all duration-300 group-hover:-translate-y-1">
                    
                    <!-- Coin décoratif (Top Right) style terminal -->
                    <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                        <div class="absolute top-0 right-0 w-2 h-2 bg-sky-500/60 rounded-sm"></div>
                        <div class="absolute top-0 right-2 w-10 h-[1px] bg-gradient-to-r from-sky-500/50 to-transparent"></div>
                        <div class="absolute top-2 right-0 h-10 w-[1px] bg-gradient-to-b from-sky-500/50 to-transparent"></div>
                    </div>

                    <!-- Header: Rôle + Date -->
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <h3 class="text-xl font-bold text-white group-hover:text-sky-400 transition-colors leading-tight">
                            ${exp.role}
                        </h3>
                        <span class="font-mono text-xs px-3 py-1.5 rounded-md bg-blue-950/60 text-sky-300 border border-blue-900/50 whitespace-nowrap tracking-wider shadow-inner">
                            📅 ${exp.period}
                        </span>
                    </div>

                    <!-- Entreprise + Lieu -->
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 mb-4">
                        <span class="flex items-center gap-2">
                            <i data-lucide="building-2" class="w-4 h-4 text-blue-400"></i>
                            <span class="font-medium">${exp.company}</span>
                        </span>
                        <span class="flex items-center gap-2">
                            <i data-lucide="map-pin" class="w-4 h-4 text-blue-400"></i>
                            <span>${exp.location}</span>
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-slate-300 text-sm leading-relaxed mb-4 max-w-3xl">
                        ${exp.desc}
                    </p>
                    
                    <!-- Tags Technologies -->
                    <div class="flex flex-wrap gap-2">
                        ${exp.tags.map(tag => `
                            <span class="text-[11px] font-medium uppercase tracking-wide text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded hover:text-sky-300 hover:border-sky-500/50 hover:bg-slate-700/40 transition-all duration-200">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        experienceContainer.innerHTML += expCard;
    });
}
