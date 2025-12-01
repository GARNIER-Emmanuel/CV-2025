document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Injection de la Bio & Infos Globales
    if(document.getElementById('bio-text') && typeof profileData !== 'undefined') {
        document.getElementById('bio-text').innerHTML = profileData.bio;
    }
    if(document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    // 2. Génération de la Stack (Version Visuelle avec Jauges)
    const stackContainer = document.getElementById('stack-container');
    if (stackContainer && typeof skills !== 'undefined') {
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
                if(bar) bar.style.width = `${skill.percent}%`;
            }, 150 + (index * 100));
        });
    }

    // 3. Génération de la section Expériences (Timeline Verticale)
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer && typeof experiences !== 'undefined') {
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

    // 4. Génération de la section Formations (Éducation)
    const educationContainer = document.getElementById('education-container');
    if (educationContainer && typeof education !== 'undefined') {
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

    // 5. Génération des Projets
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && typeof projects !== 'undefined') {
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

    // 6. Animation Waveform (Audio Section - Style Égaliseur)
    const waveformContainer = document.getElementById('waveform');
    if (waveformContainer) {
        waveformContainer.innerHTML = ''; 
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'w-1.5 md:w-2 bg-sky-500 rounded-t-sm audio-bar mx-[1px] md:mx-0.5 shadow-[0_0_5px_rgba(14,165,233,0.5)]';
            bar.style.height = Math.max(20, Math.random() * 100) + '%';
            bar.style.animationDelay = (i * 0.05) + 's';
            bar.style.opacity = '0.8';
            waveformContainer.appendChild(bar);
        }
    }

    // 7. Navbar Scroll Effect (Glassmorphism Spatial)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-sky-900/30', 'shadow-lg', 'py-4');
                navbar.classList.remove('bg-transparent', 'py-6');
            } else {
                navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-sky-900/30', 'shadow-lg', 'py-4');
                navbar.classList.add('bg-transparent', 'py-6');
            }
        });
    }

    // 8. Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
