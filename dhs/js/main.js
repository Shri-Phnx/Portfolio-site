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

/* Reviews slider: native scroll-snap (swipe works on touch), plus arrows, dots and a gentle auto-slide. */
(function () {
  'use strict';
  var root = document.querySelector('[data-carousel]');
  if (!root) return;
  var track = root.querySelector('.rvs');
  var cards = [].slice.call(track.children);
  var prev = root.querySelector('[data-prev]'), next = root.querySelector('[data-next]');
  var dotsBox = root.querySelector('.rvs-dots'), pauseBtn = root.querySelector('[data-pause]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paused = reduce, hover = false, focusIn = false, inView = true, timer = null, raf = 0, dots = [];

  function gap() { var cs = getComputedStyle(track); return parseFloat(cs.columnGap || cs.gap) || 0; }
  function step() { return cards[0].getBoundingClientRect().width + gap(); }
  function perView() { return Math.max(1, Math.round((track.clientWidth + gap()) / step())); }
  function maxIndex() { return Math.max(0, cards.length - perView()); }
  function index() { return Math.round(track.scrollLeft / step()); }
  function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
  function go(i) {
    i = Math.max(0, Math.min(i, maxIndex()));
    track.scrollTo({ left: i * step(), behavior: reduce ? 'auto' : 'smooth' });
  }
  function pages() { return Math.ceil(cards.length / perView()); }
  function buildDots() {
    dotsBox.innerHTML = ''; dots = [];
    for (var p = 0; p < pages(); p++) {
      (function (p) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'rvs-dot';
        b.setAttribute('aria-label', 'Show reviews group ' + (p + 1) + ' of ' + pages());
        b.addEventListener('click', function () { go(p * perView()); });
        dotsBox.appendChild(b); dots.push(b);
      })(p);
    }
    mark();
  }
  function mark() {
    raf = 0;
    var active = atEnd() ? dots.length - 1 : Math.min(dots.length - 1, Math.round(index() / perView()));
    dots.forEach(function (d, i) { if (i === active) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  }
  function advance() { if (atEnd()) go(0); else go(index() + 1); }
  function sync() {
    var run = !paused && !hover && !focusIn && inView && !document.hidden;
    if (run && !timer) timer = setInterval(advance, 6000);
    if (!run && timer) { clearInterval(timer); timer = null; }
  }
  function setPaused(v) {
    paused = v;
    pauseBtn.textContent = v ? 'Play' : 'Pause';
    pauseBtn.setAttribute('aria-label', v ? 'Start automatic sliding' : 'Pause automatic sliding');
    sync();
  }

  prev.addEventListener('click', function () { if (index() <= 0) go(maxIndex()); else go(index() - perView()); });
  next.addEventListener('click', function () { if (atEnd()) go(0); else go(index() + perView()); });
  pauseBtn.addEventListener('click', function () { setPaused(!paused); });
  track.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(mark); }, { passive: true });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });
  root.addEventListener('mouseenter', function () { hover = true; sync(); });
  root.addEventListener('mouseleave', function () { hover = false; sync(); });
  root.addEventListener('focusin', function () { focusIn = true; sync(); });
  root.addEventListener('focusout', function () { focusIn = false; sync(); });
  root.addEventListener('touchstart', function () { hover = true; sync(); }, { passive: true });
  root.addEventListener('touchend', function () { setTimeout(function () { hover = false; sync(); }, 8000); }, { passive: true });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', buildDots);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; sync(); }, { threshold: 0.25 }).observe(root);
  }
  setPaused(reduce);
  buildDots();
})();
