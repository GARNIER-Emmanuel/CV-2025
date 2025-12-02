// Gestion du loader de page avec fusée

const loader = document.getElementById('page-loader');
const rocket = document.getElementById('rocket');
const progressBar = document.getElementById('progress-bar');

let progress = 0;

// Simulation de progression
const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progress >= 100) {
        clearInterval(progressInterval);
    }
}, 200);

// Quand la page est chargée
window.addEventListener('load', () => {
    // Force 100%
    progress = 100;
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    // Attendre un peu puis lancer la fusée
    setTimeout(() => {
        // Animation de décollage
        if (rocket) {
            rocket.classList.add('rocket-launch');
        }
        
        // Masquer le loader après l'animation
        setTimeout(() => {
            if (loader) {
                loader.classList.add('loader-hidden');
                
                // Supprimer du DOM après la transition
                setTimeout(() => {
                    loader.remove();
                }, 1000);
            }
        }, 1000);
    }, 500);
});

// Fallback : si le chargement prend trop de temps (>5s), forcer le lancement
setTimeout(() => {
    if (loader && !loader.classList.contains('loader-hidden')) {
        window.dispatchEvent(new Event('load'));
    }
}, 5000);
