(function () {
  // Prices are fixed per currency (data-usd, data-eur, ...) to match Stripe exactly.
  var SYMBOLS = { usd: '$', gbp: '£', eur: '€', aud: 'A$' };

  function render(currency) {
    document.querySelectorAll('.price-amount, .price-amount-inline').forEach(function (el) {
      var value = el.getAttribute('data-' + currency);
      if (value !== null) el.textContent = SYMBOLS[currency] + value;
    });
  }

  document.querySelectorAll('.currency-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.currency-btn').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      render(btn.getAttribute('data-currency'));
    });
  });
})();
