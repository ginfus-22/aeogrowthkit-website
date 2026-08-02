/* ============================================================================
   AEO Growth Kit — cookie consent banner
   ----------------------------------------------------------------------------
   NOT WIRED IN YET, AND DELIBERATELY SO.

   The marketing site currently sets zero cookies and runs no analytics, so
   there is nothing to consent to and no banner should appear. Showing one
   anyway is friction for nothing, and it trains people to dismiss consent UI.

   WHEN YOU ADD ANALYTICS, do three things:

     1. Add a category to CATEGORIES below, with an onAccept callback that
        loads the tag. Do NOT load the tag anywhere else on the page.
     2. Add these two lines to the <head> of every page:
            <link rel="stylesheet" href="cookie-consent.css">
            <script src="cookie-consent.js" defer></script>
     3. Update section 4 of cookies-policy.html with the real cookie names,
        providers and durations.

   The banner stays dormant until step 1 — with no categories configured it
   renders nothing. That is intentional: the file being present costs nothing
   and the wiring is then a two-line change.

   Design notes, which are also the legal requirements under GDPR + French
   ePrivacy rules (CNIL deliberation 2020-091):
     - Nothing non-essential loads before an explicit opt-in.
     - "Reject all" is exactly as prominent and as easy as "Accept all".
     - No pre-ticked boxes; refusal is the default state.
     - Consent is re-asked after 6 months, and can be withdrawn at any time
       via cookieConsent.reopen().
   ========================================================================== */

(function (window, document) {
  'use strict';

  // --- Configure your non-essential categories here ------------------------
  // Strictly necessary cookies are never listed: they need no consent.
  var CATEGORIES = [
    // Example — uncomment and adapt when analytics lands:
    // {
    //   id: 'analytics',
    //   label: 'Analytics',
    //   description: 'Helps us see which pages are useful. Never used for advertising.',
    //   onAccept: function () {
    //     var s = document.createElement('script');
    //     s.src = 'https://example-analytics.com/script.js';
    //     s.defer = true;
    //     document.head.appendChild(s);
    //   }
    // }
  ];

  var STORAGE_KEY = 'aeo_cookie_consent';
  var CONSENT_LIFETIME_DAYS = 180;

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      var ageDays = (Date.now() - saved.at) / 86400000;
      if (ageDays > CONSENT_LIFETIME_DAYS) return null; // expired: ask again
      return saved;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(granted) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        at: Date.now(),
        granted: granted
      }));
    } catch (e) { /* storage blocked — treat as refusal, nothing loads */ }
  }

  function applyConsent(granted) {
    CATEGORIES.forEach(function (cat) {
      if (granted.indexOf(cat.id) !== -1 && typeof cat.onAccept === 'function') {
        cat.onAccept();
      }
    });
  }

  function buildBanner() {
    var wrap = document.createElement('div');
    wrap.className = 'cc-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Cookie choices');

    var text = document.createElement('div');
    text.className = 'cc-text';
    text.innerHTML =
      '<p class="cc-title">A quick question about cookies</p>' +
      '<p class="cc-body">We’d like to set optional cookies to understand which pages are ' +
      'useful. We won’t set them unless you say yes, and we never use them for advertising. ' +
      'See our <a href="cookies-policy.html">Cookie Policy</a>.</p>';

    var actions = document.createElement('div');
    actions.className = 'cc-actions';

    // Reject is rendered first and styled identically — refusal must be as
    // easy as acceptance, which is the part most banners get wrong.
    var reject = document.createElement('button');
    reject.type = 'button';
    reject.className = 'cc-btn';
    reject.textContent = 'Reject optional';

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'cc-btn';
    accept.textContent = 'Accept optional';

    reject.addEventListener('click', function () {
      writeConsent([]);
      close(wrap);
    });
    accept.addEventListener('click', function () {
      var all = CATEGORIES.map(function (c) { return c.id; });
      writeConsent(all);
      applyConsent(all);
      close(wrap);
    });

    actions.appendChild(reject);
    actions.appendChild(accept);
    wrap.appendChild(text);
    wrap.appendChild(actions);
    return wrap;
  }

  function close(el) {
    el.parentNode && el.parentNode.removeChild(el);
  }

  function show() {
    var banner = buildBanner();
    document.body.appendChild(banner);
    banner.querySelector('.cc-btn').focus();
  }

  function init() {
    if (!CATEGORIES.length) return; // nothing non-essential: no banner, by design
    var saved = readConsent();
    if (saved) {
      applyConsent(saved.granted || []);
      return;
    }
    show();
  }

  // Lets you offer a "Cookie settings" link once a banner is actually in use.
  window.cookieConsent = {
    reopen: function () {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      if (CATEGORIES.length) show();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
