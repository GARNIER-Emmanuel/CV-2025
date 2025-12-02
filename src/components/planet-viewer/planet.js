// ===== PLANÈTE 3D AVEC THREE.JS =====

// Configuration
const canvas = document.getElementById('space-canvas');

// Scène
const scene = new THREE.Scene();

// Caméra
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5); // Position de la caméra ajustée

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===== CRÉATION DE LA PLANÈTE =====

// Géométrie sphérique (rayon plus grand)
const geometry = new THREE.SphereGeometry(1.5, 64, 64);

// Textures de la Terre (NASA)
export const textureLoader = new THREE.TextureLoader();

// Texture principale (continents et océans)
const earthTexture = textureLoader.load(
    'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg'
);

// Bump map pour le relief
const bumpTexture = textureLoader.load(
    'https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg'
);

// Specular map pour refléter la lumière sur l'eau
const specularTexture = textureLoader.load(
    'https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png'
);

// Matériau Terre avec textures
export const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.05,
    specularMap: specularTexture,
    specular: new THREE.Color(0x333333),
    shininess: 25,
    transparent: true,
    opacity: 1
});

export const planet = new THREE.Mesh(geometry, earthMaterial);
// Position initiale de la Terre (à droite sur desktop)
planet.position.set(2, 0, 0);
planet.renderOrder = 1; // Rendre la planète après les étoiles (premier plan)
scene.add(planet);

// ===== LUMIÈRES =====

// Lumière ambiante (faible pour le réalisme)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Lumière directionnelle (Soleil)
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

// Atmosphère supprimée

// ===== ÉTOILES EN ARRIÈRE-PLAN =====

const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true
});

// Créer 1500 étoiles pour de meilleures performances (réduit de 5000)
const starsVertices = [];
for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starsVertices, 3)
);

const stars = new THREE.Points(starsGeometry, starsMaterial);
stars.renderOrder = 0; // Rendre les étoiles en premier (arrière-plan)
scene.add(stars);

// ===== GESTION DU SCROLL =====

let scrollProgress = 0;

window.addEventListener('scroll', () => {
    // Calculer la progression du scroll (0 à 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
});

// ===== INTERACTION SOURIS =====

let isHovering = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationVelocityX = 0.005; // Vitesse de rotation automatique
let rotationVelocityY = 0.001;

// Raycaster pour détecter si la souris est sur la planète
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const interactionZone = document.getElementById('planet-interaction-zone');

// Détecter si la souris est sur la zone de la planète
if (interactionZone) {
    interactionZone.addEventListener('mousemove', (event) => {
        // Normaliser les coordonnées de -1 à 1 pour le raycaster
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Vérifier si la souris est sur la planète
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(planet);

        if (intersects.length > 0) {
            // La souris est sur la planète
            interactionZone.style.cursor = 'pointer';

            // Calculer le delta (différence de mouvement) au survol
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;

            // Si la souris bouge, changer la vitesse de rotation (sensibilité réduite)
            if (deltaX !== 0 || deltaY !== 0) {
                rotationVelocityY = deltaX * 0.001; // Mouvement horizontal → rotation Y
                rotationVelocityX = deltaY * 0.001; // Mouvement vertical → rotation X (sans inversion)
            }

            isHovering = true;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        } else {
            // La souris n'est pas sur la planète
            interactionZone.style.cursor = 'default';
            isHovering = false;
        }
    });

    // Détecter quand la souris quitte la zone
    interactionZone.addEventListener('mouseleave', () => {
        isHovering = false;
        interactionZone.style.cursor = 'default';
    });
}

// ===== ANIMATION =====

// ===== ANIMATION =====

let isWarping = false;
let warpSpeed = 0;
let warpPhase = 'idle'; // idle, accelerating, decelerating
let warpStartTime = 0;
const WARP_DURATION = 2000; // ms

export function triggerWarpTransition(onMidpoint) {
    if (isWarping) return;
    isWarping = true;
    warpPhase = 'accelerating';
    warpStartTime = Date.now();

    // Phase 1: Accélération et Zoom Out
    const accelerateInterval = setInterval(() => {
        warpSpeed += 0.5;
        if (warpSpeed >= 20) warpSpeed = 20;
    }, 20);

    // Animation du FOV caméra pour effet de vitesse
    const initialFov = camera.fov;
    const targetFov = 120;

    // Zoom out planète
    const initialScale = planet.scale.x;

    // Midpoint (1s)
    setTimeout(() => {
        if (onMidpoint) onMidpoint();
        warpPhase = 'decelerating';

        // Reset planète position/scale pour l'arrivée
        planet.scale.set(0.1, 0.1, 0.1);

    }, WARP_DURATION / 2);

    // Fin (2s)
    setTimeout(() => {
        clearInterval(accelerateInterval);
        isWarping = false;
        warpPhase = 'idle';
        warpSpeed = 0;
        camera.fov = initialFov;
        camera.updateProjectionMatrix();

        // S'assurer que la planète est à la bonne taille
        planet.scale.set(initialScale, initialScale, initialScale);
    }, WARP_DURATION);
}

let isTabActive = true;

// Pause animation when tab is inactive to save CPU/GPU
document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
});

function animate() {
    requestAnimationFrame(animate);

    // Skip rendering if tab is not active (save CPU/GPU)
    if (!isTabActive && !isWarping) {
        return;
    }

    // Appliquer la rotation avec la vitesse actuelle
    planet.rotation.y += rotationVelocityY;
    planet.rotation.x += rotationVelocityX;

    // Friction : ralentir progressivement la rotation quand pas de survol
    if (!isHovering) {
        rotationVelocityY *= 0.98; // Friction sur Y
        rotationVelocityX *= 0.98; // Friction sur X

        // Empêcher que ça s'arrête complètement (rotation minimale)
        if (Math.abs(rotationVelocityY) < 0.001) {
            rotationVelocityY = 0.001; // Rotation automatique minimale
        }
    }

    // Gestion de l'effet Warp
    if (isWarping) {
        // Bouger les étoiles vers la caméra
        const positions = stars.geometry.attributes.position.array;
        for (let i = 2; i < positions.length; i += 3) {
            positions[i] += warpSpeed;
            if (positions[i] > 50) {
                positions[i] = -50;
            }
        }
        stars.geometry.attributes.position.needsUpdate = true;

        // Effets visuels durant le warp
        if (warpPhase === 'accelerating') {
            camera.fov += (100 - camera.fov) * 0.05;
            planet.scale.multiplyScalar(0.9); // La planète s'éloigne/rétrécit
        } else if (warpPhase === 'decelerating') {
            camera.fov += (75 - camera.fov) * 0.05;
            planet.scale.multiplyScalar(1.1); // La nouvelle planète grandit
            if (planet.scale.x > 1) planet.scale.set(1, 1, 1);
        }
        camera.updateProjectionMatrix();

    } else {
        // Les étoiles tournent très lentement en temps normal
        stars.rotation.y += 0.0001;
    }

    // ===== EFFET DE SCROLL =====

    const screenWidth = window.innerWidth;

    if (screenWidth > 768 && !isWarping) {
        // TERRE : défile vers la gauche et s'éloigne progressivement
        // Position X : de droite (2) vers gauche (-3)
        planet.position.x = 2 - (scrollProgress * 5); // 2 → -3

        // Position Z : s'éloigner (reculer dans la profondeur)
        planet.position.z = scrollProgress * 4; // 0 → 4

        // Opacité : reste opaque jusqu'à 95% du scroll, puis disparaît
        earthMaterial.opacity = scrollProgress < 0.95 ? 1 : 1 - ((scrollProgress - 0.95) * 20); // Opaque jusqu'à 95%, puis fade rapide

        // Échelle : légèrement plus petite en s'éloignant
        const scale = 1 - (scrollProgress * 0.2); // 1 → 0.8
        planet.scale.set(scale, scale, scale);
    } else if (!isWarping) {
        // Sur mobile : garder centré sans effet de scroll
        planet.position.set(0, 0, 0);
        earthMaterial.opacity = 1;
        planet.scale.set(1, 1, 1);
    }

    renderer.render(scene, camera);
}

// ===== RESPONSIVE =====

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lancer l'animation
animate();
