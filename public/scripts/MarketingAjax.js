const MarketingAjax = (() => {
  function impl_postPretraga(div) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {};

    ajax.open('POST', '/', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send();
  }

  function impl_postKlikovi(div) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {};

    ajax.open('POST', '/', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send();
  }

  function impl_postFiltriranje(lista) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {};

    ajax.open('POST', '/marketing/nekretnine', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send();
  }

  function impl_postNekretnina(id) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {};

    ajax.open('POST', '/marketing/nekretnina/:id', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send();
  }

  return {
    osvjeziPretrage: impl_postPretraga,
    osvjeziKlikove: impl_postKlikovi,
    novoFiltriranje: impl_postFiltriranje,
    klikNekretnina: impl_postNekretnina,
  };
})();
