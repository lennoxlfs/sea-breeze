/* ================================================================
   SEA BREEZE BEACH HOUSE — App JS
   ================================================================ */

/* ----------------------------------------------------------------
   HEADER: transparent → solid on scroll
---------------------------------------------------------------- */
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  // Collapse top-bar and tighten header after 50px scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ----------------------------------------------------------------
   MOBILE NAV TOGGLE
---------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ----------------------------------------------------------------
   FADE-IN ON SCROLL (IntersectionObserver)
---------------------------------------------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

/* ----------------------------------------------------------------
   BOOKING WIDGET: set min dates
---------------------------------------------------------------- */
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach((input, i) => {
  input.min = today;
  if (i % 2 === 0) {
    // check-in: default to today
    input.value = today;
  } else {
    // check-out: default to 7 days from today
    const checkout = new Date();
    checkout.setDate(checkout.getDate() + 7);
    input.value = checkout.toISOString().split('T')[0];
  }
});

// Keep check-out >= check-in
document.querySelectorAll('input[id="checkin"]').forEach(checkin => {
  checkin.addEventListener('change', () => {
    const siblingCheckout = checkin.closest('.booking-fields').querySelector('input[type="date"]:last-of-type');
    if (siblingCheckout && siblingCheckout.value < checkin.value) {
      siblingCheckout.value = checkin.value;
    }
    if (siblingCheckout) siblingCheckout.min = checkin.value;
  });
});

/* ----------------------------------------------------------------
   CHECK AVAILABILITY button
---------------------------------------------------------------- */
document.querySelectorAll('.btn-check-avail').forEach(btn => {
  btn.addEventListener('click', () => {
    const fields = btn.closest('.booking-fields');
    const dates  = fields.querySelectorAll('input[type="date"]');
    const guests = fields.querySelector('select');
    const ci = dates[0]?.value;
    const co = dates[1]?.value;

    if (!ci || !co) {
      alert('Please select your check-in and check-out dates.');
      return;
    }

    // Build booking URL — replace with actual booking engine URL
    const bookingBase = 'https://reservations.sea-breeze.com/';
    const params = new URLSearchParams({
      checkin:  ci,
      checkout: co,
      adults:   guests?.value?.replace(/\D/g,'') || '2'
    });

    window.open(`${bookingBase}?${params.toString()}`, '_blank');
  });
});

/* ----------------------------------------------------------------
   MOBILE STICKY CTA BAR — show after scrolling past the hero
---------------------------------------------------------------- */
const mobileCta = document.getElementById('mobileCta');
if (mobileCta) {
  const heroSection = document.getElementById('hero');
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });
  if (heroSection) ctaObserver.observe(heroSection);
}

/* ----------------------------------------------------------------
   SMOOTH SCROLL for anchor links
---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
