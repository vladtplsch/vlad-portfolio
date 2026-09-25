/**
 * Toplitsch Vladimir — Portfolio
 */

const projects = [
  {
    tag: 'édition',
    year: 'projet graphique – 2026',
    title: "agend'archive",
    cover: { 
      type: 'video', 
      src: 'video-agenda-web.mp4', 
      alt: "Vidéo agend'archive" 
    },
    text: "À partir d'une récolte d'archives de l'école, j'ai conçu cet objet éditorial autour d'un jeu de transparence : une feuille de calque glissée entre les pages laisse deviner ce qui suit, tandis qu'une micro-typographie vient discrètement rythmer la lecture.",
    images: [
      'video-agenda-web.mp4',
      'images/Présentation agenda_Final copie_Page_02_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_03_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_04_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_05_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_06_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_07_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_08_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_09_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_10_resultat_resultat.webp',
      'images/Présentation agenda_Final copie_Page_11_resultat_resultat.webp',
    ],
  },
  {
    tag: 'affiche',
    year: 'workshop – 2024',
    title: 'workshop',
    cover: { src: 'images/IMG_2607_resultat_resultat.webp', alt: 'Affiche du workshop typographique' },
    text: "Affiche réalisée dans le cadre d'un workshop mené par Guillaume Besson pendant mes études en graphisme, autour d'une recette de cuisine. La composition joue sur la superposition de couches de couleur : chacune vient enrichir l'image jusqu'à révéler, progressivement, l'affiche finale.",
    images: [
      'images/IMG_2607_resultat_resultat.webp',
      'images/workshop_resultat_resultat.webp',
      'images/workshop01_resultat_resultat.webp',
      'images/workshop02_resultat_resultat.webp',
    ],
  },
  {
    tag: 'affiche',
    year: 'design – 2025',
    title: 'nifff',
    cover: { src: 'images/nifff_resultat_resultat.webp', alt: 'Affiche du Nifff' },
    text: "Conçue pour le Nifff, le festival international du film fantastique de Neuchâtel, cette affiche donne forme à un visage assemblé par collage, à partir de fragments d'images puisées dans les films du festival: une figure hybride, à mi-chemin entre cinéma et papier découpé. La typographie vient ensuite organiser cette composition dense, pour que l'affiche reste lisible sans effacer l'énergie brute du collage.",
    images: ['images/nifff_resultat_resultat.webp'],
  },
  {
    tag: 'textile',
    year: '2026',
    title: 'collaboration bico',
    cover: { src: 'images/bico01_resultat_resultat.webp', alt: 'Création de deux pulls pour la marque suisse Bico' },
    text: "Contacté par la marque suisse Bico pour concevoir sa nouvelle collection, j'ai conçu ces deux pulls autour de la broderie et de l'impression à chaud. Deux techniques exigeantes, qui font dialoguer précision textile et geste graphique plus brut.",
    images: [
      'images/bico01_resultat_resultat.webp',
      'images/bico02_resultat_resultat.webp',
      'images/bico001_resultat_resultat.webp',
    ],
  },
  {
    tag: 'flyer',
    year: '2026',
    title: 'pavillon sicli',
    cover: { src: 'images/thomas01_resultat_resultat.webp', alt: 'Flyer pour la programmation de films au Pavillon Sicli' },
    text: "À l'occasion de l'exposition de Thomas Hirschhorn au Pavillon Sicli, à Genève, j'ai participé à une programmation de films diffusés au sein même de l'exposition, en écho à son travail. J'ai conçu le flyer annonçant ces séances, avec une identité graphique pensée pour dialoguer avec l'univers de l'artiste.",
    images: [
      'images/thomas00_resultat_resultat.webp',
      'images/thomas02_resultat_resultat.webp',
      'images/thomas03_resultat_resultat.webp',
      'images/thomas04_resultat_resultat.webp',
    ],
  },
];

/* ==========================================================================
   Éléments du DOM
   ========================================================================== */
const scrollContainer = document.getElementById('scrollContainer');
const introNav = document.getElementById('introNav');
const introSection = document.getElementById('intro');
const paginationEl = document.getElementById('pagination');
const headerEl = document.querySelector('header');
const footerEl = document.querySelector('footer');

const detail = document.getElementById('detail');
const detailClose = document.getElementById('detailClose');
const detailTag = document.getElementById('detailTag');
const detailYear = document.getElementById('detailYear');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailImages = document.getElementById('detailImages');

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxContent = document.getElementById('lightboxContent');

const about = document.getElementById('about');
const aboutTrigger = document.getElementById('aboutTrigger');
const aboutClose = document.getElementById('aboutClose');
const aboutMeta = document.getElementById('aboutMeta');
const aboutText = document.getElementById('aboutText');
const aboutList = document.getElementById('aboutList');
const aboutAvailability = document.getElementById('aboutAvailability');

const aboutData = {
  age: '25 ans',
  city: 'Lausanne',
  text: "Étudiant en 3e année de CFC Graphiste à l'ERACOM. Mon travail est axé sur la création, l'édition et la recherche typographique.",
  parcours: [
    { place: 'ERACOM, Lausanne', role: 'CFC Graphiste (en cours)' },
    { place: 'Stéphan Hernandez, Genève', role: "Stage d'un an en atelier" },
    { place: 'Le Zinéma, Lausanne', role: 'Projectionniste' },
  ],
  availability: '',
};

/* ==========================================================================
   Utilitaires
   ========================================================================== */
const isVideo = (src) => /\.(mp4|webm)$/.test(src);

function createVideo(src, className, controls = false) {
  const video = document.createElement('video');
  Object.assign(video, {
    src,
    className,
    controls,
    autoplay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'metadata',
  });
  return video;
}

/* Clic + clavier (Entrée / Espace) sur un élément role="button" */
function onActivate(element, handler) {
  element.addEventListener('click', handler);
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  });
}

function extractCardYear(year) {
  const match = year.match(/\d{4}/);
  return match ? match[0] : year;
}

function animateLettersIn(link, text, startDelayMs) {
  link.setAttribute('aria-label', text);
  link.textContent = '';
  let letterIndex = 0;
  Array.from(text).forEach((char) => {
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

/* Masque un élément une fois sa transition de sortie terminée.
   Ne fait rien s'il a été rouvert entre-temps. */
function hideAfterTransition(element, onHidden) {
  const finish = () => {
    element.removeEventListener('transitionend', onTransitionEnd);
    clearTimeout(fallback);
    if (element.classList.contains('active')) return;
    element.hidden = true;
    if (onHidden) onHidden();
  };
  const onTransitionEnd = (event) => {
    if (event.target === element) finish();
  };
  element.addEventListener('transitionend', onTransitionEnd);
  const fallback = setTimeout(finish, 600);
}

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

/* ==========================================================================
   Construction : sommaire, sections projet, pagination
   ========================================================================== */
const sections = [];
const dots = [];

projects.forEach((project, index) => {
  const link = document.createElement('a');
  link.className = 'intro-link';
  link.href = `#project-${index}`;
  animateLettersIn(link, project.title, index * 120);
  introNav.appendChild(link);

  const section = document.createElement('section');
  section.className = 'project-section';
  section.id = `project-${index}`;
  section.tabIndex = 0;
  section.setAttribute('role', 'button');
  section.setAttribute('aria-haspopup', 'dialog');
  section.setAttribute('aria-label', `Voir le projet : ${project.title}`);

  if (project.cover.type === 'video') {
    const bgVideo = createVideo(project.cover.src, 'project-bg');
    bgVideo.setAttribute('aria-hidden', 'true');
    bgVideo.tabIndex = -1;
    section.appendChild(bgVideo);
  } else {
    const img = document.createElement('img');
    img.src = project.cover.src;
    img.alt = project.cover.alt;
    img.className = 'project-bg';
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    section.appendChild(img);
  }

  const content = document.createElement('div');
  content.className = 'project-content';

  const tagEl = document.createElement('span');
  tagEl.className = 'project-meta project-tag';
  tagEl.textContent = project.tag;

  const titleEl = document.createElement('h2');
  titleEl.className = 'project-title';
  titleEl.textContent = project.title;

  const yearEl = document.createElement('span');
  yearEl.className = 'project-meta project-year';
  yearEl.textContent = extractCardYear(project.year);

  content.append(tagEl, titleEl, yearEl);
  section.appendChild(content);

  onActivate(section, () => openDetail(index));
  scrollContainer.appendChild(section);
  sections.push(section);

  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Aller au projet : ${project.title}`);
  dot.addEventListener('click', () => section.scrollIntoView({ behavior: 'smooth' }));
  paginationEl.appendChild(dot);
  dots.push(dot);
});

/* ==========================================================================
   Section visible : pagination + lecture des vidéos (un seul observer)
   ========================================================================== */
let activeDot = -1;

function setActiveDot(index) {
  if (index === activeDot) return;
  const previous = dots[activeDot];
  if (previous) {
    previous.classList.remove('active');
    previous.removeAttribute('aria-current');
  }
  activeDot = index;
  const current = dots[index];
  if (current) {
    current.classList.add('active');
    current.setAttribute('aria-current', 'true');
  }
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ target, intersectionRatio }) => {
      const visible = intersectionRatio >= 0.5;
      const video = target.querySelector('video');
      if (video) {
        if (visible) video.play().catch(() => {});
        else video.pause();
      }
      if (visible) setActiveDot(sections.indexOf(target)); // l'intro donne -1
    });
  },
  { root: scrollContainer, threshold: 0.5 }
);
sectionObserver.observe(introSection);
sections.forEach((section) => sectionObserver.observe(section));

/* ==========================================================================
   Page de détail
   ========================================================================== */
let lastFocusedElement = null;
let detailOpen = false;

function openDetail(index) {
  const project = projects[index];

  detailTag.textContent = project.tag;
  detailYear.textContent = project.year;
  detailTitle.textContent = project.title;
  detailText.textContent = preventOrphans(project.text);

  const fragment = document.createDocumentFragment();
  project.images.forEach((src, i) => {
    if (isVideo(src)) {
      fragment.appendChild(createVideo(src, 'detail-video', true));
      return;
    }
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Visuel détaillé ${i + 1} — ${project.title}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    onActivate(img, () => openLightboxImage(project.images, i, project.title));
    fragment.appendChild(img);
  });
  detailImages.replaceChildren(fragment);

  lastFocusedElement = document.activeElement;
  detailOpen = true;
  updateBackgroundInert();
  detail.hidden = false;
  detail.classList.add('active');
  detail.scrollTop = 0;
  detailClose.focus();
}

function closeDetail() {
  if (!detailOpen) return;
  detailOpen = false;
  updateBackgroundInert();
  detail.classList.remove('active');
  // Libère les images décodées et arrête les vidéos une fois la page masquée
  hideAfterTransition(detail, () => detailImages.replaceChildren());

  if (lastFocusedElement) lastFocusedElement.focus();
}

detailClose.addEventListener('click', closeDetail);

/* ==========================================================================
   Lightbox
   ========================================================================== */
let lastFocusedBeforeLightbox = null;
let lightboxOpen = false;
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxProjectTitle = '';

function renderLightboxImage() {
  const src = lightboxImages[lightboxIndex];
  let media;
  if (isVideo(src)) {
    media = createVideo(src, '', true);
    media.style.maxWidth = '92vw';
    media.style.maxHeight = '92vh';
  } else {
    media = document.createElement('img');
    media.src = src;
    media.alt = `Visuel détaillé ${lightboxIndex + 1} — ${lightboxProjectTitle}`;
    media.addEventListener('click', () => showLightboxImage(1));
  }
  lightboxContent.replaceChildren(media);
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
  updateBackgroundInert();
  lastFocusedBeforeLightbox = document.activeElement;
  lightbox.hidden = false;
  lightbox.classList.add('active');
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightboxOpen) return;
  lightboxOpen = false;
  updateBackgroundInert();
  lightbox.classList.remove('active');

  hideAfterTransition(lightbox, () => {
    lightboxContent.replaceChildren();
    lightboxImages = [];
  });

  if (lastFocusedBeforeLightbox) lastFocusedBeforeLightbox.focus();
}

lightboxClose.addEventListener('click', closeLightbox);

/* ==========================================================================
   À propos
   ========================================================================== */
let lastFocusedBeforeAbout = null;
let aboutOpen = false;

function openAbout() {
  aboutMeta.textContent = `${aboutData.age} — ${aboutData.city}`;
  aboutText.textContent = preventOrphans(aboutData.text);

  const fragment = document.createDocumentFragment();
  aboutData.parcours.forEach((entry) => {
    const li = document.createElement('li');
    const place = document.createElement('span');
    place.className = 'about-place';
    place.textContent = entry.place;
    const role = document.createElement('span');
    role.className = 'about-role';
    role.textContent = entry.role;
    li.append(place, role);
    fragment.appendChild(li);
  });
  aboutList.replaceChildren(fragment);
  aboutAvailability.textContent = preventOrphans(aboutData.availability);

  lastFocusedBeforeAbout = document.activeElement;
  aboutOpen = true;
  updateBackgroundInert();
  about.hidden = false;
  about.classList.add('active');
  about.scrollTop = 0;
  aboutClose.focus();
}

function closeAbout() {
  if (!aboutOpen) return;
  aboutOpen = false;
  updateBackgroundInert();
  about.classList.remove('active');
  hideAfterTransition(about);
  if (lastFocusedBeforeAbout) lastFocusedBeforeAbout.focus();
}

aboutTrigger.addEventListener('click', openAbout);
aboutClose.addEventListener('click', closeAbout);

/* ==========================================================================
   Neutralisation du contenu masqué derrière une modale
   `inert` ne change aucun style : il retire juste l'élément de l'arbre
   d'accessibilité et du focus clavier tant que la modale est ouverte.
   ========================================================================== */
function updateBackgroundInert() {
  const modalOpen = detailOpen || lightboxOpen || aboutOpen;
  [headerEl, footerEl, paginationEl, scrollContainer].forEach((el) => {
    if (el) el.inert = modalOpen;
  });
  // Quand la lightbox s'ouvre par-dessus la page détail, celle-ci doit
  // elle aussi être neutralisée le temps que la lightbox est active.
  detail.inert = lightboxOpen;
}

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

/* ==========================================================================
   Clavier
   ========================================================================== */
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightboxOpen) closeLightbox();
    else if (detailOpen) closeDetail();
    else if (aboutOpen) closeAbout();
  } else if (event.key === 'Tab') {
    if (lightboxOpen) trapFocus(lightbox, event);
    else if (detailOpen) trapFocus(detail, event);
    else if (aboutOpen) trapFocus(about, event);
  } else if (lightboxOpen && lightboxImages.length > 1) {
    if (event.key === 'ArrowRight') showLightboxImage(1);
    else if (event.key === 'ArrowLeft') showLightboxImage(-1);
  }
});

/* ==========================================================================
   Curseur personnalisé — souris uniquement (créé seulement si pointeur précis)
   Aucun effet, listener ni élément DOM sur mobile / tactile.
   ========================================================================== */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursorDot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorDot);

  let x = 0;
  let y = 0;
  let frame = 0;

  const paint = () => {
    cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursorDot.classList.add('is-visible');
    frame = 0;
  };
  const hide = () => cursorDot.classList.remove('is-visible');

  document.addEventListener(
    'mousemove',
    (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    },
    { passive: true }
  );

  document.documentElement.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);

  document.addEventListener(
    'mouseover',
    (event) => {
      cursorDot.classList.toggle('is-hovering', !!event.target.closest('a, button, [role="button"]'));
    },
    { passive: true }
  );
}
