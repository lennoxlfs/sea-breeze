/* =============================================================
   ART-MOTION V3 — Sea Breeze Beach House
   Round-2 editorial motion layer: celebration chapter reveals,
   glass metrics count-up, FAQ chapter pulse, gentle section
   blend-through parallax, in-view eyebrow expansion.
   Respects prefers-reduced-motion. Loads after art-polish.js.
   ============================================================= */

(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // -----------------------------------------------------------
  // 1. In-view class on reveal elements (for eyebrow expansion)
  // -----------------------------------------------------------
  if ('IntersectionObserver' in window) {
    var inViewEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    var inViewObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -10% 0px' });
    inViewEls.forEach(function (el) { inViewObs.observe(el); });
  }

  // -----------------------------------------------------------
  // 2. Liquid-glass metrics — animate numbers only once visible
  //    (app.js already handles data-count; we just ensure the
  //    glass card's metrics trigger when it enters view)
  // -----------------------------------------------------------
  function animateCountUp(el) {
    if (el.dataset.sbCounted === '1') return;
    var target = parseInt(el.getAttribute('data-count') || '0', 10);
    if (!target) { el.dataset.sbCounted = '1'; return; }
    var dur = 1400;
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else {
        el.textContent = target;
        el.dataset.sbCounted = '1';
      }
    }
    requestAnimationFrame(tick);
  }

  var glassNums = document.querySelectorAll('.glass-num[data-count]');
  if ('IntersectionObserver' in window && glassNums.length) {
    var numObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCountUp(e.target);
          numObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    glassNums.forEach(function (n) { numObs.observe(n); });
  } else {
    glassNums.forEach(function (n) { n.textContent = n.getAttribute('data-count') || '0'; });
  }

  // -----------------------------------------------------------
  // 3. Celebration chapter stagger — media & narrative enter
  //    together with a soft directional offset
  // -----------------------------------------------------------
  var chapters = document.querySelectorAll('.celebration-chapter');
  if ('IntersectionObserver' in window && chapters.length) {
    var chObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('sb-chapter-in');
          chObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.22 });
    chapters.forEach(function (c) { chObs.observe(c); });
  }

  // -----------------------------------------------------------
  // 4. Beach-hero: very gentle mouse-follow parallax on the
  //    background image (desktop only, low amplitude)
  // -----------------------------------------------------------
  var beach = document.querySelector('.beach-hero-img');
  var isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (beach && isFinePointer) {
    var ticking = false;
    var mx = 0, my = 0;
    document.querySelector('.beach-hero').addEventListener('mousemove', function (e) {
      var rect = this.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;   // -1..1
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          beach.style.transform = 'scale(1.06) translate3d(' + (mx * -8) + 'px,' + (my * -6) + 'px, 0)';
          ticking = false;
        });
      }
    });
  }

  // -----------------------------------------------------------
  // 5. FAQ chapter — subtle "ink" pulse when opened, for rhythm
  // -----------------------------------------------------------
  var faqSums = document.querySelectorAll('.faq-chapter summary');
  faqSums.forEach(function (s) {
    s.addEventListener('click', function () {
      var toggle = s.querySelector('.faq-toggle');
      if (!toggle) return;
      toggle.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.18)' },
          { transform: 'scale(1)' }
        ],
        { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    });
  });

  // -----------------------------------------------------------
  // 6. Section blend-through — tie paper texture opacity to
  //    scroll depth, so sections gently "breathe" into each other
  // -----------------------------------------------------------
  var texSections = document.querySelectorAll('.welcome, .experience, .dining, .awards, .weddings, .why-us, .reviews, .faq, .final-cta');
  var rafBlend = false;
  function onScrollBlend() {
    if (rafBlend) return;
    rafBlend = true;
    requestAnimationFrame(function () {
      var vh = window.innerHeight || 800;
      texSections.forEach(function (sec) {
        var r = sec.getBoundingClientRect();
        // Progress through viewport: 0 when section enters from bottom, 1 when it leaves top
        var p = 1 - Math.max(0, Math.min(1, (r.bottom) / (vh + r.height)));
        // modulate the ::before opacity via a custom property for the section
        sec.style.setProperty('--sb-tex-amp', (0.8 + (0.2 * Math.sin(p * Math.PI))).toFixed(3));
      });
      rafBlend = false;
    });
  }
  window.addEventListener('scroll', onScrollBlend, { passive: true });
  onScrollBlend();

  // -----------------------------------------------------------
  // 7. Smooth-scroll polish for hero CTA + celebration CTAs
  //    (respects browser default if reduced motion; already off)
  // -----------------------------------------------------------
  var anchorCtas = document.querySelectorAll('.btn-hero-book, .btn-beach-explore, .celebration-cta');
  anchorCtas.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Let Lenis handle it if available; otherwise native smooth
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

})();
