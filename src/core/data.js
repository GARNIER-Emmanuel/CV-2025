/* 
    DONNÉES DU PORTFOLIO
    Générées à partir du CV d'Emmanuel GARNIER BOIDUN
*/

// 1. Informations Globales
export const profileData = {
    // Calcul automatique de l'âge
    age: new Date().getFullYear() - 2002,
    jobTitle: "Développeur Junior & Master Full Stack",
    location: "Bordeaux, France",
    email: "manu.boidun@gmail.com",
    phone: "06 61 74 29 19",
    availability: "Disponible pour Alternance",
    bio: `
        Actuellement en Master 1 Développement Full Stack à Sup de Vinci (Bordeaux) et en alternance chez CGI, 
        je conçois des applications back-end et web rigoureuses tout en explorant des projets créatifs. 
        Curieux et autonome, je ne me contente pas d'utiliser les technos que je connais, 
        j'apprends constamment de nouvelles stacks et j'expérimente des architectures modernes.
        Passionné par l'informatique de la plus petite technologie humaine aux plus grandes créations de l'espace,
        je suis curieux de toute les nouveautés technologiques concernant l'IA, ou autre technique interréssante et innnovante.
        j'applique la même exigence dans mes projets professionnels que dans mes side-projects, 
        où je soigne autant l'expérience utilisateur que la structure technique. 
        Mon objectif : livrer du code propre, scalable, et qui raconte une histoire.
        `
};

// 2. Liste des Compétences (Avec pourcentages pour les jauges)
export const skills = [
    // Frontend
    { name: 'JavaScript', percent: 80, color: 'bg-yellow-400', text: 'text-yellow-400' },
    { name: 'React.js', percent: 60, color: 'bg-blue-400', text: 'text-blue-400' },
    { name: 'Angular', percent: 50, color: 'bg-red-500', text: 'text-red-500' },
    { name: 'Tailwind CSS', percent: 75, color: 'bg-sky-300', text: 'text-sky-300' },
    { name: 'HTML/CSS', percent: 90, color: 'bg-orange-400', text: 'text-orange-400' },

    // Backend
    { name: 'Java (POO)', percent: 85, color: 'bg-orange-600', text: 'text-orange-600' },
    { name: 'Python', percent: 70, color: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'PHP/Symfony', percent: 70, color: 'bg-indigo-400', text: 'text-indigo-400' },

    // Bases de données
    { name: 'SQL (MySQL/PostgreSQL)', percent: 80, color: 'bg-blue-300', text: 'text-blue-300' },
    { name: 'MongoDB', percent: 50, color: 'bg-green-500', text: 'text-green-500' },

    // DevOps & Outils
    { name: 'Docker', percent: 65, color: 'bg-blue-600', text: 'text-blue-600' },
    { name: 'Git', percent: 85, color: 'bg-orange-500', text: 'text-orange-500' },

    // Architecture & Méthodes
    { name: 'MVC/DAO', percent: 80, color: 'bg-purple-500', text: 'text-purple-500' },
    { name: 'UML/MERISE', percent: 75, color: 'bg-pink-500', text: 'text-pink-500' }
];


// 3. Parcours & Expériences (Timeline)
export const experiences = [
    {
        role: "Développeur Junior (Alternance)",
        company: "CGI",
        period: "Sept 2023 - Aujourd'hui",
        location: "Bordeaux",
        desc: "Missions dans l'éditique et développement logiciel en Java au sein d'une ESN majeure.",
        tags: ["Java", "Éditique", "Entreprise"]
    },
    {
        role: "Stagiaire Développeur Web",
        company: "ElémentRoot",
        period: "2022 - 2023",
        location: "Pau",
        desc: "Création d'un formulaire client sur mesure pour un cabinet dentaire utilisant le framework Symfony.",
        tags: ["Symfony", "PHP", "FullStack"]
    },
    {
        role: "Stagiaire Développeur Web",
        company: "Madness Escape Game",
        period: "2021 - 2022",
        location: "Pau",
        desc: "Programmation complète d'un jeu web (énigmes en ligne) en HTML, CSS et PHP pour un Escape Game.",
        tags: ["HTML/CSS", "PHP", "Game Dev"]
    },
    {
        role: "Caissier",
        company: "Intermarché",
        period: "2022 - 2023",
        location: "Pau",
        desc: "Travaille à temps partiel à Intermarché les week-ends.",
        tags: ["Aisance relationnelle / sens du contact", "Gestion des stocks", "Gestion des clients", "Gestion des paiements"]
    },
    {
        role: "Stagiaire boucher",
        company: "Boucherie Favin Clément",
        period: "2017",
        location: "Bordeaux",
        desc: "Découverte du métier de boucher à la Boucherie Favin Clément.",
        tags: ["Découverte du métier", "gestion clientèle"]
    },
    {
        role: "Voyage scolaire",
        company: "Collège Canterane",
        period: "2016",
        location: "Bordeaux",
        desc: "Voyage scolaire en Italie avec option Latin en 2016.",
        tags: ["Voyage scolaire", "Latin"]
    }

];

// 4. Formations (Diplômes)
export const education = [
    {
        degree: "Master 2 - Dév Full Stack",
        school: "Sup de Vinci, Bordeaux",
        year: "Depuis 2024"
    },
    {
        degree: "Bachelor Concepteur Dév.",
        school: "CESI, Bordeaux",
        year: "2024"
    },
    {
        degree: "BTS SIO (Option SLAM)",
        school: "Lycée St-John Perse, Pau",
        year: "2023"
    },
    {
        degree: "Bac STI2D",
        school: "Lycée Saint-Cricq, Pau",
        year: "2021"
    }
];


// 5. Projets (Mix CV + Projets Persos)
// Note : J'ai gardé tes projets persos (Cacgino) car ils sont plus visuels pour un portfolio que des missions confidentielles CGI.
export const projects = [
    {
        title: "Cacgino (Web Game)",
        desc: "Jeu multijoueur. Project personnel utilisant React et les WebSockets.",
        tags: ["React", "Node.js", "Perso"],
        link: "https://cacgino-frontend.onrender.com/index.html",
        placeholder: "Cacgino"
    },
    {
        title: "Feedly Reader",
        desc: "Interface de récupération de feed perso afin d'être à jour dans l'actualité souhaité et les trier.",
        tags: ["PHP", "Interactivité", "Stage"],
        link: "https://feedly-reader.vercel.app/",
        placeholder: "Lecteur de Feed"
    },
    {
        title: "Budget Tracker",
        desc: "Interface de calcul de revenue/dépense pour gérer son argent.",
        tags: ["PHP", "Interactivité", "Stage"],
        link: "https://budget-tracker-iota-weld.vercel.app/",
        placeholder: "Gestion monétaire"
    },
    {
        title: "Formulaire Médical",
        desc: "Solution de gestion patients réalisée chez ElémentRoot avec Symfony. Architecture MVC stricte.",
        tags: ["Symfony", "Securité", "Pro"],
        link: "https://github.com/GARNIER-Emmanuel/form_dentiste_symfony.git",
        placeholder: "Projet Symfony"
    },
    {
        title: "Autres projets",
        desc: "Pour plus de projets personnels et professionnels, consultez mon GitHub.",
        tags: ["Perso", "Pro"],
        link: "https://github.com/GARNIER-Emmanuel?tab=repositories",
        placeholder: "GIT HUB"
    }
];
//6 interesting
export const interests = [
    {
        icon: "🚀",
        title: "Espace & Aérospatial",
        description: "Passionné par SpaceX, ArianeGroup et les défis technologiques de la conquête martienne."
    },
    {
        icon: "🎧",
        title: "Production Musicale",
        description: "\"Artiste\" expérimental passionné sur Cubase : composition, enregistrement et ingénierie du son (Mix/Master)."
    },
    {
        icon: "💻",
        title: "Développement Full Stack",
        description: "Veille active sur l'écosystème React/Node et les architectures logicielles modernes."
    },
    {
        icon: "🎮",
        title: "Gaming & Cinéma",
        description: "Amateur de RPGs et cinémas j'aime découvrir le cinéma en globalité, les films qui poussent à la réflexion et qui ne laisse aucun détails au hasard."
    },
    {
        icon: "🎨",
        title: "UI/UX & Design",
        description: "Conception d'interfaces immersives avec une esthétique soignée et/ou expérimentale abstraite :)."
    },
    {
        icon: "🧠",
        title: "Philosophie & Culture",
        description: "Curiosité pour la philosophie, l'amélioration de l'anglais et la réflexion critique."
    }
];
