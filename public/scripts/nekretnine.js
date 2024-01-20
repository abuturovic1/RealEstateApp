// function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
//   const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
//   //na ovaj nacin dinamicki dodajem naslov u div sa id-em stan, kuca i poslovni prostor respektivno
//   if (divReferenca.id === 'stan') {
//     divReferenca.innerHTML = `<h2>Stan</h2>`;
//   } else if (divReferenca.id === 'kuca') {
//     divReferenca.innerHTML = `<h2>Kuća</h2>`;
//   } else if (divReferenca.id === 'pp') {
//     divReferenca.innerHTML = `<h2>Poslovni prostor</h2>`;
//   }
//   let gridDiv = document.createElement('div');
//   gridDiv.className = 'grid_container';
//   for (let i = 0; i < filtriraneNekretnine.length; i++) {
//     let nekretnina = filtriraneNekretnine[i];
//     // Provjeravam tip nekretnine da bi osigurala da se nekretnine upisuju samo ako zadovoljavaju uslove tipa nekretnine
//     if (tip_nekretnine && nekretnina.tip_nekretnine != tip_nekretnine) continue;
//     let nekretninaItemDiv = document.createElement('div');
//     nekretninaItemDiv.className = 'nekretnina';
//     let desnoDiv = document.createElement('div');
//     desnoDiv.className = 'desno';
//     nekretninaItemDiv.innerHTML = `
//       <img alt="Slika nekretnine">
//       <h3>Naziv: ${nekretnina.naziv}</h3>

//       <p>Kvadratura: ${nekretnina.kvadratura}m2</p>


//     `;
//     desnoDiv.innerHTML = `
//       <p>Cijena: ${nekretnina.cijena}KM</p>
// `;
//     let dugmeDiv = document.createElement('div');
//     dugmeDiv.className = 'dugme';
//     dugmeDiv.innerHTML = `<button>Detalji</button>`;
//     nekretninaItemDiv.appendChild(desnoDiv);
//     nekretninaItemDiv.appendChild(dugmeDiv);
//     gridDiv.appendChild(nekretninaItemDiv);
//   }

//   divReferenca.appendChild(gridDiv);
//   gridDiv.style.display = 'grid'; //dinamicki sam dodala style za grid, ne prepoznaje css?
//   gridDiv.style.gridTemplateColumns = 'repeat(auto-fit,minmax(300px,1fr))';
//   gridDiv.style.gap = '20px';
//   gridDiv.style.justifyContent = 'center';
// }
// function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
//   const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

//   if (divReferenca.id === 'stan') {
//     divReferenca.innerHTML = `<h2>Stan</h2>`;
//   } else if (divReferenca.id === 'kuca') {
//     divReferenca.innerHTML = `<h2>Kuća</h2>`;
//   } else if (divReferenca.id === 'pp') {
//     divReferenca.innerHTML = `<h2>Poslovni prostor</h2>`;
//   }

//   let gridDiv = document.createElement('div');
//   gridDiv.className = 'grid_container';

//   for (let i = 0; i < filtriraneNekretnine.length; i++) {
//     let nekretnina = filtriraneNekretnine[i];

//     let nekretninaItemDiv = document.createElement('div');
//     nekretninaItemDiv.className = 'nekretnina';

//     let desnoDiv = document.createElement('div');
//     desnoDiv.className = 'desno';
//     nekretninaItemDiv.innerHTML = `
//       <img alt="Slika nekretnine">
//       <h3>Naziv: ${nekretnina.naziv}</h3>
//       <p>Kvadratura: ${nekretnina.kvadratura}m2</p>

//     `;

//     desnoDiv.innerHTML = `
//       <p>Cijena: ${nekretnina.cijena}KM</p>
//       <p class="lokacija" style="display:none;">Lokacija: ${nekretnina.lokacija}</p>
//       <p class="godina_izgradnje" style="display:none;">Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
//     `;

//     let dugmeDiv = document.createElement('div');
//     dugmeDiv.className = 'dugme';
//     let detaljiButton = document.createElement('button');
//     detaljiButton.textContent = 'Detalji';
//     detaljiButton.addEventListener('click', () => toggleDetails(desnoDiv));
//     dugmeDiv.appendChild(detaljiButton);

//     nekretninaItemDiv.appendChild(desnoDiv);
//     nekretninaItemDiv.appendChild(dugmeDiv);
//     gridDiv.appendChild(nekretninaItemDiv);
//   }

//   divReferenca.appendChild(gridDiv);
//   gridDiv.style.display = 'grid';
//   gridDiv.style.gridTemplateColumns = 'repeat(auto-fit,minmax(300px,1fr))';
//   gridDiv.style.gap = '20px';
//   gridDiv.style.justifyContent = 'center';
// }

// function toggleDetails(desnoDiv) {
//   let lokacijaElement = desnoDiv.querySelector('.lokacija');
//   let godinaIzgradnjeElement = desnoDiv.querySelector('.godina_izgradnje');

//   if (lokacijaElement.style.display === 'none') {
//     lokacijaElement.style.display = 'block';
//     godinaIzgradnjeElement.style.display = 'block';
//   } else {
//     lokacijaElement.style.display = 'none';
//     godinaIzgradnjeElement.style.display = 'none';
//   }
// }
function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

  if (divReferenca.id === 'stan') {
    divReferenca.innerHTML = `<h2>Stan</h2>`;
  } else if (divReferenca.id === 'kuca') {
    divReferenca.innerHTML = `<h2>Kuća</h2>`;
  } else if (divReferenca.id === 'pp') {
    divReferenca.innerHTML = `<h2>Poslovni prostor</h2>`;
  }

  let gridDiv = document.createElement('div');
  gridDiv.className = 'grid_container';

  for (let i = 0; i < filtriraneNekretnine.length; i++) {
    let nekretnina = filtriraneNekretnine[i];

    let nekretninaItemDiv = document.createElement('div');
    nekretninaItemDiv.className = 'nekretnina';

    let desnoDiv = document.createElement('div');
    desnoDiv.className = 'desno';
    nekretninaItemDiv.innerHTML = `
      <img alt="Slika nekretnine">
      <h3>Naziv: ${nekretnina.naziv}</h3>
      <p>Kvadratura: ${nekretnina.kvadratura}m2</p>
    `;

    desnoDiv.innerHTML = `
      <p>Cijena: ${nekretnina.cijena}KM</p>
      <p class="lokacija" style="display:none;">Lokacija: ${nekretnina.lokacija}</p>
      <p class="godina_izgradnje" style="display:none;">Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
    `;

    let dugmeDiv = document.createElement('div');
    dugmeDiv.className = 'dugme';
    let detaljiButton = document.createElement('button');
    detaljiButton.textContent = 'Detalji';
    detaljiButton.addEventListener('click', () => toggleDetails(desnoDiv, dugmeDiv));
    dugmeDiv.appendChild(detaljiButton);


    let prikaziDetaljeButton = document.createElement('button');
    prikaziDetaljeButton.textContent = 'Otvori detalje';
    prikaziDetaljeButton.style.display = 'none';
    prikaziDetaljeButton.addEventListener('click', () => { window.location.href = 'detalji.html'; });
    dugmeDiv.appendChild(prikaziDetaljeButton);

    nekretninaItemDiv.appendChild(desnoDiv);
    nekretninaItemDiv.appendChild(dugmeDiv);
    gridDiv.appendChild(nekretninaItemDiv);
  }

  divReferenca.appendChild(gridDiv);
  gridDiv.style.display = 'grid';
  gridDiv.style.gridTemplateColumns = 'repeat(auto-fit,minmax(300px,1fr))';
  gridDiv.style.gap = '20px';
  gridDiv.style.justifyContent = 'center';
}

function toggleDetails(desnoDiv, dugmeDiv) {
  let lokacijaElement = desnoDiv.querySelector('.lokacija');
  let godinaIzgradnjeElement = desnoDiv.querySelector('.godina_izgradnje');
  let prikaziDetaljeButton = dugmeDiv.querySelector('button:nth-child(2)');

  if (lokacijaElement.style.display === 'none') {
    lokacijaElement.style.display = 'block';
    godinaIzgradnjeElement.style.display = 'block';
    prikaziDetaljeButton.style.display = 'block';
  } else {
    lokacijaElement.style.display = 'none';
    godinaIzgradnjeElement.style.display = 'none';
    prikaziDetaljeButton.style.display = 'none';
  }
}

/*function showAdditionalDetails() {
  console.log("Clicked on additional details")


  // let lokacijaElement = desnoDiv.querySelector('.lokacija');
  // let godinaIzgradnjeElement = desnoDiv.querySelector('.godina_izgradnje');

  // lokacijaElement.style.display = 'block';
  // godinaIzgradnjeElement.style.display = 'block';
}*/

const divStan = document.getElementById('stan');
const divKuca = document.getElementById('kuca');
const divPp = document.getElementById('pp');

const listaKorisnika = [
  {
    id: 1,
    ime: 'Neko',
    prezime: 'Nekic',
    username: 'username1',
  },
  {
    id: 2,
    ime: 'Neko2',
    prezime: 'Nekic2',
    username: 'username2',
  },
];

const nekretnine = (error, data) => {
  if (error == null) {
    let lista_nekretnina = JSON.parse(data);
    let nekretnine = SpisakNekretnina();
    nekretnine.init(lista_nekretnina, listaKorisnika);

    spojiNekretnine(divStan, nekretnine, 'Stan');
    spojiNekretnine(divKuca, nekretnine, 'Kuća');
    spojiNekretnine(divPp, nekretnine, 'Poslovni prostor');
  }
};

PoziviAjax.getNekretnine(nekretnine);

const filtrirajNekretnine = () => {
  MarketingAjax.klikNekretnina(1);
};
