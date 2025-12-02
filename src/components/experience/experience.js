import { experiences } from '../../core/data.js';

const experienceContainer = document.getElementById('experience-container');
if (experienceContainer && experiences) {
    experiences.forEach(exp => {
        const expCard = `
            <div class="relative group pl-8 pb-10 border-l border-slate-800 last:border-0 last:pb-0">
                <!-- Point sur la timeline (Style Space/Tech) -->
                <div class="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-slate-950 border border-sky-500 group-hover:bg-sky-500 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.6)] transition-all z-10"></div>
                
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 class="text-xl font-bold text-white group-hover:text-sky-400 transition-colors font-tech">${exp.role}</h3>
                    <span class="text-xs font-mono text-sky-300/80 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20 tracking-wider">
                        ${exp.period}
                    </span>
                </div>
                
                <div class="text-slate-400 font-medium text-sm mb-3 flex items-center gap-2">
                    <i data-lucide="building-2" class="w-3 h-3 text-sky-600"></i> ${exp.company} 
                    <span class="text-slate-700">•</span> 
                    <span>${exp.location}</span>
                </div>
                
                <p class="text-slate-400 text-sm leading-relaxed max-w-2xl mb-4 opacity-80">
                    ${exp.desc}
                </p>
                
                <div class="flex gap-2 flex-wrap">
                    ${exp.tags.map(tag => `<span class="text-[10px] uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-0.5 rounded hover:text-sky-300 hover:border-sky-500/30 transition-colors">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        experienceContainer.innerHTML += expCard;
    });
}
