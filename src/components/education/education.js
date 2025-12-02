import { education } from '../../core/data.js';

const educationContainer = document.getElementById('education-container');
if (educationContainer && education) {
    education.forEach(edu => {
        const eduCard = `
            <div class="card-space relative p-6 bg-slate-950/50 border border-slate-800/60 rounded-xl hover:border-sky-500/40 transition-all hover:-translate-y-1 group overflow-hidden">
                <!-- Icône décorative (Style Hologramme) -->
                <i data-lucide="award" class="absolute -top-2 -right-2 text-slate-800 w-20 h-20 opacity-20 group-hover:text-sky-500/10 group-hover:rotate-12 transition-all duration-700"></i>
                
                <span class="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold text-sky-400 bg-sky-500/5 border border-sky-500/20 rounded">
                    ${edu.year}
                </span>
                
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-sky-300 transition-colors font-tech">
                    ${edu.degree}
                </h3>
                
                <p class="text-slate-500 text-sm font-medium flex items-center gap-2">
                    <i data-lucide="school" class="w-3 h-3"></i> ${edu.school}
                </p>
            </div>
        `;
        educationContainer.innerHTML += eduCard;
    });
}
