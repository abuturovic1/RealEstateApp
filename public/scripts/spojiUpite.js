const isLogin = (error, data) => {
    if (data === "false") {
        console.log("Tu");
        const div = document.getElementById('novi-upiti');
        div.style.display = 'none';
    }
}

const korisnik = (error, data) => {
    if (error == null) {
        const user = JSON.parse(data);
        const newListItem = document.createElement('li');

        const upit = document.getElementById('upit');
        let value = upit.value;

        newListItem.innerHTML = `<strong>${user.username}</strong><br>${value}`;

        const upitiList = document.getElementById('upiti').querySelector('ul');

        upitiList.appendChild(newListItem);
        value = '';
    }
}

const postUpit = (error, data) => {
    if (error == null) {
        PoziviAjax.getKorisnik(korisnik);
    }
}

PoziviAjax.getLoggedIn(isLogin);

const upitSubmit = event => {
    event.preventDefault();
    const nekretninaId = urlParams.get('id');
    const upit = document.getElementById('upit');
    const value = upit.value;
    PoziviAjax.postUpit(nekretninaId, value, postUpit);
}

