document.addEventListener('DOMContentLoaded', () => { // Assicura che il DOM sia caricato

    // ----- CODICE ESISTENTE PER LO SCROLL FLUIDO E HEADER -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Escludiamo i link dei progetti dalla logica dello scroll fluido
        if (!anchor.classList.contains('progetto-link')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                // Se l'href è solo "#", come nel caso di "Torna in alto" nell'header non scrollato
                // o come i link dei progetti (che comunque escludiamo sopra),
                // gestiamo lo scroll a top o non facciamo nulla per i progetti.
                if (targetId === '#') {
                    if (this.closest('.to-top')) { // Se è il link "Torna in alto"
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                    // Per i link progetto con href="#" non facciamo nulla qui,
                    // la gestione del popup è separata.
                    return;
                }

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return; // Se il target non esiste, esci

                const header = document.querySelector('header');
                let headerOffset = 0;

                // Calcola l'offset dell'header solo se è fisso (ha la classe .scrolled)
                // o se lo diventerà durante lo scroll verso l'elemento
                if (header.classList.contains('scrolled')) {
                    headerOffset = header.offsetHeight;
                } else {
                    // Se l'header non è ancora "scrolled", considera la sua altezza futura "scrolled"
                    // Questo è un'approssimazione, potresti voler usare l'altezza fissa definita nel CSS (es. 60px)
                    headerOffset = 60; // Altezza dell'header quando è 'scrolled'
                }

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        }
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const toTopButton = document.querySelector('.to-top'); // Rinominato per chiarezza

        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (toTopButton) toTopButton.style.display = 'inline'; // Verifica se toTopButton esiste
        } else {
            header.classList.remove('scrolled');
            if (toTopButton) toTopButton.style.display = 'none'; // Verifica se toTopButton esiste
        }
    });

    // Gestione click "Torna in alto" (già gestito sopra nello script di scroll, ma lo teniamo per ridondanza o se si rimuove l'altro)
    const toTopLink = document.querySelector('.to-top a');
    if (toTopLink) { // Verifica se il link "Torna in alto" esiste
        toTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----- NUOVO CODICE PER LA GESTIONE DEL POP-UP -----

    const popup = document.getElementById('popup-messaggio');
    const projectLinks = document.querySelectorAll('.progetto-link'); // Seleziona i link dei progetti
    const closeButton = document.querySelector('.popup-close');

    // Funzione per mostrare il popup
    function openPopup() {
        if (popup) {
            popup.classList.add('active');
        }
    }

    // Funzione per nascondere il popup
    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
        }
    }

    // Aggiungi event listener a tutti i link dei progetti
    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previene il comportamento predefinito del link (andare a #)
            openPopup();
        });
    });

    // Aggiungi event listener al bottone di chiusura
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closePopup();
        });
    }

    // Aggiungi event listener per chiudere il popup cliccando sullo sfondo (overlay)
    if (popup) {
        popup.addEventListener('click', function(event) {
            // Se l'elemento cliccato è il popup stesso (l'overlay) e non un suo figlio
            if (event.target === popup) {
                closePopup();
            }
        });
    }

    // Opzionale: Chiudi il popup con il tasto "Escape"
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            if (popup && popup.classList.contains('active')) {
                closePopup();
            }
        }
    });

}); // Fine DOMContentLoaded