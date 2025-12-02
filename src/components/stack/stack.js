import { skills } from '../../core/data.js';

const stackContainer = document.getElementById('stack-container');
if (stackContainer && skills) {
    skills.forEach((skill, index) => {
        const skillCard = `
            <div class="card-space p-5 hover:bg-slate-900/80 group cursor-default border border-slate-800 rounded-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                <!-- Header: Nom + Pourcentage -->
                <div class="flex justify-between items-end mb-3">
                    <h3 class="font-bold text-lg text-white group-hover:${skill.text} transition-colors flex items-center gap-2 font-tech">
                        ${skill.name}
                    </h3>
                    <span class="text-xs font-mono text-slate-500 font-bold">${skill.percent}%</span>
                </div>
                
                <!-- Progress Bar Background -->
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <!-- Progress Bar Fill (Animée via style width) -->
                    <div class="h-full ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-125 shadow-[0_0_8px_rgba(56,189,248,0.4)]" 
                         style="width: 0%" 
                         id="skill-bar-${index}">
                    </div>
                </div>
            </div>
        `;
        stackContainer.innerHTML += skillCard;

        // Animation différée pour l'effet "wavy"
        setTimeout(() => {
            const bar = document.getElementById(`skill-bar-${index}`);
            if (bar) bar.style.width = `${skill.percent}%`;
        }, 150 + (index * 100));
    });
}
