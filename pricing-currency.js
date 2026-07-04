(function () {
  var RATES = { usd: 1, gbp: 0.78, eur: 0.92, aud: 1.52 }; // static approximate rates, cosmetic display only
  var SYMBOLS = { usd: '$', gbp: '£', eur: '€', aud: 'A$' };

  function render(currency) {
    var nodes = document.querySelectorAll('.price-amount, .price-amount-inline');
    nodes.forEach(function (el) {
      var usdValue = parseFloat(el.getAttribute('data-usd'));
      var converted = Math.round(usdValue * RATES[currency]);
      el.textContent = SYMBOLS[currency] + converted;
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
