import { projects } from '../../core/data.js';

const projectsContainer = document.getElementById('projects-container');
if (projectsContainer && projects) {
    projects.forEach(project => {
        // Création dynamique des tags
        let tagsHTML = '';
        project.tags.forEach((tag, index) => {
            tagsHTML += `<span class="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">${tag}</span>`;
        });

        const projectCard = `
            <div class="card-space group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-sky-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div class="h-48 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
                    <!-- Effet de Scanline au survol -->
                    <div class="absolute inset-0 bg-sky-500/10 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-[1.5s] z-0"></div>
                    
                    <span class="text-slate-600 font-mono text-xl group-hover:text-white transition-colors relative z-10 flex items-center gap-2">
                        <i data-lucide="monitor" class="w-5 h-5 text-sky-600"></i> ${project.placeholder}
                    </span>
                </div>
                <div class="p-8">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors font-tech">${project.title}</h3>
                    <p class="text-slate-400 mb-6 text-sm line-clamp-3 leading-relaxed opacity-80">${project.desc}</p>
                    <div class="flex gap-2 flex-wrap">
                        ${tagsHTML}
                    </div>
                </div>
                <a href="${project.link}" class="absolute inset-0 z-10" aria-label="Voir le projet ${project.title}"></a>
            </div>
        `;
        projectsContainer.innerHTML += projectCard;
    });
}
