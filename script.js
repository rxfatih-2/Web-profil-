// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
}

// ========== TYPED TEXT ==========
const typedEl = document.getElementById('typed-text');
if (typedEl) {
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
}

// ========== REVEAL ON SCROLL ==========
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => revealObs.observe(el));
}

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.stat-num');
if (counters.length) {
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
}

// ========== SKILL BAR ANIMATION ==========
const skillFills = document.querySelectorAll('.skill-fill');
if (skillFills.length) {
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
}

// ========== BACKGROUND MUSIC (AUTO UNLOCK TRICK) ==========
const bgMusic = document.getElementById('bgMusic');

if (bgMusic) {
  bgMusic.volume = 0.4;
  let musicStarted = false;
  let userInteracted = false;

  console.log('🎵 Audio element found:', bgMusic);
  console.log('🎵 Source:', bgMusic.querySelector('source')?.src);

  // Fungsi utama: mainkan musik dalam mode mute dulu
  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;

    bgMusic.muted = true;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ Musik jalan (mode mute) — coba unmute...');

          // Coba unmute setelah berhasil play
          setTimeout(() => {
            if (userInteracted) {
              // Kalau user sudah interaksi, langsung unmute
              bgMusic.muted = false;
              bgMusic.volume = 0.4;
              console.log('🔊 Musik unmute — SUARA NYALA!');
            } else {
              // Kalau belum, tetap mute sampai user interaksi
              console.log('⏸️ Menunggu interaksi user untuk unmute...');
            }
          }, 200);
        })
        .catch(err => {
          console.log('❌ Gagal play:', err.name, '-', err.message);
          musicStarted = false;
        });
    }
  }

  // Fungsi unmute setelah user interaksi
  function unlockAudio() {
    userInteracted = true;
    bgMusic.muted = false;
    bgMusic.volume = 0.4;

    if (bgMusic.paused) {
      bgMusic.play()
        .then(() => console.log('🔊 Musik aktif setelah interaksi user!'))
        .catch(err => console.log('❌ Masih gagal:', err.name));
    } else {
      console.log('🔊 Suara diaktifkan (musik sudah jalan)');
    }
  }

  // Coba autoplay saat halaman siap
  window.addEventListener('load', startMusic);
  document.addEventListener('DOMContentLoaded', startMusic);

  // Fallback: unmute saat user interaksi pertama
  ['click', 'touchstart', 'scroll', 'keydown', 'mousemove', 'touchmove'].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });

  // Debug: cek status musik setiap 3 detik
  setInterval(() => {
    console.log(
      '📊 Music status →',
      'paused:', bgMusic.paused,
      '| muted:', bgMusic.muted,
      '| time:', bgMusic.currentTime.toFixed(1),
      '| ready:', bgMusic.readyState
    );
  }, 3000);
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
