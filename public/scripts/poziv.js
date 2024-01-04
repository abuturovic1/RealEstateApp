const login = (error, data) => {
  if (error == null) {
    setLoggedIn(true);
    removeForm();
  }
};

const logout = (error, data) => {
  if (error == null) {
    setLoggedIn(false);
  }
};

const nekretnine = (error, data) => {
  if (error == null) {
    let lista_nekretnina = JSON.parse(data);
    console.log('Tu sam');
  }
};

// const nekretnineInit = (event) => {
//   getNekretnine();
// }

const removeForm = () => {
  const element = document.getElementById('forma');
  element.remove();
};

const setLoggedIn = loggedIn => {
  if (loggedIn) {
    document.getElementById('profilLink').style.display = 'inline';
    document.getElementById('odjavaLink').style.display = 'inline';
    document.getElementById('prijavaLink').style.display = 'none';
  } else {
    document.getElementById('profilLink').style.display = 'none';
    document.getElementById('odjavaLink').style.display = 'none';
    document.getElementById('prijavaLink').style.display = 'inline';
  }
};

const submitLogin = () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  PoziviAjax.postLogin(username, password, login);
};


const getNekretnine = event => {
  event.preventDefault();

  PoziviAjax.getNekretnine(nekretnine);
};

