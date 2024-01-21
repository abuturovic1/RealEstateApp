const nekretnine = (error, data) => {
    if (error == null) {
        const nekretninaData = JSON.parse(data);
        const nekretnina = nekretninaData.nekretnina;
        const upiti = nekretninaData.noviUpiti;
        const usernames = nekretninaData.usernames;


        document.getElementById('osnovno').innerHTML = `
        <p><strong>Naziv: </strong>${nekretnina.naziv}</p> <br>
        <p><strong>Kvadratura: </strong>${nekretnina.kvadratura} m2</p><br>
        <p><strong>Cijena: </strong>${nekretnina.cijena} KM</p><br>`;

        document.getElementById('detalji').innerHTML = `
        <p><strong>Tip grijanja: </strong>${nekretnina.tip_grijanja}</p>
        <p> <strong>Godina izgradnje: </strong>${nekretnina.godina_izgradnje}.</p>
        <p><strong>Lokacija: </strong>${nekretnina.lokacija}</p>
        <p><strong>Datum objave: </strong>${nekretnina.datum_objave}</p>
        <div id="opis">
            <p> <strong>Opis:</strong> ${nekretnina.opis}</p>
        </div>`;

        const upitiList = document.getElementById('upiti-list');

        upitiList.innerHTML = '<ul></ul>';
        const ul = upitiList.querySelector('ul');

        upiti.forEach((upit, index) => {
            const listItem = document.createElement('li');
            const username = usernames[index];
            listItem.innerHTML = `<strong>${username}</strong><br>${upit.tekst_upita}`;
            ul.appendChild(listItem);
        });
    }
}

const urlParams = new URLSearchParams(window.location.search);

const nekretninaId = urlParams.get('id') || 1;

PoziviAjax.getNekretninaById(nekretninaId, nekretnine);

