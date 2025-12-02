import { interests } from '../../core/data.js';

const container = document.getElementById('interests-container');

if (container) {
    const interestsHTML = interests.map(interest => `
        <div class="card p-6 text-center hover:scale-105 transition-transform">
            <div class="text-6xl mb-4">${interest.icon}</div>
            <h3 class="text-xl font-bold text-white mb-3">${interest.title}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">${interest.description}</p>
        </div>
    `).join('');

    container.innerHTML = interestsHTML;
}

// Réinitialiser les icônes Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Effet parallaxe sur la nébuleuse
const section = document.getElementById('interests');
const nebulaBg = document.getElementById('nebula-bg-interests');

if (section && nebulaBg) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const ease = 0.08;

    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        
        targetX = xPct * 40;
        targetY = yPct * 40;
    });
    
    section.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function animate() {
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        nebulaBg.style.transform = `scale(1.1) translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(animate);
    }
    
    animate();
}
