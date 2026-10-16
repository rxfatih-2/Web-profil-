// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ========== TYPED TEXT ==========
const typedEl = document.getElementById('typed-text');
const roles = ['Frontend Developer', 'Creative Coder', 'Problem Solver', 'UI Enthusiast'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    speed = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

// ========== REVEAL ON SCROLL ==========
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => revealObs.observe(el));

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 25);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ========== SKILL BAR ANIMATION ==========
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      skillObs.unobserve(el);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(s => skillObs.observe(s));

// ========== BACKGROUND MUSIC ==========
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
  bgMusic.volume = 0.35;

  const tryPlay = () => {
    bgMusic.play()
      .then(() => console.log('🎵 Music playing'))
      .catch(err => console.log('🔇 Autoplay blocked:', err.name));
  };

  window.addEventListener('load', tryPlay);

  ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
    document.addEventListener(evt, function once() {
      if (bgMusic.paused) tryPlay();
      document.removeEventListener(evt, once);
    }, { once: true, passive: true });
  });
}

// ========== SMOOTH ANCHOR (fallback) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});
