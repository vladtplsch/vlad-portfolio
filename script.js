/**
 * Toplitsch Vladimir — Portfolio
 * ------------------------------------------------------------------
 * 1. Données des projets (à éditer pour changer le contenu)
 * 2. Génération du sommaire et des sections projet depuis les données
 * 3. Pagination : génération des points + suivi de la section active
 * 4. Page de détail : ouverture / fermeture, gestion du focus
 * 5. Lightbox : aperçu plein écran d'une image
 * 6. Curseur personnalisé : petit cercle qui suit la souris
 * ------------------------------------------------------------------
 */

/* ==========================================================================
   1. Données des projets
   Chaque entrée alimente à la fois le point de pagination et la page
   de détail associée. "images" liste les visuels détaillés du projet —
   soit une simple chaîne (comme ci-dessous), soit, pour éviter un saut de
   mise en page au chargement, { src: '...', width: 1200, height: 1600 }
   (les vraies dimensions en pixels du fichier).
   ========================================================================== */
const projects = [
  {
    tag: 'édition',
    year: 'projet graphique – 2026',
    title: "agend'archive",
    cover: { src: 'images/IMG_2605.jpg', alt: "Couverture du projet agend'archive" },
    text: "À partir d'une récolte d'archives de l'école, j'ai conçu cet objet éditorial autour d'un jeu de transparence : une feuille de calque glissée entre les pages laisse deviner ce qui suit, tandis qu'une micro-typographie vient discrètement rythmer la lecture.",
    images: [
      'images/Présentation agenda_Final copie_Page_02.jpg',
      'images/Présentation agenda_Final copie_Page_03.jpg',
      'images/Présentation agenda_Final copie_Page_04.jpg',
      'images/Présentation agenda_Final copie_Page_05.jpg',
      'images/Présentation agenda_Final copie_Page_06.jpg',
      'images/Présentation agenda_Final copie_Page_07.jpg',
      'images/Présentation agenda_Final copie_Page_08.jpg',
      'images/Présentation agenda_Final copie_Page_09.jpg',
      'images/Présentation agenda_Final copie_Page_10.jpg',
      'images/Présentation agenda_Final copie_Page_11.jpg',
    ],
  },
  {
    tag: 'affiche',
    year: 'workshop – 2024',
    title: 'workshop',
    cover: { src: 'images/IMG_2607.webp', alt: 'Affiche du workshop typographique' },
    text: "Affiche réalisée dans le cadre d'un workshop mené par Guillaume Besson pendant mes études en graphisme, autour d'une recette de cuisine. La composition joue sur la superposition de couches de couleur : chacune vient enrichir l'image jusqu'à révéler, progressivement, l'affiche finale.",
    images: ['images/IMG_2607.webp'





    ],
  },
  {
    tag: 'affiche',
    year: 'design – 2025',
    title: 'nifff',
    cover: { src: 'images/nifff.webp', alt: 'Affiche du Nifff' },
    text: "Conçue pour le Nifff, le festival international du film fantastique de Neuchâtel, cette affiche donne forme à un visage assemblé par collage, à partir de fragments d'images puisées dans les films du festival: une figure hybride, à mi-chemin entre cinéma et papier découpé. La typographie vient ensuite organiser cette composition dense, pour que l'affiche reste lisible sans effacer l'énergie brute du collage.",
    images: ['images/nifff.webp'],
  },
  {
    tag: 'textile',
    year: '2026',
    title: 'collaboration bico',
    cover: { src: 'images/bico01.webp', alt: 'Création de deux pulls pour la marque suisse Bico' },
    text: "Contacté par la marque suisse Bico pour concevoir sa nouvelle collection, j'ai conçu ces deux pulls autour de la broderie et de l'impression à chaud. Deux techniques exigeantes, qui font dialoguer précision textile et geste graphique plus brut.",
    images: [
    
      'images/bico01.webp',
      'images/bico02.webp',
      'images/bico001.jpg',
    ],
  },
  {
    tag: 'flyer',
    year: '2026',
    title: 'pavillon sicli',
    cover: { src: 'images/thomas01.webp', alt: 'Flyer pour la programmation de films au Pavillon Sicli' },
    text: "À l'occasion de l'exposition de Thomas Hirschhorn au Pavillon Sicli, à Genève, j'ai participé à une programmation de films diffusés au sein même de l'exposition, en écho à son travail. J'ai conçu le flyer annonçant ces séances, avec une identité graphique pensée pour dialoguer avec l'univers de l'artiste.",
    images: [
      'images/thomas00.webp',
      'images/thomas02.webp',
      'images/thomas04.webp',
      'images/thomas00.webp',
    ],
  },
];

/* ==========================================================================
   2. Génération du contenu depuis les données
   Le titre, le tag, l'année et l'image de couverture de chaque projet ne
   vivent qu'à un seul endroit (le tableau "projects" ci-dessus). Le sommaire
   de l'intro et les sections projet sont construits à partir de lui, pour
   qu'il ne puisse jamais y avoir de désaccord entre la carte et le détail.
   ========================================================================== */
const introNav = document.getElementById('introNav');
const scrollContainer = document.getElementById('scrollContainer');

// Dans le champ "year" ("workshop – 2024", "projet graphique – 2026"…),
// seule l'année à 4 chiffres est affichée sur la carte ; la page de détail,
// elle, garde la mention complète.
function extractCardYear(year) {
  const match = year.match(/\d{4}/);
  return match ? match[0] : year;
}

// Une entrée d'"images" peut rester une simple chaîne (comme aujourd'hui) ou
// devenir { src, width, height } pour réserver l'espace exact avant que
// l'image ne charge (évite un saut de mise en page). Les deux formats sont
// acceptés, donc ajouter les dimensions plus tard ne casse rien.
function resolveImageEntry(entry) {
  return typeof entry === 'string' ? { src: entry } : entry;
}

// Découpe le texte d'un lien en lettres animables individuellement (entrée
// depuis la gauche, en grand, qui se resserrent à leur taille finale). Le mot
// entier reste accessible via aria-label : chaque lettre, elle, est purement
// décorative (aria-hidden) pour qu'un lecteur d'écran ne l'épelle pas.
function animateLettersIn(link, text, startDelayMs) {
  link.setAttribute('aria-label', text);
  link.textContent = '';
  let letterIndex = 0;
  Array.from(text).forEach((char) => {
    // Une espace doit rester un vrai nœud de texte, jamais enfermée dans son
    // propre span display:inline-block : isolée comme ça, elle s'affichait
    // de façon peu fiable (largeur nulle dans certains cas). Un nœud de
    // texte entre deux spans, c'est la façon standard et toujours fiable
    // dont le HTML gère les espaces entre mots.
    if (char === ' ') {
      link.appendChild(document.createTextNode(' '));
      return;
    }
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.textContent = char;
    letter.setAttribute('aria-hidden', 'true');
    letter.style.animationDelay = `${startDelayMs + letterIndex * 22}ms`;
    link.appendChild(letter);
    letterIndex += 1;
  });
}

// Empêche qu'une ligne se termine sur un petit mot de liaison (moins de 4
// lettres : "de", "un", "et"…) en le soudant au mot suivant par une espace
// insécable. Le mot ne peut alors plus se retrouver seul en fin de ligne.
function preventOrphans(text) {
  const words = text.split(' ');
  let result = '';
  words.forEach((word, i) => {
    result += word;
    if (i < words.length - 1) {
      const bare = word.replace(/[.,;:!?"'«»)\]]+$/g, '');
      result += bare.length > 0 && bare.length < 4 ? '\u00A0' : ' ';
    }
  });
  return result;
}

projects.forEach((project, index) => {
  const link = document.createElement('a');
  link.className = 'intro-link';
  link.href = `#project-${index}`;
  animateLettersIn(link, project.title, index * 120);
  introNav.appendChild(link);

  const section = document.createElement('section');
  section.className = 'project-section';
  section.id = `project-${index}`;
  section.dataset.project = String(index);
  section.tabIndex = 0;
  section.setAttribute('role', 'button');
  section.setAttribute('aria-haspopup', 'dialog');
  section.setAttribute('aria-label', `Voir le projet : ${project.title}`);

  const img = document.createElement('img');
  img.src = project.cover.src;
  img.alt = project.cover.alt;
  img.className = 'project-bg';
  img.loading = index === 0 ? 'eager' : 'lazy';
  img.decoding = 'async';
  section.appendChild(img);

  const content = document.createElement('div');
  content.className = 'project-content';
  content.innerHTML = `
    <span class="project-meta project-tag">${project.tag}</span>
    <h2 class="project-title">${project.title}</h2>
    <span class="project-meta project-year">${extractCardYear(project.year)}</span>
  `;
  section.appendChild(content);

  scrollContainer.appendChild(section);
});

/* ==========================================================================
   3. Pagination
   ========================================================================== */
const paginationEl = document.getElementById('pagination');

// Ne cible que les vraies sections projet : l'intro a sa propre classe
// ("intro") et n'est donc jamais sélectionnée ici.
const sections = Array.from(document.querySelectorAll('.project-section'));

// Génère un point de pagination par projet.
const dots = sections.map((section, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  const project = projects[Number(section.dataset.project)];
  dot.setAttribute('aria-label', `Aller au projet : ${project.title}`);
  if (index === 0) {
    dot.classList.add('active');
    dot.setAttribute('aria-current', 'true');
  }
  dot.addEventListener('click', () => {
    section.scrollIntoView({ behavior: 'smooth' });
  });
  paginationEl.appendChild(dot);
  return dot;
});

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    const isActive = i === index;
    dot.classList.toggle('active', isActive);
    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });
}

// Observe quelle section occupe le plus l'écran pour mettre à jour la pagination.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        setActiveDot(sections.indexOf(entry.target));
      }
    });
  },
  { root: scrollContainer, threshold: 0.5 }
);
sections.forEach((section) => sectionObserver.observe(section));

// Sur la section d'intro, aucun projet n'est actif : on éteint tous les points.
const introSection = document.getElementById('intro');
if (introSection) {
  const introObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveDot(-1);
        }
      });
    },
    { root: scrollContainer, threshold: 0.5 }
  );
  introObserver.observe(introSection);
}

/* ==========================================================================
   4. Page de détail
   ========================================================================== */
const detail = document.getElementById('detail');
const detailClose = document.getElementById('detailClose');
const detailTag = document.getElementById('detailTag');
const detailYear = document.getElementById('detailYear');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailImages = document.getElementById('detailImages');

let lastFocusedElement = null;

// État réel des overlays, mis à jour immédiatement à l'ouverture et à la
// fermeture. On ne se fie ni à la classe d'animation ni à l'attribut `hidden`,
// qui n'arrivent qu'à la fin du fondu : pendant ces quelques centaines de
// millisecondes, deux appuis rapides sur Échap viseraient le mauvais overlay.
let detailOpen = false;
let lightboxOpen = false;

/**
 * Masque un overlay une fois son fondu terminé.
 * Deux précautions : on ignore les transitionend qui remontent des enfants
 * (le bouton « fermer » en a une), et un délai de secours garantit que
 * l'overlay finit toujours par être masqué, même si l'événement n'arrive pas.
 * Sans cela, un overlay invisible resterait au-dessus de la page et
 * bloquerait tous les clics.
 */
function hideAfterTransition(element, onHidden) {
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    element.removeEventListener('transitionend', onTransitionEnd);
    clearTimeout(fallback);
    element.hidden = true;
    if (onHidden) onHidden();
  };

  function onTransitionEnd(event) {
    if (event.target === element) finish();
  }

  element.addEventListener('transitionend', onTransitionEnd);
  const fallback = setTimeout(finish, 600);
}

/**
 * Garde le focus clavier à l'intérieur d'un overlay ouvert (détail ou
 * lightbox) : Tab depuis le dernier élément focusable revient au premier,
 * et Maj+Tab depuis le premier va au dernier.
 */
function trapFocus(container, event) {
  const focusable = container.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openDetail(index) {
  const project = projects[index];

  detailTag.textContent = project.tag;
  detailYear.textContent = project.year;
  detailTitle.textContent = project.title;
  detailText.textContent = preventOrphans(project.text);

  detailImages.innerHTML = '';

  project.images.forEach((entry, i) => {
    const { src, width, height } = resolveImageEntry(entry);
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Visuel détaillé ${i + 1} — ${project.title}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    if (width && height) {
      img.width = width;
      img.height = height;
    }
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', () => openLightboxImage(project.images, i, project.title));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightboxImage(project.images, i, project.title);
      }
    });
    detailImages.appendChild(img);
  });

  lastFocusedElement = document.activeElement;

  detailOpen = true;
  detail.hidden = false;
  // On force le navigateur à recalculer la mise en page avant d'ajouter la
  // classe, pour que la transition CSS se joue. Un requestAnimationFrame
  // serait retardé quand l'onglet n'est pas au premier plan, ce qui laisserait
  // la page ouverte mais jamais « active » — donc impossible à fermer.
  void detail.offsetWidth;
  detail.classList.add('active');

  detail.scrollTop = 0;
  detailClose.focus();
}

function closeDetail() {
  if (!detailOpen) return;
  detailOpen = false;
  detail.classList.remove('active');
  hideAfterTransition(detail);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* ==========================================================================
   5. Lightbox (aperçu plein écran d'une image)
   ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxContent = document.getElementById('lightboxContent');

let lastFocusedBeforeLightbox = null;

// Images du projet actuellement affiché dans la lightbox, et index courant :
// cliquer sur l'image passe à la suivante (et boucle après la dernière).
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxProjectTitle = '';

function renderLightboxImage() {
  const { src } = resolveImageEntry(lightboxImages[lightboxIndex]);
  lightboxContent.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Visuel détaillé ${lightboxIndex + 1} — ${lightboxProjectTitle}`;
  // Cliquer sur l'image passe à la suivante (boucle à la fin) ; le bouton
  // « fermer » reste le seul moyen de quitter la lightbox, à tout moment.
  img.addEventListener('click', () => showLightboxImage(1));
  lightboxContent.appendChild(img);
}

function showLightboxImage(delta) {
  lightboxIndex = (lightboxIndex + delta + lightboxImages.length) % lightboxImages.length;
  renderLightboxImage();
}

function openLightboxImage(images, index, projectTitle) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxProjectTitle = projectTitle;
  renderLightboxImage();

  lightboxOpen = true;
  lastFocusedBeforeLightbox = document.activeElement;
  lightbox.hidden = false;
  void lightbox.offsetWidth; // force le recalcul avant la transition
  lightbox.classList.add('active');
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightboxOpen) return;
  lightboxOpen = false;
  lightbox.classList.remove('active');

  hideAfterTransition(lightbox, () => {
    lightboxContent.innerHTML = '';
    lightboxImages = [];
  });

  if (lastFocusedBeforeLightbox) {
    lastFocusedBeforeLightbox.focus();
  }
}

lightboxClose.addEventListener('click', closeLightbox);

// Cliquer sur le fond noir (en dehors de l'image) referme le lightbox.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

sections.forEach((section) => {
  const index = Number(section.dataset.project);

  section.addEventListener('click', () => openDetail(index));

  // Accessibilité clavier : Entrée ou Espace ouvre le projet.
  section.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetail(index);
    }
  });
});

detailClose.addEventListener('click', closeDetail);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    // On teste l'état réel de l'overlay (pas la classe d'animation ni
    // `hidden`) : la fermeture marche même si la transition n'a pas eu lieu.
    if (lightboxOpen) {
      closeLightbox();
    } else if (detailOpen) {
      closeDetail();
    }
  } else if (event.key === 'Tab') {
    if (lightboxOpen) {
      trapFocus(lightbox, event);
    } else if (detailOpen) {
      trapFocus(detail, event);
    }
  } else if (lightboxOpen && lightboxImages.length > 1) {
    if (event.key === 'ArrowRight') {
      showLightboxImage(1);
    } else if (event.key === 'ArrowLeft') {
      showLightboxImage(-1);
    }
  }
});

/* ==========================================================================
   6. Curseur personnalisé
   Un petit cercle qui suit la souris et grossit sur les éléments cliquables
   (le style, en mix-blend-mode: difference, s'occupe de l'inversion des
   couleurs). Seulement sur souris/trackpad : sur tactile il n'y a pas de
   pointeur à suivre, la piste est donc coupée dès le départ.
   ========================================================================== */
const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const cursorDot = document.getElementById('cursorDot');

if (canUseCustomCursor && cursorDot) {
  // top/left changent la position d'un élément fixed à chaque frame de
  // souris, ce que le navigateur doit recalculer ; translate3d, lui, passe
  // directement par le compositeur (GPU), sans recalcul de mise en page.
  // rAF regroupe en plus les mouvements rapprochés en une seule mise à jour
  // par frame plutôt que d'en empiler une par événement "mousemove".
  let pendingX = 0;
  let pendingY = 0;
  let frameRequested = false;

  function paintCursor() {
    cursorDot.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0) translate(-50%, -50%)`;
    frameRequested = false;
  }

  document.addEventListener(
    'mousemove',
    (event) => {
      pendingX = event.clientX;
      pendingY = event.clientY;
      cursorDot.classList.add('is-visible');
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(paintCursor);
      }
    },
    { passive: true }
  );

  // Le curseur ne doit pas rester visible s'il sort de la fenêtre — ou si
  // la fenêtre elle-même perd le focus (ex. alt-tab vers une autre appli).
  document.documentElement.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('is-visible');
  });
  window.addEventListener('blur', () => {
    cursorDot.classList.remove('is-visible');
  });

  // Grossit au survol de tout ce qui est cliquable, y compris ce qui est
  // généré dynamiquement (sections projet, points de pagination, images).
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('a, button, [role="button"]')) {
      cursorDot.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a, button, [role="button"]')) {
      cursorDot.classList.remove('is-hovering');
    }
  });
}
