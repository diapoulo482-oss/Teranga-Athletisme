/* =========================================================
   ATELIER BOURDIN — script.js
   Sommaire :
   1. Header au scroll (fond opaque)
   2. Menu hamburger (mobile)
   3. Lien de navigation actif au scroll
   4. Fermeture du menu au clic sur un lien
   5. Animations au scroll (Intersection Observer)
   6. Compteur animé des statistiques
   7. Validation du formulaire de contact
   8. Bouton retour en haut
   9. Année dynamique dans le footer
   10. Barre de progression du scroll
   11. Effet parallax sur le hero
   12. Titre du hero animé mot par mot
   13. Décalage (stagger) des animations de grille
   14. Effet tilt 3D sur les cartes de services
   15. Confirmation visuelle des commandes (toast)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. HEADER AU SCROLL
     Ajoute un fond opaque au header dès que l'utilisateur
     a défilé de plus de 60px.
     ========================================================= */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();


  /* =========================================================
     2. MENU HAMBURGER (MOBILE)
     ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });


  /* =========================================================
     3 & 4. LIENS DE NAVIGATION : actif au scroll + fermeture mobile
     ========================================================= */
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  // Ferme le menu mobile quand on clique sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Met en surbrillance le lien correspondant à la section visible
  function setActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + header.offsetHeight + 40;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);


  /* =========================================================
     5. ANIMATIONS AU SCROLL (Intersection Observer)
     Tous les éléments avec [data-animate] apparaissent en
     fondu / translation lorsqu'ils entrent dans le viewport.
     ========================================================= */
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // animation jouée une seule fois
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => observer.observe(el));


  /* =========================================================
     6. COMPTEUR ANIMÉ DES STATISTIQUES
     Anime les chiffres (150, 6, 98) de 0 jusqu'à leur valeur
     cible lorsque la section "À propos" devient visible.
     ========================================================= */
  const statNumbers = document.querySelectorAll('.stats__number');
  let statsAnimated = false;

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1500; // durée totale en ms
      const stepTime = 16; // ~60fps
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }


  /* =========================================================
     7. VALIDATION DU FORMULAIRE DE CONTACT
     ========================================================= */
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formSuccess = document.getElementById('form-success');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message-field');

  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function showError(input, errorEl, message) {
    input.classList.add('invalid');
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validation du nom
    if (nameInput.value.trim() === '') {
      showError(nameInput, errorName, 'Veuillez indiquer votre nom.');
      isValid = false;
    } else {
      clearError(nameInput, errorName);
    }

    // Validation de l'email
    if (emailInput.value.trim() === '') {
      showError(emailInput, errorEmail, 'Veuillez indiquer votre email.');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, errorEmail, 'Format d\'email invalide.');
      isValid = false;
    } else {
      clearError(emailInput, errorEmail);
    }

    // Validation du message
    if (messageInput.value.trim() === '') {
      showError(messageInput, errorMessage, 'Veuillez écrire un message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, errorMessage, 'Votre message est trop court (10 caractères min).');
      isValid = false;
    } else {
      clearError(messageInput, errorMessage);
    }

    if (isValid) {
      // Simulation d'envoi réussi (pas de backend sur ce projet statique)
      formSuccess.classList.add('show');
      form.reset();

      // Masque le message de succès après quelques secondes
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    } else {
      formSuccess.classList.remove('show');
    }
  });

  // Efface l'erreur dès que l'utilisateur recommence à taper
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });


  /* =========================================================
     8. BOUTON RETOUR EN HAUT
     ========================================================= */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* =========================================================
     9. ANNÉE DYNAMIQUE DANS LE FOOTER
     ========================================================= */
  document.getElementById('year').textContent = new Date().getFullYear();


  /* =========================================================
     10. BARRE DE PROGRESSION DU SCROLL
     Remplit une barre en haut de page selon la position
     de lecture dans le document.
     ========================================================= */
  const progressBar = document.getElementById('progress-bar');

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
  window.addEventListener('scroll', updateProgressBar);
  updateProgressBar();


  /* =========================================================
     11. EFFET PARALLAX SUR LE HERO
     L'image de fond se déplace plus lentement que le scroll,
     ce qui crée une impression de profondeur.
     ========================================================= */
  const heroBg = document.getElementById('hero-bg');
  const heroSection = document.getElementById('accueil');

  function updateParallax() {
    if (!heroBg || !heroSection) return;
    // N'anime que tant que le hero est visible (optimisation)
    if (window.scrollY < heroSection.offsetHeight) {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', updateParallax);


  /* =========================================================
     12. TITRE DU HERO ANIMÉ MOT PAR MOT
     Découpe le titre en mots, chacun encapsulé dans un <span>
     avec un délai d'animation croissant (effet cascade).
     ========================================================= */
  const heroTitle = document.getElementById('hero-title');

  if (heroTitle) {
    const words = heroTitle.textContent.trim().split(' ');
    heroTitle.innerHTML = words
      .map((word, i) => `<span class="word" style="animation-delay:${0.15 + i * 0.08}s">${word}</span>`)
      .join(' ');
  }


  /* =========================================================
     13. DÉCALAGE (STAGGER) DES ANIMATIONS DE GRILLE
     Applique un délai de transition croissant à chaque carte
     de service et chaque élément de portfolio, pour un effet
     d'apparition "en cascade" plutôt que toutes en même temps.
     ========================================================= */
  function applyStagger(selector, stepMs) {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
      item.style.setProperty('--stagger-delay', `${(index % 6) * stepMs}ms`);
    });
  }
  applyStagger('.services__grid [data-animate]', 100);
  applyStagger('.portfolio__grid [data-animate]', 80);


  /* =========================================================
     14. EFFET TILT 3D SUR LES CARTES DE SERVICES
     La carte s'incline légèrement en suivant la position
     de la souris, pour un effet de profondeur au survol.
     ========================================================= */
  const tiltCards = document.querySelectorAll('.service-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // inclinaison max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* =========================================================
     15. CONFIRMATION VISUELLE DES COMMANDES (TOAST)
     Quand le client clique sur "Commander", on affiche une
     confirmation sur le site (le lien WhatsApp s'ouvre en
     parallèle dans un nouvel onglet).
     ========================================================= */
  const orderButtons = document.querySelectorAll('.btn--order');
  const orderToast = document.getElementById('order-toast');
  const orderToastText = document.getElementById('order-toast-text');

  orderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.getAttribute('data-product');
      orderToastText.textContent = `Commande envoyée : ${product} ✓`;
      orderToast.classList.add('show');

      setTimeout(() => {
        orderToast.classList.remove('show');
      }, 4000);
    });
  });

});
