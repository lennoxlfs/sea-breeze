/* ================================================================
   SEA BREEZE BEACH HOUSE — App JS  (art-tier v1)
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
   MOTION BOOT — Lenis smooth scroll + GSAP ticker sync
   Reduced-motion users get native scroll, no Lenis, no easing.
---------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
function bootMotion() {
  const hasLenis = typeof window.Lenis === 'function';
  const hasGSAP  = typeof window.gsap === 'object';

  if (prefersReducedMotion || !hasLenis) {
    // Fallback to native scroll. Phase-1 reveals still fire via IntersectionObserver below.
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  } else {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.2
    });

    if (hasGSAP) {
      lenis.on('scroll', () => window.ScrollTrigger && window.ScrollTrigger.update());
      window.gsap.ticker.add(time => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
      if (window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.documentElement.classList.add('lenis');
  }

  // Generic reveal observer — toggles .is-in on .reveal/.reveal-left/.reveal-right
  // elements. Used by any section; phases 2-7 add art-tier refinements on top.
  const revealables = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-slow');
  if (prefersReducedMotion) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  }

  // Hero headline word-split reveal — runs after fonts are ready to avoid FOUT jitter.
  const headline = document.querySelector('[data-split]');
  if (headline) {
    const run = () => {
      const text = headline.dataset.text || headline.textContent.trim();
      headline.innerHTML = text.split(/(\s+)/).map((chunk, i) => {
        if (/^\s+$/.test(chunk)) return chunk;
        return `<span class="split-word"><span style="--i:${i}">${chunk}</span></span>`;
      }).join('');
      requestAnimationFrame(() => headline.classList.add('split-ready'));
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }
  }

  // Hero → next-section scroll blend. As the user scrolls through the hero,
  // the video fades + subtly zooms while the bottom fade (CSS) deepens. Gives
  // the feel of the footage dissolving into the cream trust strip below.
  if (hasGSAP && window.ScrollTrigger && !prefersReducedMotion) {
    const heroEl  = document.getElementById('hero');
    const videoEl = heroEl && heroEl.querySelector('.hero-video');
    const fadeEl  = heroEl && heroEl.querySelector('.hero-fade');
    const contentEl = heroEl && heroEl.querySelector('.hero-content');
    if (heroEl && videoEl) {
      window.gsap.to(videoEl, {
        opacity: 0.25,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end:   'bottom top',
          scrub: 0.6
        }
      });
      if (contentEl) {
        window.gsap.to(contentEl, {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end:   '70% top',
            scrub: 0.6
          }
        });
      }
      if (fadeEl) {
        window.gsap.to(fadeEl, {
          opacity: 1.25, // overshoot — clamped by compositing to 1, but scrub feels firmer
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end:   'bottom top',
            scrub: 0.6
          }
        });
      }
    }

    // Parallax on section background images — subtle drift as the section
    // passes through the viewport. Opt-in via data-parallax. Targets an
    // inner .spa-img / img element if present, else the element itself.
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const target = el.querySelector('.spa-img, img') || el;
      window.gsap.fromTo(target,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 0.8
          }
        }
      );
    });
  }

  // Counter animation — numbers tick up from 0 to data-count value once the
  // parent stat is revealed. Reduced-motion users see the final value immediately.
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const runCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (!Number.isFinite(target)) return;
      if (prefersReducedMotion) { el.textContent = target; return; }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        // easeOutCubic — settles without overshoot
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runCounter(e.target);
            counterIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => counterIO.observe(el));
    } else {
      counters.forEach(runCounter);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootMotion);
} else {
  bootMotion();
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
   LEGACY FADE-IN ON SCROLL — preserved for sections not yet migrated
   to .reveal. Uses the shared prefersReducedMotion flag from the
   motion boot.
---------------------------------------------------------------- */
(function bootLegacyFade() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;
  if (prefersReducedMotion) {
    fadeEls.forEach(el => el.classList.add('visible'));
    return;
  }
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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));
})();

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
