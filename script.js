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
    title: 'agenda',
    text: "Conception d'un agenda pensé comme un objet de travail quotidien. La grille typographique organise semaines, notes et repères visuels avec une économie de moyens : peu de couleurs, une hiérarchie claire, un papier choisi pour sa tenue à l'usage.",
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
    text: "Affiche réalisée dans le cadre d'un workshop typographique. Le travail explore la lettre comme image autant que comme texte, à travers des essais de composition et de contraste.",
    images: ['images/IMG_2607.jpg'],
  },
  {
    tag: 'affiche / flyer',
    year: 'design – 2026',
    title: 'affiche nifff',
    text: "Identité visuelle pour le Nifff, déclinée en affiche et flyer. La direction artistique s'appuie sur une image forte et une typographie sans fioritures pour porter l'événement sur tous les formats.",
    images: ['images/nifff.jpg'],
  },
  {
    tag: 'collaboration bico',
    year: '2026',
    title: 'collaboration bico',
    text: "Projet mené en collaboration avec la marque suisse Bico Lausanne : création de deux pulls. Le design et la typographie ont été réalisés en broderie et en impression à chaud, mêlant une technique textile artisanale à un rendu graphique plus brut.",
    images: ['images/IMG_5246.jpeg'],
  },
];

/* ==========================================================================
   2. Pagination
   ========================================================================== */
const scrollContainer = document.getElementById('scrollContainer');
const paginationEl = document.getElementById('pagination');
const sections = Array.from(document.querySelectorAll('.project-section'));

// Génère un point de pagination par projet.
const dots = sections.map((section, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Aller au projet : ${projects[index].title}`);
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

function openDetail(index) {
  const project = projects[index];

  detailTag.textContent = project.tag;
  detailYear.textContent = project.year;
  detailTitle.textContent = project.title;
  detailText.textContent = project.text;

  detailImages.innerHTML = '';
  project.images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Visuel détaillé — ${project.title}`;
    img.loading = 'lazy';
    detailImages.appendChild(img);
  });

  lastFocusedElement = document.activeElement;

  detail.hidden = false;
  // Force le recalcul de style avant d'ajouter la classe, pour que la
  // transition CSS (opacity/transform) se joue correctement.
  requestAnimationFrame(() => {
    detail.classList.add('active');
  });

  detail.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  detailClose.focus();
}

function closeDetail() {
  detail.classList.remove('active');
  document.body.style.overflow = '';

  detail.addEventListener(
    'transitionend',
    () => {
      detail.hidden = true;
    },
    { once: true }
  );

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

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
  if (event.key === 'Escape' && detail.classList.contains('active')) {
    closeDetail();
  }
});
