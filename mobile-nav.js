/* AEO Growth Kit — shared mobile navigation toggle.
   Works with the standard header markup on every page; no per-page wiring needed. */
(function () {
  function init() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var navLinks = header.querySelector('.nav-links');
    var btn = header.querySelector('.mobile-menu-btn');

    // Duplicate the header CTA buttons (Log in / Book a call) as items at the
    // bottom of the mobile panel, so they remain reachable on small screens.
    if (navLinks && !navLinks.querySelector('.nav-cta-mobile')) {
      var ctas = header.querySelectorAll('.btn-header-login, .btn-header-cta');
      ctas.forEach(function (el) {
        var li = document.createElement('li');
        li.className = 'nav-cta-mobile';
        var a = document.createElement('a');
        a.href = el.getAttribute('href') || '#';
        a.textContent = (el.textContent || '').trim();
        li.appendChild(a);
        navLinks.appendChild(li);
      });
    }

    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Toggle menu');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var open = header.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Close the panel after a navigation tap.
    header.addEventListener('click', function (e) {
      if (e.target.closest('.nav-links a')) {
        header.classList.remove('nav-open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Reset when returning to desktop width.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        header.classList.remove('nav-open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
