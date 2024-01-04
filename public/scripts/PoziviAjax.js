const PoziviAjax = (() => {
  function getError(status) {
    if (status === 200) {
      return null;
    } else {
      return 1;
    }
  }

  function impl_getKorisnik(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        fn(getError(ajax.status), ajax.responseText);
      }
    };
    ajax.open('GET', '/korisnik', true);
    ajax.send();
  }
  
  function impl_putKorisnik(noviPodaci, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    };

    ajax.open('PUT', '/korisnik', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send(
      JSON.stringify({
        noviPodaci,
      })
    );
  }

  function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    };

    ajax.open('POST', '/upit', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send(
      JSON.stringify({
        nekretnina_id,
        tekst_upita,
      })
    );
  }

  function impl_getNekretnine(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    };

    ajax.open('GET', '/nekretnine', true);
    ajax.send();
  }

  function impl_postLogin(username, password, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    };

    ajax.open('POST', '/login', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send(
      JSON.stringify({
        username,
        password,
      })
    );
  }

  function impl_postLogout(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    };

    ajax.open('POST', '/logout', true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.send();
  }

  function impl_isLoggedin(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4) {
        fnCallback(getError(ajax.status), ajax.responseText);
      }
    }
    ajax.open("GET", "/isloggedin", true);
    ajax.send();
  }

  return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getLoggedIn: impl_isLoggedin,
  };
})();
