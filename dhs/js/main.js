/* DHS website: small and dependency free.
   Effects: scroll reveals, scroll progress bar, hero tilt and depth,
   gold dust, cursor spotlight, mobile menu.
   No analytics and no tracking run here. Call buttons carry data-track attributes
   so analytics can be added later, once the owner agrees to it. */

(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* 1. Scroll reveals */
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 2. Nav shade and scroll progress bar */
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.progress');
  var ticking = false;
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 24);
    if (bar) {
      var max = root.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    }
    ticking = false;
  }
  onScroll();
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* 3. Mobile menu */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    if (nav && open) nav.classList.add('is-scrolled'); else onScroll();
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 860px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });
  }

  /* 4. Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (reduce) return;

  /* 5. Hero: the shield tilts and the devices shift with the pointer */
  var hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      hero.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--px', 0);
      hero.style.setProperty('--py', 0);
    });
  }

  /* 6. Gold dust drifting up through the hero */
  var canvas = document.getElementById('dust');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, parts = [], visible = true, raf = 0;
    var count = window.innerWidth < 700 ? 30 : 64;

    var make = function (anywhere) {
      return { x: Math.random() * w, y: anywhere ? Math.random() * h : h + 8,
        r: Math.random() * 1.7 + 0.5, v: Math.random() * 0.35 + 0.1,
        a: Math.random() * 6.28, s: Math.random() * 0.025 + 0.008 };
    };
    var resize = function () {
      var rect = canvas.parentNode.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = []; for (var i = 0; i < count; i++) parts.push(make(true));
    };
    var frame = function () {
      raf = 0;
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.v; p.x += Math.sin(p.a) * 0.18; p.a += p.s;
        if (p.y < -8) parts[i] = make(false);
        var alpha = 0.2 + 0.7 * Math.pow(Math.sin(p.a * 2), 2);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(244,224,160,' + alpha.toFixed(3) + ')';
        ctx.shadowColor = 'rgba(236,214,153,0.9)';
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener('resize', resize);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      }).observe(canvas.parentNode);
    }
    raf = requestAnimationFrame(frame);
  }

  /* 7. Cursor spotlight on plates and cards */
  document.querySelectorAll('.spot').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
