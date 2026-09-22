// =========================================================
// Senan Shop — interactions du site
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Menu mobile ----- */
  const boutonMenu = document.getElementById('bouton-menu');
  const navLiens = document.getElementById('nav-liens');

  if (boutonMenu && navLiens) {
    boutonMenu.addEventListener('click', () => {
      const estOuvert = navLiens.classList.toggle('ouvert');
      boutonMenu.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
    });

    // Ferme le menu après avoir cliqué un lien (mobile)
    navLiens.querySelectorAll('a').forEach(lien => {
      lien.addEventListener('click', () => {
        navLiens.classList.remove('ouvert');
        boutonMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Filtres du catalogue ----- */
  const filtres = document.querySelectorAll('.filtre');
  const cartes = document.querySelectorAll('.carte-produit');

  filtres.forEach(bouton => {
    bouton.addEventListener('click', () => {
      filtres.forEach(b => b.classList.remove('actif'));
      bouton.classList.add('actif');

      const categorie = bouton.dataset.filtre;

      cartes.forEach(carte => {
        const correspond = categorie === 'tous' || carte.dataset.categorie === categorie;
        carte.hidden = !correspond;
      });
    });
  });

  /* ----- Lightbox (aperçu image) ----- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitre = document.getElementById('lightbox-titre');
  const lightboxFermer = document.getElementById('lightbox-fermer');

  function ouvrirLightbox(src, titre) {
    lightboxImg.src = src;
    lightboxImg.alt = titre;
    lightboxTitre.textContent = titre;
    lightbox.classList.add('ouverte');
    document.body.style.overflow = 'hidden';
  }

  function fermerLightbox() {
    lightbox.classList.remove('ouverte');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.voir-produit').forEach(lien => {
    lien.addEventListener('click', (e) => {
      e.preventDefault();
      const src = lien.dataset.img;
      const titre = lien.dataset.titre || '';
      ouvrirLightbox(src, titre);
    });
  });

  if (lightboxFermer) lightboxFermer.addEventListener('click', fermerLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) fermerLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerLightbox();
  });

});
