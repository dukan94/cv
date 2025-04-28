document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const header = document.querySelector('header');
        const target = document.querySelector(this.getAttribute('href'));
        const scrolledThreshold = 100; // Quando l'header diventa piccolo
        const smallHeaderHeight = 60;  // Altezza header piccolo

        const currentScroll = window.scrollY;
        const targetTopAbsolute = target.getBoundingClientRect().top + currentScroll;

        let headerHeightToConsider;

        
        if (currentScroll < scrolledThreshold) {
            // Sei ancora in alto, quindi l'header diventerà piccolo mentre scrolli
            headerHeightToConsider = header.offsetHeight + smallHeaderHeight;
        } else {
            // Sei già in basso, l'header è già piccolo
            headerHeightToConsider = header.offsetHeight;
        }

        const finalPosition = targetTopAbsolute - headerHeightToConsider;


        window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const toTop = document.querySelector('.to-top');
    
    if (window.scrollY > 100) { 
        header.classList.add('scrolled');
        toTop.style.display = 'inline';
    } else {
        header.classList.remove('scrolled');
        toTop.style.display = 'none';
    }
});

// Aggiungiamo il click su "Torna in alto"
document.querySelector('.to-top a').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
