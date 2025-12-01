// ===== SYSTÈME DE CHANGEMENT DE PLANÈTE =====

let currentPlanet = 'earth';

// Configuration des planètes
const planets = {
    sun: {
        name: 'Soleil',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/sunmap.jpg',
        type: 'sun',
        radius: 3.0,
        hasSpecular: false
    },
    mercury: {
        name: 'Mercure',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurymap.jpg',
        bumpMap: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurybump.jpg',
        type: 'mercury',
        radius: 1.0,
        hasSpecular: false
    },
    venus: {
        name: 'Vénus',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusmap.jpg',
        bumpMap: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusbump.jpg',
        type: 'venus',
        radius: 1.4,
        hasSpecular: false
    },
    earth: {
        name: 'Terre',
        texture: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg',
        bumpMap: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg',
        specularMap: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png',
        radius: 1.5,
        hasSpecular: true
    },
    moon: {
        name: 'Lune',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/moonmap1k.jpg',
        bumpMap: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/moonbump1k.jpg',
        type: 'moon',
        radius: 0.9,
        hasSpecular: false
    },
    mars: {
        name: 'Mars',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsmap1k.jpg',
        bumpMap: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsbump1k.jpg',
        type: 'mars',
        radius: 1.2,
        hasSpecular: false
    },
    jupiter: {
        name: 'Jupiter',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/jupitermap.jpg',
        type: 'jupiter',
        radius: 2.5,
        hasSpecular: false
    },
    saturn: {
        name: 'Saturne',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/saturnmap.jpg',
        type: 'saturn',
        radius: 2.2,
        hasRings: true,
        hasSpecular: false
    },
    uranus: {
        name: 'Uranus',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/uranusmap.jpg',
        type: 'uranus',
        radius: 1.8,
        hasRings: true,
        hasSpecular: false
    },
    neptune: {
        name: 'Neptune',
        texture: 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/neptunemap.jpg',
        type: 'neptune',
        radius: 1.7,
        hasSpecular: false
    }
};

// Fonction pour changer de planète
function switchPlanet(planetName) {
    if (planetName === currentPlanet) return;

    const config = planets[planetName];
    if (!config) return;

    console.log(`Changement vers ${config.name}...`);

    // Vérifier que les variables globales sont disponibles
    if (typeof window.textureLoader === 'undefined' ||
        typeof window.earthMaterial === 'undefined' ||
        typeof window.planet === 'undefined') {
        console.error('Les variables Three.js ne sont pas disponibles');
        return;
    }

    // Charger la nouvelle texture
    if (config.texture === 'procedural') {
        // Créer directement une texture procédurale selon le type
        console.log('🎨 Création de texture procédurale pour', config.name);
        const proceduralTexture = createPlanetTexture(config.type);
        window.earthMaterial.map = proceduralTexture;
        window.earthMaterial.color = new THREE.Color(0xffffff);
        window.earthMaterial.needsUpdate = true;
    } else {
        // Charger depuis une URL
        const newTexture = window.textureLoader.load(
            config.texture,
            // onLoad
            function (texture) {
                console.log('✅ Texture chargée avec succès:', config.name);
                window.earthMaterial.map = texture;
                window.earthMaterial.color = new THREE.Color(0xffffff);
                window.earthMaterial.needsUpdate = true;
            },
            // onProgress
            undefined,
            // onError
            function (error) {
                console.error('❌ Erreur de chargement de texture pour', config.name, error);
                console.log('⚠️ Utilisation de la texture procédurale de secours');

                // Fallback : Texture procédurale
                const proceduralTexture = createPlanetTexture(config.type);
                window.earthMaterial.map = proceduralTexture;
                window.earthMaterial.bumpMap = null;
                window.earthMaterial.specularMap = null;
                window.earthMaterial.color = new THREE.Color(0xffffff);
                window.earthMaterial.needsUpdate = true;
            }
        );

        // Mettre à jour le matériau immédiatement avec la texture en cours de chargement
        // Note : Si le chargement échoue, le onError écrasera ceci
        window.earthMaterial.map = newTexture;
        window.earthMaterial.color = new THREE.Color(0xffffff);
    }

    if (config.bumpMap) {
        // On ne charge la bump map que si on a pas déjà échoué (difficile à savoir ici en asynchrone)
        // Mais Three.js gère bien les chargements multiples.
        // Si la texture principale échoue plus tard, le onError ci-dessus nettoiera tout.
        const newBump = window.textureLoader.load(config.bumpMap);
        window.earthMaterial.bumpMap = newBump;
        window.earthMaterial.bumpScale = 0.05;
    } else {
        window.earthMaterial.bumpMap = null;
    }

    if (config.hasSpecular && config.specularMap) {
        const newSpecular = window.textureLoader.load(config.specularMap);
        window.earthMaterial.specularMap = newSpecular;
        window.earthMaterial.specular = new THREE.Color(0x333333);
    } else {
        window.earthMaterial.specularMap = null;
        window.earthMaterial.specular = new THREE.Color(0x000000);
    }

    window.earthMaterial.needsUpdate = true;

    // Ajuster la taille de la planète
    const scale = config.radius / 1.5; // 1.5 est la taille de base
    window.planet.scale.set(scale, scale, scale);

    // Gérer les anneaux (Saturne et Uranus)
    if (config.hasRings) {
        addPlanetRings(planetName);
    } else {
        removePlanetRings();
    }

    currentPlanet = planetName;
}

// Fonction universelle pour créer des textures procédurales
function createPlanetTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    switch (type) {
        case 'sun':
            // Soleil - jaune/orange avec des taches solaires
            const sunGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            sunGradient.addColorStop(0, '#fff8e0');
            sunGradient.addColorStop(0.5, '#ffd700');
            sunGradient.addColorStop(1, '#ff8c00');
            ctx.fillStyle = sunGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Taches solaires
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 30 + Math.random() * 80;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
                grad.addColorStop(0, 'rgba(255, 100, 0, 0.3)');
                grad.addColorStop(1, 'rgba(255, 140, 0, 0)');
                ctx.fillStyle = grad;
                ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            }
            break;

        case 'mercury':
            // Mercure - gris avec cratères
            ctx.fillStyle = '#8c7853';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Cratères
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 10 + Math.random() * 50;
                ctx.fillStyle = `rgba(60, 50, 40, ${0.2 + Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'venus':
            // Vénus - jaune pâle avec nuages
            const venusGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            venusGrad.addColorStop(0, '#f4e4c0');
            venusGrad.addColorStop(0.5, '#e8d4a8');
            venusGrad.addColorStop(1, '#d8c490');
            ctx.fillStyle = venusGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Nuages tourbillonnants
            for (let i = 0; i < 60; i++) {
                const y = (canvas.height / 60) * i;
                ctx.fillStyle = `rgba(220, 200, 160, ${0.1 + Math.random() * 0.2})`;
                ctx.fillRect(0, y, canvas.width, 15 + Math.random() * 10);
            }
            break;

        case 'moon':
            // Lune - gris clair avec cratères
            ctx.fillStyle = '#c8c8c8';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Mers lunaires (zones sombres)
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 100 + Math.random() * 200;
                ctx.fillStyle = `rgba(80, 80, 80, 0.3)`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Cratères
            for (let i = 0; i < 150; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 5 + Math.random() * 40;
                ctx.fillStyle = `rgba(100, 100, 100, ${0.2 + Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'mars':
            // Mars - rouge/orange
            const marsGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            marsGrad.addColorStop(0, '#e27b58');
            marsGrad.addColorStop(0.3, '#c1440e');
            marsGrad.addColorStop(0.7, '#a0300a');
            marsGrad.addColorStop(1, '#8b2500');
            ctx.fillStyle = marsGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Zones plus claires/foncées
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 30 + Math.random() * 100;
                const isDark = Math.random() > 0.5;
                const color = isDark ? 'rgba(100, 30, 10, 0.3)' : 'rgba(230, 120, 80, 0.2)';
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'jupiter':
            // Jupiter - bandes oranges et blanches
            for (let i = 0; i < 50; i++) {
                const y = (canvas.height / 50) * i;
                const colors = ['#e8c89c', '#d4a574', '#c89050', '#a87840', '#e8d0b0'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillStyle = color;
                ctx.fillRect(0, y, canvas.width, 18 + Math.random() * 12);
            }

            // Grande tache rouge
            const grsX = canvas.width * 0.6;
            const grsY = canvas.height * 0.4;
            const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, 120);
            grsGrad.addColorStop(0, 'rgba(200, 80, 60, 0.8)');
            grsGrad.addColorStop(1, 'rgba(180, 100, 80, 0)');
            ctx.fillStyle = grsGrad;
            ctx.fillRect(grsX - 120, grsY - 80, 240, 160);
            break;

        case 'saturn':
            // Saturne - bandes beiges
            const saturnGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            saturnGrad.addColorStop(0, '#faf0e0');
            saturnGrad.addColorStop(0.15, '#f0d8b8');
            saturnGrad.addColorStop(0.3, '#e8c8a0');
            saturnGrad.addColorStop(0.45, '#d8b888');
            saturnGrad.addColorStop(0.6, '#c8a878');
            saturnGrad.addColorStop(0.75, '#d0b088');
            saturnGrad.addColorStop(0.9, '#e8d0a8');
            saturnGrad.addColorStop(1, '#f8e8c8');
            ctx.fillStyle = saturnGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bandes
            for (let i = 0; i < 80; i++) {
                const y = (canvas.height / 80) * i;
                const isDark = Math.random() > 0.5;
                const color = isDark ? `rgba(180, 140, 100, ${0.15 + Math.random() * 0.3})` : `rgba(250, 230, 200, ${0.15 + Math.random() * 0.3})`;
                ctx.fillStyle = color;
                ctx.fillRect(0, y, canvas.width, 8 + Math.random() * 18);
            }
            break;

        case 'uranus':
            // Uranus - bleu-vert pâle
            const uranusGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            uranusGrad.addColorStop(0, '#d0f0f0');
            uranusGrad.addColorStop(0.5, '#a0e0e8');
            uranusGrad.addColorStop(1, '#80d0d8');
            ctx.fillStyle = uranusGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Légères bandes
            for (let i = 0; i < 30; i++) {
                const y = (canvas.height / 30) * i;
                ctx.fillStyle = `rgba(120, 200, 210, ${0.1 + Math.random() * 0.15})`;
                ctx.fillRect(0, y, canvas.width, 25 + Math.random() * 15);
            }
            break;

        case 'neptune':
            // Neptune - bleu profond
            const neptuneGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            neptuneGrad.addColorStop(0, '#4060ff');
            neptuneGrad.addColorStop(0.5, '#2040d0');
            neptuneGrad.addColorStop(1, '#1030a0');
            ctx.fillStyle = neptuneGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bandes subtiles
            for (let i = 0; i < 40; i++) {
                const y = (canvas.height / 40) * i;
                ctx.fillStyle = `rgba(80, 120, 255, ${0.1 + Math.random() * 0.2})`;
                ctx.fillRect(0, y, canvas.width, 20 + Math.random() * 15);
            }

            // Grande tache sombre
            const ndsX = canvas.width * 0.5;
            const ndsY = canvas.height * 0.5;
            const ndsGrad = ctx.createRadialGradient(ndsX, ndsY, 0, ndsX, ndsY, 100);
            ndsGrad.addColorStop(0, 'rgba(20, 30, 100, 0.5)');
            ndsGrad.addColorStop(1, 'rgba(30, 50, 120, 0)');
            ctx.fillStyle = ndsGrad;
            ctx.fillRect(ndsX - 100, ndsY - 70, 200, 140);
            break;
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Fonction pour créer une texture procédurale des anneaux
function createRingTexture(planetType) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Créer un gradient radial pour les anneaux
    for (let x = 0; x < canvas.width; x++) {
        const progress = x / canvas.width;

        // Bandes d'anneaux avec variations
        let alpha = 0.8;

        if (planetType === 'saturn') {
            // Anneaux de Saturne - beige/doré avec divisions marquées
            // Créer des bandes (divisions de Cassini, etc.)
            if (progress > 0.3 && progress < 0.35) alpha = 0.3; // Division de Cassini
            if (progress > 0.6 && progress < 0.63) alpha = 0.4; // Autre division

            // Variations aléatoires pour réalisme
            alpha *= 0.7 + Math.random() * 0.3;

            // Couleur des anneaux (beige/doré)
            const brightness = 200 + Math.floor(Math.random() * 40);
            ctx.fillStyle = `rgba(${brightness}, ${brightness - 20}, ${brightness - 40}, ${alpha})`;
        } else if (planetType === 'uranus') {
            // Anneaux d'Uranus - bleu-gris pâle, plus fins et discrets
            if (progress > 0.4 && progress < 0.42) alpha = 0.2; // Division principale
            if (progress > 0.7 && progress < 0.72) alpha = 0.25; // Autre division

            // Variations aléatoires
            alpha *= 0.5 + Math.random() * 0.3;

            // Couleur des anneaux (bleu-gris pâle)
            const brightness = 140 + Math.floor(Math.random() * 30);
            ctx.fillStyle = `rgba(${brightness}, ${brightness + 10}, ${brightness + 20}, ${alpha})`;
        }

        ctx.fillRect(x, 0, 1, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Anneaux des planètes
let planetRings = null;

function addPlanetRings(planetType) {
    // Retirer les anneaux existants d'abord
    removePlanetRings();

    let innerRadius, outerRadius, rotationX, rotationZ, opacity;

    if (planetType === 'saturn') {
        // Anneaux de Saturne - larges et proéminents
        innerRadius = 2.5;
        outerRadius = 4.5;
        rotationX = Math.PI / 2.2;
        rotationZ = 0.4;
        opacity = 0.8;
    } else if (planetType === 'uranus') {
        // Anneaux d'Uranus - plus fins et verticaux
        innerRadius = 2.2;
        outerRadius = 3.2;
        rotationX = Math.PI / 2.5;
        rotationZ = Math.PI / 2; // Rotation verticale caractéristique d'Uranus
        opacity = 0.6;
    } else {
        return; // Pas d'anneaux pour cette planète
    }

    // Créer les anneaux avec texture procédurale
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
    const ringTexture = createRingTexture(planetType);

    const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity,
        depthWrite: false // Pour une meilleure transparence
    });

    planetRings = new THREE.Mesh(ringGeometry, ringMaterial);
    planetRings.rotation.x = rotationX;
    planetRings.rotation.z = rotationZ;

    window.planet.add(planetRings);
}

function removePlanetRings() {
    if (planetRings) {
        window.planet.remove(planetRings);
        planetRings.geometry.dispose();
        planetRings.material.dispose();
        planetRings = null;
    }
}

// Gestion du menu burger
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('planet-burger');
    const menu = document.getElementById('planet-menu');
    const planetButtons = document.querySelectorAll('.planet-btn');

    // Toggle menu
    burger.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    // Changement de planète
    planetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const planetName = btn.dataset.planet;

            // Mettre à jour l'état actif
            planetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Changer la planète
            switchPlanet(planetName);

            // Fermer le menu
            menu.classList.add('hidden');
        });
    });

    // Gestion du bouton Info
    const infoBtn = document.getElementById('planet-info-btn');
    const infoModal = document.getElementById('planet-info-modal');

    // Éléments du modal
    const infoEmoji = document.getElementById('info-emoji');
    const infoTitle = document.getElementById('info-title');
    const infoSummary = document.getElementById('info-summary');
    const infoHistory = document.getElementById('info-history');

    // Nouveaux champs
    const infoType = document.getElementById('info-type');
    const infoDiameter = document.getElementById('info-diameter');
    const infoDistance = document.getElementById('info-distance');
    const infoTemp = document.getElementById('info-temp');

    function updateInfoModal(planetName) {
        const data = planetData[planetName];
        if (!data) return;

        infoEmoji.textContent = data.emoji;
        infoTitle.textContent = data.title;
        infoSummary.textContent = data.summary;
        infoHistory.textContent = data.history;

        // Mise à jour des données techniques
        if (infoType) infoType.textContent = data.type;
        if (infoDiameter) infoDiameter.textContent = data.diameter;
        if (infoDistance) infoDistance.textContent = data.distance;
        if (infoTemp) infoTemp.textContent = data.temp;
    }

    infoBtn.addEventListener('click', () => {
        // Mettre à jour les infos avant d'afficher
        updateInfoModal(currentPlanet);

        infoModal.classList.toggle('hidden');

        // Animation d'apparition
        if (!infoModal.classList.contains('hidden')) {
            setTimeout(() => {
                infoModal.classList.remove('scale-95', 'opacity-0');
                infoModal.classList.add('scale-100', 'opacity-100');
            }, 10);
        } else {
            infoModal.classList.add('scale-95', 'opacity-0');
            infoModal.classList.remove('scale-100', 'opacity-100');
        }
    });

    // Fermer le modal si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!infoBtn.contains(e.target) && !infoModal.contains(e.target)) {
            if (!infoModal.classList.contains('hidden')) {
                infoModal.classList.add('scale-95', 'opacity-0');
                infoModal.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => {
                    infoModal.classList.add('hidden');
                }, 300);
            }
        }
    });

    // Hook dans switchPlanet pour mettre à jour le modal s'il est ouvert
    const originalSwitchPlanet = window.switchPlanet;
});

// Modification de la fonction switchPlanet pour mettre à jour le modal
const originalSwitchPlanetLogic = switchPlanet;
switchPlanet = function (planetName) {
    originalSwitchPlanetLogic(planetName);

    // Mettre à jour le modal si les éléments existent (chargés)
    const infoModal = document.getElementById('planet-info-modal');
    if (infoModal && !infoModal.classList.contains('hidden')) {
        const infoEmoji = document.getElementById('info-emoji');
        const infoTitle = document.getElementById('info-title');
        const infoSummary = document.getElementById('info-summary');
        const infoHistory = document.getElementById('info-history');

        const infoType = document.getElementById('info-type');
        const infoDiameter = document.getElementById('info-diameter');
        const infoDistance = document.getElementById('info-distance');
        const infoTemp = document.getElementById('info-temp');

        const data = planetData[planetName];
        if (data) {
            infoEmoji.textContent = data.emoji;
            infoTitle.textContent = data.title;
            infoSummary.textContent = data.summary;
            infoHistory.textContent = data.history;

            if (infoType) infoType.textContent = data.type;
            if (infoDiameter) infoDiameter.textContent = data.diameter;
            if (infoDistance) infoDistance.textContent = data.distance;
            if (infoTemp) infoTemp.textContent = data.temp;
        }
    }
};
