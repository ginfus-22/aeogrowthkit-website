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

    // Click-to-open dropdowns (desktop). Hover menus vanished as the pointer
    // moved towards a sub-item, so a click on the parent now opens the menu
    // and it stays open until an outside click or Escape. On mobile the
    // parent link navigates as normal (sub-items are already shown inline).
    var isDesktop = function () { return window.innerWidth > 900; };
    var dropdowns = header.querySelectorAll('.nav-has-dropdown');
    var closeAll = function () {
      dropdowns.forEach(function (dd) {
        dd.classList.remove('open');
        var p = dd.querySelector('a');
        if (p) p.setAttribute('aria-expanded', 'false');
      });
    };
    dropdowns.forEach(function (dd) {
      var parent = dd.querySelector('a');
      var menu = dd.querySelector('.nav-dropdown');
      if (!parent || !menu) return;
      parent.setAttribute('aria-haspopup', 'true');
      parent.setAttribute('aria-expanded', 'false');

      // The parent no longer navigates on desktop, so make sure its page is
      // still one click away inside the menu.
      var href = parent.getAttribute('href');
      if (href && !menu.querySelector('a[href="' + href + '"]')) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = href;
        a.textContent = 'Overview';
        li.appendChild(a);
        menu.insertBefore(li, menu.firstChild);
      }

      parent.addEventListener('click', function (e) {
        if (!isDesktop()) return;
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = dd.classList.contains('open');
        closeAll();
        if (!wasOpen) {
          dd.classList.add('open');
          parent.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-has-dropdown')) closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
