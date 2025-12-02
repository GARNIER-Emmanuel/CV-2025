import { experiences } from '../../core/data.js';

// --- 1. Injection du contenu (Rendu Optimisé) ---
const container = document.getElementById('experience-container');

if (container && experiences) {
    // Utilisation d'un fragment pour une seule opération d'écriture dans le DOM (Performance)
    const fragment = document.createDocumentFragment();

    experiences.forEach((exp, index) => {
        // Création wrapper
        const wrapper = document.createElement('div');
        wrapper.className = "relative group perspective-1000";
        
        // Délai d'apparition progressif (Stagger)
        const delay = index * 150; 

        wrapper.innerHTML = `
            <!-- Carte Experience : Glassmorphism Profond + Lisibilité -->
            <div class="relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl 
                        hover:bg-slate-800/80 hover:border-sky-500/30 hover:shadow-[0_10px_40px_-10px_rgba(2,132,199,0.3)] hover:-translate-y-1 
                        transition-all duration-300 ease-out shadow-2xl">
                
                <!-- Décoration Tech (Top Right) -->
                <div class="absolute top-4 right-4 flex gap-1 opacity-50">
                     <div class="w-1 h-1 bg-sky-500 rounded-full"></div>
                     <div class="w-1 h-1 bg-sky-500 rounded-full"></div>
                     <div class="w-1 h-1 bg-sky-500 rounded-full"></div>
                </div>

                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 class="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors tracking-wide">
                            ${exp.role}
                        </h3>
                        <div class="flex items-center gap-3 text-slate-400 mt-1 text-sm font-medium">
                            <span class="flex items-center gap-1.5 text-sky-300/80">
                                <i data-lucide="building-2" class="w-4 h-4"></i> ${exp.company}
                            </span>
                            <span class="w-1 h-1 bg-slate-600 rounded-full"></span>
                            <span>${exp.location}</span>
                        </div>
                    </div>
                    
                    <!-- Date Badge style "Temps de mission" -->
                    <div class="self-start md:self-center">
                        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/50 border border-sky-800/50 text-sky-300 text-xs font-mono tracking-wider shadow-inner">
                            <i data-lucide="clock" class="w-3 h-3"></i>
                            ${exp.period}
                        </span>
                    </div>
                </div>

                <!-- Description (Contraste renforcé) -->
                <p class="text-slate-300 leading-relaxed mb-6 font-light">
                    ${exp.desc}
                </p>

                <!-- Tags Tech -->
                <div class="flex flex-wrap gap-2">
                    ${exp.tags.map(tag => `
                        <span class="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700 rounded-md 
                                     hover:text-sky-300 hover:border-sky-500/40 hover:bg-sky-900/20 transition-colors cursor-default">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
        fragment.appendChild(wrapper);
    });
    
    container.appendChild(fragment);
}

// --- 2. Parallaxe Ultra-Fluide (RequestAnimationFrame) ---
const section = document.getElementById('experience');
const nebulaBg = document.getElementById('nebula-bg');

if (section && nebulaBg) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Facteur d'adoucissement (Lerp) - plus c'est bas, plus c'est fluide/lent (0.05 - 0.1)
    const ease = 0.08; 

    // Écouteur souris : on met juste à jour les cibles
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        // Calcul normalisé (-0.5 à 0.5)
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Amplitude du mouvement (pixels max)
        targetX = xPct * 40; 
        targetY = yPct * 40;
    });
    
    // Reset quand on quitte
    section.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // Boucle d'animation fluide
    function animate() {
        // Interpolation linéaire (LERP) pour la douceur
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // Application de la transfo (uniquement translate3d pour GPU)
        // Scale 1.1 permet d'éviter les bords blancs lors du mouvement
        nebulaBg.style.transform = `scale(1.1) translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(animate);
    }
    
    // Lancer l'animation
    animate();
}
