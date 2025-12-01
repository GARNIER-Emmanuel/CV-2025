document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Injection de la Bio & Infos Globales
    if(document.getElementById('bio-text')) {
        document.getElementById('bio-text').innerHTML = profileData.bio;
    }
    if(document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    // 2. Génération de la Stack (Version Visuelle avec Jauges)
    const stackContainer = document.getElementById('stack-container');
    if (stackContainer) {
        skills.forEach((skill, index) => {
            const skillCard = `
                <div class="card p-5 hover:bg-slate-900 group cursor-default border border-slate-800 rounded-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                    <!-- Header: Nom + Pourcentage -->
                    <div class="flex justify-between items-end mb-3">
                        <h3 class="font-bold text-lg text-white group-hover:${skill.text} transition-colors flex items-center gap-2">
                            ${skill.name}
                        </h3>
                        <span class="text-xs font-mono text-slate-500 font-bold">${skill.percent}%</span>
                    </div>
                    
                    <!-- Progress Bar Background -->
                    <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <!-- Progress Bar Fill (Animée via style width) -->
                        <div class="h-full ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-125 shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                             style="width: 0%" 
                             id="skill-bar-${index}">
                        </div>
                    </div>
                </div>
            `;
            stackContainer.innerHTML += skillCard;
            
            // Petite astuce pour animer la barre après l'injection dans le DOM
            setTimeout(() => {
                const bar = document.getElementById(`skill-bar-${index}`);
                if(bar) bar.style.width = `${skill.percent}%`;
            }, 100 + (index * 100)); // Délai en cascade pour un effet "wavy" sympa
        });
    }


    // 3. Génération de la section Expériences (Timeline Verticale)
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer && typeof experiences !== 'undefined') {
        experiences.forEach(exp => {
            const expCard = `
                <div class="relative group pl-6 pb-8 border-l-2 border-slate-800 last:border-0 last:pb-0">
                    <!-- Point sur la timeline -->
                    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 group-hover:scale-125 transition-all z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">${exp.role}</h3>
                        <span class="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                            ${exp.period}
                        </span>
                    </div>
                    
                    <div class="text-slate-400 font-semibold text-sm mb-3 flex items-center gap-2">
                        <i data-lucide="building-2" class="w-3 h-3"></i> ${exp.company} 
                        <span class="text-slate-600">•</span> 
                        <span>${exp.location}</span>
                    </div>
                    
                    <p class="text-slate-400 text-sm leading-relaxed max-w-2xl mb-3">
                        ${exp.desc}
                    </p>
                    
                    <div class="flex gap-2 flex-wrap">
                        ${exp.tags.map(tag => `<span class="text-[10px] uppercase tracking-wider text-slate-500 border border-slate-800 px-2 py-0.5 rounded hover:border-slate-600 transition-colors">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            experienceContainer.innerHTML += expCard;
        });
    }

    // 4. Génération des Projets
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projects.forEach(project => {
            // Création dynamique des tags
            let tagsHTML = '';
            project.tags.forEach((tag, index) => {
                const color = index % 2 === 0 ? 'indigo' : 'purple';
                tagsHTML += `<span class="text-xs px-3 py-1 rounded-full bg-${color}-500/10 text-${color}-300 border border-${color}-500/20">${tag}</span>`;
            });

            const projectCard = `
                <div class="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                    <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                        <!-- Effet de glow au survol -->
                        <div class="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span class="text-slate-600 font-mono text-xl group-hover:text-white transition-colors relative z-10 flex items-center gap-2">
                            <i data-lucide="image" class="w-5 h-5"></i> ${project.placeholder}
                        </span>
                    </div>
                    <div class="p-8">
                        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">${project.title}</h3>
                        <p class="text-slate-400 mb-6 text-sm line-clamp-3 leading-relaxed">${project.desc}</p>
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

    // 5. Animation Waveform (Audio Section)
    const waveformContainer = document.getElementById('waveform');
    if (waveformContainer) {
        waveformContainer.innerHTML = ''; // Reset au cas où
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'w-1.5 md:w-2 bg-indigo-500 rounded-t-sm audio-bar mx-[1px] md:mx-0.5';
            // Hauteur et délai aléatoires pour effet naturel
            bar.style.height = Math.max(20, Math.random() * 100) + '%';
            bar.style.animationDelay = (i * 0.05) + 's';
            bar.style.opacity = '0.7';
            waveformContainer.appendChild(bar);
        }
    }

    // 6. Navbar Scroll Effect (Glassmorphism)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800/50', 'shadow-lg');
                navbar.classList.remove('bg-transparent', 'py-6');
                navbar.classList.add('py-4');
            } else {
                navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800/50', 'shadow-lg', 'py-4');
                navbar.classList.add('bg-transparent', 'py-6');
            }
        });
    }

    // 7. Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
