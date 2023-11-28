function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {

  const filtriraneNekretnine = instancaModula.filtrirajNekretnine({tip_nekretnine: tip_nekretnine});


  let gridDiv = document.createElement("div");
  gridDiv.className = "grid_container";


  for (let i = 0; i < filtriraneNekretnine.length; i++) {
    
    let nekretnina = filtriraneNekretnine[i];

    let nekretninaItemDiv = document.createElement("div");
    nekretninaItemDiv.className = "nekretnina";
    let desnoDiv = document.createElement("div");
    desnoDiv.className = "desno";
    nekretninaItemDiv.innerHTML = `
      <img alt="Slika nekretnine">
      <h3>Naziv: ${nekretnina.naziv}</h3>
      
      <p>Kvadratura: ${nekretnina.kvadratura}m2</p>
      
    	
    `;
    desnoDiv.innerHTML = `
      <p>Cijena: ${nekretnina.cijena}KM</p>
`;
    let dugmeDiv = document.createElement('div');
    dugmeDiv.className = "dugme";
    dugmeDiv.innerHTML = `<button>Detalji</button>`;
    nekretninaItemDiv.appendChild(desnoDiv);
    nekretninaItemDiv.appendChild(dugmeDiv);
    gridDiv.appendChild(nekretninaItemDiv);
  }
  divReferenca.appendChild(gridDiv);
  gridDiv.style.display = "grid";  //dinamicki sam dodala style za grid, ne prepoznaje css?
  gridDiv.style.gridTemplateColumns = "repeat(auto-fit,minmax(300px,1fr))";
  gridDiv.style.gap = "20px";
  gridDiv.style.justifyContent = "center";
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

const listaNekretnina = [
  {
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  },

  {
    id: 2,
    tip_nekretnine: "Stan",
    naziv: "Stan za iznajmljivanje Sarajevo",
    kvadratura: 30,
    cijena: 1000,
    tip_grijanja: "plin",
    lokacija: "Centar",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  },
  {
    id: 3,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
      korisnik_id: 2,
      tekst_upita: "Integer tincidunt."
    }
    ]
  },
  {
    id: 4,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa bazenom",
    kvadratura: 250,
    cijena: 400000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  },
  {
    id: 5,
    tip_nekretnine: "Stan",
    naziv: "Mali stan Sarajevo",
    kvadratura: 45,
    cijena: 132000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  },
  {
    id: 6,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Veliki poslovni prostor",
    kvadratura: 80,
    cijena: 200000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
      korisnik_id: 2,
      tekst_upita: "Integer tincidunt."
    }
    ]
  },
  {
    id: 7,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Novi poslovni prostor",
    kvadratura: 50,
    cijena: 150000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
      korisnik_id: 2,
      tekst_upita: "Integer tincidunt."
    }
    ]
  },
  {
    id: 8,
    tip_nekretnine: "Kuća",
    naziv: "Mala kuća",
    kvadratura: 100,
    cijena: 250000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  },
  {
    id: 9,
    tip_nekretnine: "Kuća",
    naziv: "Kuća za iznajmljivanje",
    kvadratura: 200,
    cijena: 300000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
    }]
  }
]
const listaKorisnika = [{
  id: 1,
  ime: "Neko",
  prezime: "Nekic",
  username: "username1",
},
{
  id: 2,
  ime: "Neko2",
  prezime: "Nekic2",
  username: "username2",
}]

let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

