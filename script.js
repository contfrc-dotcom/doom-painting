document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation
    const floatingTitle = document.getElementById('floating-title');
    // Titre fixe (animation désactivée par le CSS)

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // 3. Navigation Header on Scroll
    const header = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollIndicator) scrollIndicator.style.opacity = '0';
        } else {
            header.classList.remove('scrolled');
            if (scrollIndicator) scrollIndicator.style.opacity = '1';
        }

        // Active Link on Scroll
        highlightNav();
    });

    // 3. Animation de Révélation au Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 4. Gestion du Formulaire de Devis
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation d'envoi
            const submitBtn = quoteForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                // Succès
                quoteForm.innerHTML = `
                    <div style="text-align: center; padding: 4rem;">
                        <span style="font-size: 5rem; display: block; margin-bottom: 2rem;">🚀</span>
                        <h3 style="font-size: 2.5rem; margin-bottom: 1rem; color: #00ecff;">Demande Envoyée !</h3>
                        <p style="color: #b0b0b0; font-size: 1.25rem;">Merci pour votre confiance. Notre équipe reviendra vers vous sous 48h avec une proposition détaillée.</p>
                        <button onclick="location.reload()" class="submit-btn" style="margin-top: 2rem; max-width: 300px;">Nouvelle demande</button>
                    </div>
                `;
            }, 2000);
        });
    }

    // 5. Navigation Link Highlight
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function highlightNav() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    }

    // 6. Smooth Scroll Adjustment for Header Height
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Mouse Tracking Glow Effect for Cards
    const cards = document.querySelectorAll('.service-card, .stat-item, .info-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
