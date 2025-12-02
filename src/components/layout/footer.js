// Année dynamique
if (document.getElementById('year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Copier l'email dans le presse-papier
const copyEmailBtn = document.getElementById('copy-email-btn');
const notification = document.getElementById('copy-notification');

if (copyEmailBtn && notification) {
    copyEmailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('manu.boidun@gmail.com');

            // Afficher la notification
            notification.classList.remove('hidden');

            // Réinitialiser les icônes Lucide pour la notification
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Masquer après 3 secondes
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
            alert('Email: manu.boidun@gmail.com');
        }
    });
}
