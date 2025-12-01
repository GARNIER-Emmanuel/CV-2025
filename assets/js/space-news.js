// ===== ACTUALITÉS SPATIALES =====

// API de Space News (gratuite, pas de clé nécessaire)
const SPACE_NEWS_API = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=5';

async function fetchSpaceNews() {
    const container = document.getElementById('space-news-container');

    try {
        const response = await fetch(SPACE_NEWS_API);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayNews(data.results);
        } else {
            showError('Aucune actualité disponible');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
        showError('Impossible de charger les actualités');
    }
}

function displayNews(articles) {
    const container = document.getElementById('space-news-container');

    const newsHTML = articles.map(article => {
        const date = new Date(article.published_at);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // Déterminer la source (SpaceX, NASA, Ariane, etc.)
        let icon = '🚀';
        let badgeColor = 'bg-blue-500/20 text-blue-400';

        if (article.news_site.toLowerCase().includes('spacex')) {
            icon = '🚀';
            badgeColor = 'bg-purple-500/20 text-purple-400';
        } else if (article.news_site.toLowerCase().includes('nasa')) {
            icon = '🛸';
            badgeColor = 'bg-red-500/20 text-red-400';
        } else if (article.news_site.toLowerCase().includes('esa') || article.news_site.toLowerCase().includes('ariane')) {
            icon = '🛰️';
            badgeColor = 'bg-green-500/20 text-green-400';
        }

        return `
            <div class="card p-6 hover:border-orange-500/50 transition-all group">
                <div class="flex items-start gap-4">
                    <div class="text-4xl">${icon}</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-2 py-1 rounded text-xs font-bold ${badgeColor}">
                                ${article.news_site}
                            </span>
                            <span class="text-xs text-slate-500">${formattedDate}</span>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            ${article.title}
                        </h4>
                        <p class="text-sm text-slate-400 mb-3 line-clamp-2">
                            ${article.summary}
                        </p>
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors">
                            Lire l'article
                            <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = newsHTML;

    // Réinitialiser les icônes Lucide pour les nouveaux éléments
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showError(message) {
    const container = document.getElementById('space-news-container');
    container.innerHTML = `
        <div class="text-center text-slate-500 py-8">
            <i data-lucide="alert-circle" class="w-12 h-12 mx-auto mb-4"></i>
            <p>${message}</p>
            <button onclick="fetchSpaceNews()" class="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white text-sm">
                Réessayer
            </button>
        </div>
    `;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Charger les actualités au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchSpaceNews();

    // Rafraîchir toutes les 5 minutes
    setInterval(fetchSpaceNews, 5 * 60 * 1000);
});
