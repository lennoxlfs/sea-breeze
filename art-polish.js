/* ================================================================
   SEA BREEZE — Art-tier polish layer (additive JS)
   Loads AFTER app.js. Non-destructive. Adds:
     1. An ambient drifting-particle canvas behind the site
     2. A clip-path "unveil" observer for any [.sb-unveil] element
     3. Gallery stagger indexing (--i) for the existing .g-item grid
     4. Gentle signature parallax on elements tagged [data-art-parallax]
   All of it respects prefers-reduced-motion.
   ================================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1) Ambient drifting-particle canvas
     Paper-ink specks drifting very slowly — multiply blend mode
     from the CSS gives it that warm editorial feel without
     interfering with content. Tied to devicePixelRatio for
     crispness on retina screens. Auto-pauses when tab is hidden.
  --------------------------------------------------------------- */
  function initAmbient() {
    if (prefersReduced) return;
    var canvas = document.getElementById('sb-ambient');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;
    var particles = [];
    var running = true;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density: roughly one particle per ~18,000 px² — tuned
      // on a 1440x900 screen to feel present but never busy.
      var target = Math.round((w * h) / 18000);
      if (target < 28) target = 28;
      if (target > 110) target = 110;

      particles = [];
      for (var i = 0; i < target; i++) {
        particles.push(makeParticle(true));
      }
    }

    function makeParticle(initial) {
      // Tones: paper, ink, teal — subtle variance
      var tones = [
        'rgba(0, 57, 77, 0.35)',   // ink
        'rgba(78, 205, 196, 0.22)', // teal
        'rgba(120, 95, 65, 0.18)'   // warm sepia
      ];
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 8,
        r: 0.5 + Math.random() * 1.6,
        vx: -0.12 + Math.random() * 0.24,
        vy: -0.18 - Math.random() * 0.22,
        a: 0.25 + Math.random() * 0.6,
        tone: tones[Math.floor(Math.random() * tones.length)]
      };
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        // Recycle when off-screen
        if (p.y < -6 || p.x < -6 || p.x > w + 6) {
          particles[i] = makeParticle(false);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = p.tone;
        ctx.globalAlpha = p.a;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
      } else if (!running) {
        running = true;
        requestAnimationFrame(step);
      }
    }

    resize();
    requestAnimationFrame(step);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
  }

  /* ---------------------------------------------------------------
     2) Clip-path unveil observer for .sb-unveil elements
     Works alongside (not instead of) the existing .reveal system.
  --------------------------------------------------------------- */
  function initUnveil() {
    var targets = document.querySelectorAll('.sb-unveil');
    if (!targets.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     3) Gallery stagger index
     Assigns --i to each .g-item so the CSS transition-delay can
     resolve to calc(var(--i) * 70ms). Harmless if already set.
  --------------------------------------------------------------- */
  function initGalleryStagger() {
    var items = document.querySelectorAll('.gallery-grid .g-item');
    items.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--i')) {
        el.style.setProperty('--i', i);
      }
    });
  }

  /* ---------------------------------------------------------------
     4) Signature-accent parallax for [data-art-parallax]
     Very subtle (±6% yPercent). Uses GSAP + ScrollTrigger if
     available (already loaded by app.js). Silent no-op otherwise.
  --------------------------------------------------------------- */
  function initArtParallax() {
    if (prefersReduced) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    var nodes = document.querySelectorAll('[data-art-parallax]');
    if (!nodes.length) return;

    nodes.forEach(function (el) {
      var amount = parseFloat(el.getAttribute('data-art-parallax')) || 6;
      window.gsap.fromTo(el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }

  /* ---------------------------------------------------------------
     Boot
  --------------------------------------------------------------- */
  function boot() {
    initAmbient();
    initUnveil();
    initGalleryStagger();
    initArtParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
