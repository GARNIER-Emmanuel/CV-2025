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
        Actuellement en <strong>Master 1 Développement Full Stack</strong> à Sup de Vinci (Bordeaux) et en alternance chez CGI. 
        Je combine une solide base académique (BTS SIO, Bachelor CESI) avec une expérience terrain en développement Java et Web.
        Passionné par l'architecture logicielle (MVC, DAO) et la rigueur du code, j'applique la même précision dans mes projets personnels que dans mes commits.
    `
};

// 2. Liste des Compétences (Avec pourcentages pour les jauges)
export const skills = [
    // Frontend
    { name: 'React.js', percent: 85, color: 'bg-blue-400', text: 'text-blue-400' },
    { name: 'Tailwind CSS', percent: 90, color: 'bg-sky-300', text: 'text-sky-300' },
    { name: 'Angular', percent: 60, color: 'bg-red-500', text: 'text-red-500' },
    { name: 'Symfony / PHP', percent: 70, color: 'bg-indigo-400', text: 'text-indigo-400' },

    // Backend
    { name: 'Java (POO)', percent: 80, color: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'Node.js', percent: 65, color: 'bg-green-500', text: 'text-green-500' },
    { name: 'SQL', percent: 75, color: 'bg-blue-300', text: 'text-blue-300' },

    // DevOps
    { name: 'Docker', percent: 50, color: 'bg-blue-600', text: 'text-blue-600' }
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
        desc: "Jeu multijoueur temps réel. Side-project personnel utilisant React et les WebSockets.",
        tags: ["React", "Node.js", "Perso"],
        link: "#",
        placeholder: "Cacgino"
    },
    {
        title: "Formulaire Médical",
        desc: "Solution de gestion patients réalisée chez ElémentRoot avec Symfony. Architecture MVC stricte.",
        tags: ["Symfony", "Securité", "Pro"],
        link: "#",
        placeholder: "Projet Symfony"
    },
    {
        title: "Escape Game Web",
        desc: "Interface d'énigmes interactive réalisée pour Madness Escape Game.",
        tags: ["PHP", "Interactivité", "Stage"],
        link: "#",
        placeholder: "Escape Game"
    }
];
