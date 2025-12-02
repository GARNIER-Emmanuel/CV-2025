// ===== CONFIGURATION EMAILJS =====
// ⚠️ REMPLACEZ CES VALEURS PAR VOS PROPRES CLÉS EMAILJS
const EMAILJS_CONFIG = {
    serviceID: 'service_vynmpr6',
    templateID: 'template_7a0yy0j',
    publicKey: '7WsyjKp_q5Z-vWdis'
};

// Année dynamique
if (document.getElementById('year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// ===== GESTION DU FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Vérifier que EmailJS est configuré
        if (EMAILJS_CONFIG.serviceID === 'YOUR_SERVICE_ID') {
            alert('⚠️ EmailJS n\'est pas encore configuré. Veuillez suivre les instructions dans footer.js');
            return;
        }

        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        btnText.textContent = 'Envoi en cours...';
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // Masquer les messages précédents
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        try {
            // Charger EmailJS si pas encore chargé
            if (typeof emailjs === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
                document.head.appendChild(script);

                await new Promise((resolve) => {
                    script.onload = resolve;
                });

                emailjs.init(EMAILJS_CONFIG.publicKey);
            }

            // Envoyer l'email
            const formData = {
                from_name: document.getElementById('from_name').value,
                reply_to: document.getElementById('reply_to').value,
                message: document.getElementById('message').value
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                formData
            );

            // Succès
            successMessage.classList.remove('hidden');
            contactForm.reset();

            // Réinitialiser les icônes Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

        } catch (error) {
            console.error('Erreur EmailJS:', error);
            errorMessage.classList.remove('hidden');

            // Réinitialiser les icônes Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer le message';
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}
