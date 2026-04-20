/* ================================================================
   SEA BREEZE BEACH HOUSE — App JS
   ================================================================ */

/* ----------------------------------------------------------------
   ANALYTICS — GA4 event helper
   Safe to call even before the GA4 measurement ID is live. Pushes
   into both dataLayer (GTM / GA4) and gtag if present. Noop if
   neither is available, so this never throws in development.
---------------------------------------------------------------- */
window.dataLayer = window.dataLayer || [];

function trackEvent(name, params) {
  try {
    const payload = Object.assign({ event: name }, params || {});
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  } catch (_) { /* silent — analytics must never break UX */ }
}

/* ----------------------------------------------------------------
   HEADER: transparent → solid on scroll
---------------------------------------------------------------- */
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
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

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ----------------------------------------------------------------
   FADE-IN ON SCROLL (IntersectionObserver)
   Respects prefers-reduced-motion — if the user prefers no motion,
   we mark elements visible immediately without stagger.
---------------------------------------------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  fadeEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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
}

/* ----------------------------------------------------------------
   BOOKING WIDGET: set min dates
---------------------------------------------------------------- */
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach((input, i) => {
  input.min = today;
  if (i % 2 === 0) {
    input.value = today;
  } else {
    const checkout = new Date();
    checkout.setDate(checkout.getDate() + 7);
    input.value = checkout.toISOString().split('T')[0];
  }
});

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

    trackEvent('check_availability_click', {
      checkin:  ci || null,
      checkout: co || null,
      guests:   guests?.value || null,
      location: btn.closest('section')?.id || 'booking'
    });

    if (!ci || !co) {
      alert('Please select your check-in and check-out dates.');
      return;
    }

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
   GA4 EVENT WIRING — book, phone, email, social, map
---------------------------------------------------------------- */

// book_now_click — every Book Now CTA (header, mobile sticky, room cards, final CTA anchors)
document.querySelectorAll('.btn-book, .btn-book-mobile, a.btn-primary').forEach(el => {
  el.addEventListener('click', () => {
    trackEvent('book_now_click', {
      location: el.closest('section')?.id || el.closest('header')?.id || 'header',
      label:    (el.textContent || '').trim().slice(0, 40)
    });
  });
});

// phone_click — every tel: link
document.querySelectorAll('a[href^="tel:"]').forEach(el => {
  el.addEventListener('click', () => {
    trackEvent('phone_click', {
      phone:    el.getAttribute('href').replace('tel:', ''),
      location: el.closest('section')?.id || el.closest('footer')?.id || 'page'
    });
  });
});

// email_click — every mailto: link
document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
  el.addEventListener('click', () => {
    trackEvent('email_click', {
      email:    el.getAttribute('href').replace('mailto:', ''),
      location: el.closest('section')?.id || el.closest('footer')?.id || 'page'
    });
  });
});

// map_directions_click — any Google Maps link
document.querySelectorAll('a[href*="maps.google"], a[href*="google.com/maps"], a[href*="goo.gl/maps"]').forEach(el => {
  el.addEventListener('click', () => {
    trackEvent('map_directions_click', {
      href:     el.getAttribute('href'),
      location: el.closest('section')?.id || el.closest('footer')?.id || 'page'
    });
  });
});

// social_click — header + footer social icons (links to FB, IG, YT, TikTok, X, Yelp)
const socialHosts = ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com', 'yelp.com'];
document.querySelectorAll('.header-socials a, .footer-socials a').forEach(el => {
  el.addEventListener('click', () => {
    const href = el.getAttribute('href') || '';
    const network = socialHosts.find(h => href.includes(h)) || 'other';
    trackEvent('social_click', {
      network,
      href,
      location: el.closest('header') ? 'header' : 'footer'
    });
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
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
});
