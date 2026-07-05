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

    // Reset when returning to desktop width (matches the 900px header/nav
    // collapse breakpoint in website.css).
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        header.classList.remove('nav-open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Click-to-stick dropdowns (desktop). Supplements the existing CSS
    // :hover/:focus-within so a click on the caret keeps the dropdown open
    // for precise sub-item selection, without a mouse-hover regression.
    // Clicking the rest of the parent link still navigates normally.
    var dropdowns = header.querySelectorAll('.nav-has-dropdown');
    dropdowns.forEach(function (dd) {
      var caret = dd.querySelector('.nav-caret');
      if (!caret) return;
      caret.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = dd.classList.contains('open');
        dropdowns.forEach(function (other) { other.classList.remove('open'); });
        if (!isOpen) dd.classList.add('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-has-dropdown')) {
        dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
