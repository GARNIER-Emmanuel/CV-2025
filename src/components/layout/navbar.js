const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-sky-900/30', 'shadow-lg', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-sky-900/30', 'shadow-lg', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });
}
