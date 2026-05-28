/* ============================
   LANGUAGE TOGGLE
============================ */
const html = document.documentElement;

function setLang(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);

  const elEs = document.getElementById('langEs');
  const elEn = document.getElementById('langEn');
  const mEs  = document.getElementById('mBtnEs');
  const mEn  = document.getElementById('mBtnEn');

  if (lang === 'es') {
    elEs.className = 'active'; elEn.className = '';
    mEs.classList.add('active'); mEn.classList.remove('active');
  } else {
    elEn.className = 'active'; elEs.className = '';
    mEn.classList.add('active'); mEs.classList.remove('active');
  }

  localStorage.setItem('lx-lang', lang);
}

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(html.getAttribute('data-lang') === 'es' ? 'en' : 'es');
});

// Expose for mobile lang buttons (called via onclick in HTML)
window.setLang = setLang;

// Restore saved preference
const savedLang = localStorage.getItem('lx-lang');
if (savedLang && savedLang !== 'es') setLang(savedLang);

/* ============================
   NAVBAR SCROLL
============================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================
   MOBILE MENU
============================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');

function openMenu()  { mobileMenu.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMenu));

/* ============================
   SCROLL ANIMATIONS
============================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ============================
   SMOOTH SCROLL FOR ANCHOR LINKS
============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});
