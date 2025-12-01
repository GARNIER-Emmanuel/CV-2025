const planetData = {
    sun: {
        emoji: "☀️",
        title: "Le Soleil",
        type: "Étoile (Naine Jaune)",
        diameter: "1,392,700 km",
        distance: "0 km (Centre)",
        temp: "5,500°C (Surface)",
        dayLength: "27 jours (Rotation)",
        yearLength: "230 millions d'années (Galactique)",
        moons: "8 planètes",
        summary: "L'étoile centrale de notre système, source de vie et d'énergie.",
        history: "Né il y a 4.6 milliards d'années. Représente 99.86% de la masse du système solaire.",
        missions: [
            { name: "Parker Solar Probe", year: "2018-Actuel", agency: "NASA", status: "En cours", detail: "Sonde la plus rapide de l'histoire. Touche la couronne solaire." },
            { name: "Solar Orbiter", year: "2020-Actuel", agency: "ESA/NASA", status: "En cours", detail: "Première mission à prendre des photos des pôles du Soleil." },
            { name: "SOHO", year: "1995-Actuel", agency: "ESA/NASA", status: "Succès", detail: "Observe le soleil en continu depuis 30 ans (Météo spatiale)." }
        ]
    },
    mercury: {
        emoji: "🌑",
        title: "Mercure",
        type: "Planète Tellurique",
        diameter: "4,880 km",
        distance: "58 millions km",
        temp: "-173°C à 427°C",
        dayLength: "59 jours terrestres",
        yearLength: "88 jours terrestres",
        moons: "0",
        summary: "La plus petite planète, rapide et brûlée par le soleil.",
        history: "Connue depuis l'antiquité. Son noyau ferreux occupe 85% de son rayon.",
        missions: [
            { name: "Mariner 10", year: "1974", agency: "NASA", status: "Succès", detail: "Premier survol. A cartographié 45% de la surface." },
            { name: "MESSENGER", year: "2011-2015", agency: "NASA", status: "Succès", detail: "Première mise en orbite. A découvert de la glace aux pôles." },
            { name: "BepiColombo", year: "2018-2025", agency: "ESA/JAXA", status: "En approche", detail: "Deux sondes pour séparer l'étude de la planète et de sa magnétosphère." }
        ]
    },
    venus: {
        emoji: "🟡",
        title: "Vénus",
        type: "Planète Tellurique",
        diameter: "12,104 km",
        distance: "108 millions km",
        temp: "462°C (Moyenne)",
        dayLength: "243 jours (Rétrograde)",
        yearLength: "225 jours terrestres",
        moons: "0",
        summary: "La jumelle infernale de la Terre, couverte de nuages toxiques.",
        history: "Rotation rétrograde : le soleil s'y lève à l'ouest et se couche à l'est.",
        missions: [
            { name: "Venera 13", year: "1982", agency: "URSS", status: "Succès", detail: "A atterri et envoyé les premières photos couleur du sol (durée de vie : 127min)." },
            { name: "Magellan", year: "1989-1994", agency: "NASA", status: "Succès", detail: "Cartographie radar complète de la surface à travers les nuages." },
            { name: "DAVINCI+", year: "2029 (Prévu)", agency: "NASA", status: "Futur", detail: "Sonde atmosphérique pour analyser la chimie des nuages." }
        ]
    },
    earth: {
        emoji: "🌍",
        title: "Terre",
        type: "Planète Tellurique",
        diameter: "12,742 km",
        distance: "149.6 millions km",
        temp: "15°C (Moyenne)",
        dayLength: "23h 56min",
        yearLength: "365.25 jours",
        moons: "1 (La Lune)",
        summary: "Notre maison, le seul endroit connu abritant la vie.",
        history: "Seule planète connue avec de l'eau liquide en surface et une tectonique des plaques.",
        missions: [
            { name: "ISS", year: "1998-Actuel", agency: "Intl", status: "En cours", detail: "Laboratoire permanent en orbite basse habitée." },
            { name: "Sentinel-6", year: "2020", agency: "ESA", status: "En cours", detail: "Mesure précise de la montée du niveau des océans." },
            { name: "Hubble", year: "1990-Actuel", agency: "NASA/ESA", status: "Légende", detail: "Télescope spatial en orbite terrestre ayant révolutionné l'astronomie." }
        ]
    },
    moon: {
        emoji: "🌙",
        title: "Lune",
        type: "Satellite Naturel",
        diameter: "3,474 km",
        distance: "384,400 km (de la Terre)",
        temp: "-173°C à 127°C",
        dayLength: "27.3 jours",
        yearLength: "27.3 jours",
        moons: "0",
        summary: "Notre fidèle satellite naturel, responsable des marées.",
        history: "Le seul corps céleste extraterrestre visité par l'homme.",
        missions: [
            { name: "Apollo 11", year: "1969", agency: "NASA", status: "Historique", detail: "Premiers pas de l'homme sur la Lune (Armstrong/Aldrin)." },
            { name: "Chang'e 4", year: "2019", agency: "CNSA", status: "Succès", detail: "Premier atterrissage sur la face cachée de la Lune." },
            { name: "Artemis III", year: "2027 (Prévu)", agency: "NASA", status: "Futur", detail: "Retour des astronautes, visant le Pôle Sud lunaire." }
        ]
    },
    mars: {
        emoji: "🔴",
        title: "Mars",
        type: "Planète Tellurique",
        diameter: "6,779 km",
        distance: "228 millions km",
        temp: "-63°C (Moyenne)",
        dayLength: "24h 37min",
        yearLength: "687 jours terrestres",
        moons: "2 (Phobos, Deimos)",
        summary: "La planète rouge, abritant le plus haut volcan du système solaire.",
        history: "Possède le Mont Olympe (21km de haut). A eu de l'eau liquide dans son passé.",
        missions: [
            { name: "Curiosity", year: "2012-Actuel", agency: "NASA", status: "En cours", detail: "Rover nucléaire cherchant des traces d'habitabilité passée." },
            { name: "Perseverance", year: "2021-Actuel", agency: "NASA", status: "En cours", detail: "Collecte des échantillons de sol et a déployé l'hélicoptère Ingenuity." },
            { name: "Mars Sample Return", year: "2030 (Prévu)", agency: "NASA/ESA", status: "Futur", detail: "Mission complexe pour ramener les échantillons sur Terre." }
        ]
    },
    jupiter: {
        emoji: "🟠",
        title: "Jupiter",
        type: "Géante Gazeuse",
        diameter: "139,820 km",
        distance: "778 millions km",
        temp: "-108°C (Moyenne)",
        dayLength: "9h 55min",
        yearLength: "11.8 ans terrestres",
        moons: "95 (Europe, Ganymède...)",
        summary: "La plus grande planète, avec sa célèbre Grande Tache Rouge.",
        history: "Possède plus de 90 lunes, dont Ganymède, plus grande que Mercure.",
        missions: [
            { name: "Galileo", year: "1989-2003", agency: "NASA", status: "Succès", detail: "Première sonde en orbite. A largué une sonde dans l'atmosphère." },
            { name: "Juno", year: "2016-Actuel", agency: "NASA", status: "En cours", detail: "Étudie la structure interne et la magnétosphère polaire." },
            { name: "JUICE", year: "2023-2031", agency: "ESA", status: "En route", detail: "Exploration des lunes glacées (Europe, Ganymède, Callisto)." }
        ]
    },
    saturn: {
        emoji: "🪐",
        title: "Saturne",
        type: "Géante Gazeuse",
        diameter: "116,460 km",
        distance: "1.4 milliard km",
        temp: "-139°C (Moyenne)",
        dayLength: "10h 33min",
        yearLength: "29.5 ans terrestres",
        moons: "146 (Titan, Encelade...)",
        summary: "Célèbre pour son système d'anneaux complexe et spectaculaire.",
        history: "Ses anneaux sont très fins (environ 10m d'épaisseur) et composés de glace.",
        missions: [
            { name: "Cassini-Huygens", year: "1997-2017", agency: "NASA/ESA", status: "Légende", detail: "13 ans en orbite. A posé l'atterrisseur Huygens sur Titan." },
            { name: "Voyager 1", year: "1980", agency: "NASA", status: "Succès", detail: "Survol historique confirmant la complexité des anneaux." },
            { name: "Dragonfly", year: "2027 (Lancement)", agency: "NASA", status: "Futur", detail: "Un drone octocoptère volera dans l'atmosphère dense de Titan." }
        ]
    },
    uranus: {
        emoji: "🔵",
        title: "Uranus",
        type: "Géante de Glace",
        diameter: "50,724 km",
        distance: "2.9 milliards km",
        temp: "-197°C (Moyenne)",
        dayLength: "17h 14min",
        yearLength: "84 ans terrestres",
        moons: "27 (Miranda, Titania...)",
        summary: "La planète qui tourne sur le côté, avec une couleur bleu-vert.",
        history: "Première planète découverte au télescope (1781). Son axe est incliné à 98°.",
        missions: [
            { name: "Voyager 2", year: "1986", agency: "NASA", status: "Succès", detail: "Seul survol à ce jour. Découverte de 10 nouvelles lunes." },
            { name: "Uranus Orbiter", year: "Années 2030", agency: "NASA", status: "Concept", detail: "Mission prioritaire du 'Decadal Survey' pour étudier l'atmosphère." }
        ]
    },
    neptune: {
        emoji: "❄️",
        title: "Neptune",
        type: "Géante de Glace",
        diameter: "49,244 km",
        distance: "4.5 milliards km",
        temp: "-201°C (Moyenne)",
        dayLength: "16h 06min",
        yearLength: "165 ans terrestres",
        moons: "14 (Triton...)",
        summary: "La plus lointaine, balayée par les vents les plus rapides (2000 km/h).",
        history: "Découverte par le calcul mathématique avant d'être observée en 1846.",
        missions: [
            { name: "Voyager 2", year: "1989", agency: "NASA", status: "Succès", detail: "Seul survol. Observation de la 'Grande Tache Sombre'." },
            { name: "Neptune Odyssey", year: "Années 2030", agency: "NASA", status: "Concept", detail: "Projet d'orbiteur pour étudier la capture de la lune Triton." }
        ]
    }
};
