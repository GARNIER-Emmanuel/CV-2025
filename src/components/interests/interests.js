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
