/**
 * Toplitsch Vladimir — Portfolio
 * ------------------------------------------------------------------
 * 1. Données des projets (à éditer pour changer le contenu)
 * 2. Pagination : génération des points + suivi de la section active
 * 3. Page de détail : ouverture / fermeture, gestion du focus
 * ------------------------------------------------------------------
 */

/* ==========================================================================
   1. Données des projets
   Chaque entrée alimente à la fois le point de pagination et la page
   de détail associée. "images" liste les visuels détaillés du projet.
   ========================================================================== */
const projects = [
  {
    tag: 'édition',
    year: 'projet graphique – 2026',
    title: "agend'archive",
    text: "Projet réalisé dans le cadre de mes études en graphisme, à partir d'une récolte d'archives de l'école. Le travail d'édition joue sur la transparence grâce à une feuille de calque insérée entre les pages, et une micro-typographie vient ponctuer discrètement la lecture des documents.",
    video: 'images/video agenda.mp4',
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
    year: 'workshop – 2026',
    title: 'affiche workshop',
    text: "Affiche réalisée dans le cadre d'un workshop mené par Guillaume Besson pendant mes études en graphisme, autour d'une recette de cuisine. La composition repose sur une superposition de couleurs, chaque couche venant enrichir l'image jusqu'à révéler l'affiche finale.",
    images: ['images/IMG_2607.jpg'],
  },
  {
    tag: 'affiche / flyer',
    year: 'design – 2026',
    title: 'affiche nifff',
    text: "Pour le Nifff, j'ai réalisé un visage par collage, à partir de fragments d'images tirées de films du festival. Cette figure hybride associe cinéma et papier découpé, structurée par une composition typographique pensée pour accompagner l'affiche.",
    images: ['images/nifff.jpg'],
  },
  {
    tag: 'collaboration bico',
    year: '2026',
    title: 'collaboration bico',
    text: "Créer ces deux pulls en collaboration avec la marque suisse Bico est l'un des projets qui m'a le plus donné envie d'aller au bout d'une idée. J'y ai exploré la broderie et l'impression à chaud, deux techniques exigeantes que j'aime pour le dialogue qu'elles créent entre précision textile et geste graphique plus brut.",
    images: ['images/IMG_5246.jpeg'],
  },
];

/* ==========================================================================
   2. Pagination
   ========================================================================== */
const scrollContainer = document.getElementById('scrollContainer');
const paginationEl = document.getElementById('pagination');
const sections = Array.from(document.querySelectorAll('.project-section'));
// Seules les sections avec data-project correspondent à une entrée de `projects`
// (la section d'intro n'en a pas).
const projectSections = sections.filter((section) => section.dataset.project !== undefined);

// Génère un point de pagination par projet.
const dots = sections.map((section, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  const project = projects[Number(section.dataset.project)];
  dot.setAttribute('aria-label', project ? `Aller au projet : ${project.title}` : 'Aller à l\'intro');
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
   3. Page de détail
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

function openDetail(index) {
  const project = projects[index];

  detailTag.textContent = project.tag;
  detailYear.textContent = project.year;
  detailTitle.textContent = project.title;
  detailText.textContent = project.text;

  detailImages.innerHTML = '';

  // Vidéo du projet, si elle existe : en boucle, silencieuse, pleine largeur.
  if (project.video) {
    const video = document.createElement('video');
    video.src = project.video;
    video.className = 'detail-video';
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.controls = true;
    video.addEventListener('click', () => openLightboxVideo(video));
    detailImages.appendChild(video);
  }

  project.images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Visuel détaillé — ${project.title}`;
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightboxImage(src, img.alt));
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
  document.body.style.overflow = 'hidden';
  detailClose.focus();
}

function closeDetail() {
  if (!detailOpen) return;
  detailOpen = false;
  detail.classList.remove('active');
  document.body.style.overflow = '';
  hideAfterTransition(detail);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* ==========================================================================
   4. Lightbox (aperçu plein écran d'une image ou de la vidéo)
   ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxContent = document.getElementById('lightboxContent');

let lastFocusedBeforeLightbox = null;
// Quand une vidéo est mise en plein écran, on déplace le vrai noeud <video>
// (plutôt que d'en cloner un) pour qu'elle continue de jouer sans coupure.
// On garde une référence à sa place d'origine pour l'y remettre à la fermeture.
let videoOriginalParent = null;
let videoOriginalNextSibling = null;

function showLightbox() {
  lightboxOpen = true;
  lastFocusedBeforeLightbox = document.activeElement;
  lightbox.hidden = false;
  void lightbox.offsetWidth; // force le recalcul avant la transition
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function openLightboxImage(src, alt) {
  lightboxContent.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  // Cliquer sur l'image agrandie referme le lightbox (comportement classique).
  img.addEventListener('click', closeLightbox);
  lightboxContent.appendChild(img);
  showLightbox();
}

function openLightboxVideo(video) {
  videoOriginalParent = video.parentNode;
  videoOriginalNextSibling = video.nextSibling;
  lightboxContent.innerHTML = '';
  lightboxContent.appendChild(video);
  showLightbox();
}

function closeLightbox() {
  if (!lightboxOpen) return;
  lightboxOpen = false;
  lightbox.classList.remove('active');
  // La page projet reste ouverte derrière : on garde le scroll verrouillé.
  document.body.style.overflow = detailOpen ? 'hidden' : '';

  hideAfterTransition(lightbox, () => {
    // Si une vidéo était affichée, on la remet à sa place d'origine
    // dans la page détail plutôt que de la détruire.
    const video = lightboxContent.querySelector('video');
    if (video && videoOriginalParent) {
      videoOriginalParent.insertBefore(video, videoOriginalNextSibling);
    }
    videoOriginalParent = null;
    videoOriginalNextSibling = null;
    lightboxContent.innerHTML = '';
  });

  if (lastFocusedBeforeLightbox) {
    lastFocusedBeforeLightbox.focus();
  }
}

// Cliquer sur le fond noir (en dehors de l'image/vidéo) referme le lightbox.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightboxClose.addEventListener('click', closeLightbox);

projectSections.forEach((section) => {
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
    // On teste `hidden` plutôt que la classe d'animation : c'est l'état réel
    // de l'overlay, donc la fermeture marche même si la transition n'a pas eu lieu.
    if (lightboxOpen) {
      closeLightbox();
    } else if (detailOpen) {
      closeDetail();
    }
  }
});
