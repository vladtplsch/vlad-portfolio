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
    images: [
      'images/IMG_2607.webp',
      'images/workshop.webp',
      'images/workshop01.webp',
      'images/workshop02.webp',
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
      'images/thomas03.webp',
      'images/thomas04.webp',
    ],
  },
];

const introNav = document.getElementById('introNav');
const scrollContainer = document.getElementById('scrollContainer');

function extractCardYear(year) {
  const match = year.match(/\d{4}/);
  return match ? match[0] : year;
}

function resolveImageEntry(entry) {
  return typeof entry === 'string' ? { src: entry } : entry;
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

  if (project.cover.type === 'video') {
    const video = document.createElement('video');
    video.src = project.cover.src;
    video.className = 'project-bg';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    section.appendChild(video);
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
  content.innerHTML = `
    <span class="project-meta project-tag">${project.tag}</span>
    <h2 class="project-title">${project.title}</h2>
    <span class="project-meta project-year">${extractCardYear(project.year)}</span>
  `;
  section.appendChild(content);

  scrollContainer.appendChild(section);
});

/* ==========================================================================
   Pagination
   ========================================================================== */
const paginationEl = document.getElementById('pagination');
const sections = Array.from(document.querySelectorAll('.project-section'));

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
   Page de détail
   ========================================================================== */
const detail = document.getElementById('detail');
const detailClose = document.getElementById('detailClose');
const detailTag = document.getElementById('detailTag');
const detailYear = document.getElementById('detailYear');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailImages = document.getElementById('detailImages');

let lastFocusedElement = null;
let detailOpen = false;
let lightboxOpen = false;

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
    
    if (src.endsWith('.mp4') || src.endsWith('.webm')) {
      const video = document.createElement('video');
      video.src = src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = true;
      video.className = 'detail-video';
      detailImages.appendChild(video);
    } else {
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
    }
  });

  lastFocusedElement = document.activeElement;

  detailOpen = true;
  detail.hidden = false;
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
   Lightbox
   ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxContent = document.getElementById('lightboxContent');

let lastFocusedBeforeLightbox = null;
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxProjectTitle = '';

function renderLightboxImage() {
  const { src } = resolveImageEntry(lightboxImages[lightboxIndex]);
  lightboxContent.innerHTML = '';
  if (src.endsWith('.mp4') || src.endsWith('.webm')) {
    const video = document.createElement('video');
    video.src = src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.controls = true;
    video.style.maxWidth = '92vw';
    video.style.maxHeight = '92vh';
    lightboxContent.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Visuel détaillé ${lightboxIndex + 1} — ${lightboxProjectTitle}`;
    img.addEventListener('click', () => showLightboxImage(1));
    lightboxContent.appendChild(img);
  }
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
  void lightbox.offsetWidth;
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

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

sections.forEach((section) => {
  const index = Number(section.dataset.project);

  section.addEventListener('click', () => openDetail(index));

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
   Curseur personnalisé
   ========================================================================== */
const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const cursorDot = document.getElementById('cursorDot');

if (canUseCustomCursor && cursorDot) {
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

  document.documentElement.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('is-visible');
  });
  window.addEventListener('blur', () => {
    cursorDot.classList.remove('is-visible');
  });

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

/* ==========================================================================
   Cercle d'inversion tactile
   ========================================================================== */
const canUseTouchRipple = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (canUseTouchRipple) {
  document.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;

      const ripple = document.createElement('div');
      ripple.className = 'touch-ripple';
      ripple.style.left = `${touch.clientX}px`;
      ripple.style.top = `${touch.clientY}px`;
      document.body.appendChild(ripple);

      let removed = false;
      const remove = () => {
        if (removed) return;
        removed = true;
        ripple.remove();
      };
      ripple.addEventListener('animationend', remove);
      setTimeout(remove, 700);
    },
    { passive: true }
  );
}
