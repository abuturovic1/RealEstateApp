const login = (error, data) => {
  if (error == null) {
    let obj = JSON.parse(data);
    window.localStorage.setItem('loggedIn', 'true');
    window.location.assign(obj.url);
  }
};

const logout = (error, data) => {
  if (error == null) {
    window.localStorage.removeItem('loggedIn');
    window.location.assign('/');
  }
};

const isLoggedIn = () => {
  const loggedIn = window.localStorage.getItem('loggedIn');
  var dugme = document.getElementById('odjavaLink');
  var profilLink = document.getElementById('profilLink');
  var odjavaLink = document.getElementById('odjavaLink');
  var prijavaLink = document.getElementById('prijavaLink');

  if (loggedIn === 'true') {
    dugme.style.display = 'inline';
    profilLink.style.display = 'inline';
    odjavaLink.style.display = 'inline';
    prijavaLink.style.display = 'none';
  } else {
    dugme.style.display = 'none';
    profilLink.style.display = 'none';
    odjavaLink.style.display = 'none';
    prijavaLink.style.display = 'inline';
  }
};

// const isLoggedIn = () => {
//   PoziviAjax.getLoggedIn((error, data) => {
//     if (error === null) {
//       const loggedIn = data === 'true';
//       var dugme = document.getElementById('odjavaLink');
//       var profilLink = document.getElementById('profilLink');
//       var odjavaLink = document.getElementById('odjavaLink');
//       var prijavaLink = document.getElementById('prijavaLink');

//       if (loggedIn) {
//         dugme.style.display = 'inline';
//         profilLink.style.display = 'inline';
//         odjavaLink.style.display = 'inline';
//         prijavaLink.style.display = 'none';
//       } else {
//         dugme.style.display = 'none';
//         profilLink.style.display = 'none';
//         odjavaLink.style.display = 'none';
//         prijavaLink.style.display = 'inline';
//       }
//     }
//   });
// };

const submitLogin = () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  PoziviAjax.postLogin(username, password, login);
};

const postLogout = () => {
  PoziviAjax.postLogout(logout);
};

window.onload = isLoggedIn;
