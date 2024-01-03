let SpisakNekretnina = function () {

  let listaNekretnina = [];
  let listaKorisnika = [];

  let init = function (nekretnine, korisnici) {
    listaNekretnina = nekretnine;
    listaKorisnika = korisnici;
  }

  let filtrirajNekretnine = function (kriterij) {

    if (kriterij === null || kriterij === undefined || typeof kriterij != 'object' || Object.keys(kriterij).length == 0) {
      return listaNekretnina;
    }


    let filtriraneNekretnine = [];

    for (let i = 0; i < listaNekretnina.length; i++) {
      let nekretnina = listaNekretnina[i];
      
      let ispunjeno = true;

      if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
        ispunjeno = false;
      }

      if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
        ispunjeno = false;

      }
      if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
        ispunjeno = false;
      }
      if (nekretnina.cijena < kriterij.min_cijena) {
        ispunjeno = false;
      }
      if (nekretnina.cijena > kriterij.max_cijena) {
        ispunjeno = false;
      }

      if (ispunjeno) filtriraneNekretnine.push(nekretnina);

    }

    return filtriraneNekretnine;


  };

  let ucitajDetaljeNekretnine = function (id) {
    let nekaNekretnina = null;
    for (let i = 0; i < listaNekretnina.length; i++) {
      if (listaNekretnina[i].id == id) {
        nekaNekretnina = listaNekretnina[i];
        break;
      }
    }

  }

  return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
  }
};
