const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(
  session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: 'true',
  })
);

const publicPath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/meni.html'));
});

app.post('/login', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(401).json({ greska: 'Neuspješna prijava' });
  } else {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      const { username, password } = req.body;
      let korisnici = require('./data/korisnici.json');
      let prijava = false;

      if (hash) {
        for (let i = 0; i < korisnici.length; i++) {
          if (korisnici[i].username === username) {
            prijava = true;
            bcrypt.compare(password, korisnici[i].password, (err, result) => {
              if (err) {
                res.status(401).json({ greska: 'Neuspješna prijava' });
              } else {
                if (result) {
                  req.session.loggedIn = true;
                  req.session.username = username;
                  res.status(200).json({ poruka: 'Uspješna prijava', url: '/nekretnine.html' });
                } else {
                  res.status(401).json({ greska: 'Neuspješna prijava' });
                }
              }
            });
          }
        }
      }
      if (!prijava) {
        res.status(401).json({ greska: 'Neuspješna prijava' });
      }
      if (err) {
        res.status(401).json({ greska: 'Neuspješna prijava' });
      }
    });
  }
});

app.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.username = null;
    req.session.loggedIn = false;
    res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});

app.get('/korisnik', function (req, res) {
  if (req.session.loggedIn) {
    let username = req.session.username;

    let korisnici = require('./data/korisnici.json');

    for (let i = 0; i < korisnici.length; i++) {
      if (korisnici[i].username === username) {
        res.status(200).json({
          id: korisnici[i].id,
          ime: korisnici[i].ime,
          prezime: korisnici[i].prezime,
          username: korisnici[i].username,
          password: korisnici[i].password,
        });
      }
    }
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});

app.post('/upit', (req, res) => {
  if (req.session.loggedIn) {
    const { nekretnina_id, tekst_upita } = req.body;

    const nekretnine = require('./data/nekretnine.json');

    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == nekretnina_id);

    const username = req.session.username;

    const korisnici = require('./data/korisnici.json');

    const korisnikId = korisnici.find(korisnik => korisnik.username === username).id;

    if (!nekretnina) {
      res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    } else {
      nekretnina.upiti.push({
        korisnik_id: korisnikId,
        tekst_upita,
      });
      res.status(200).json({ poruka: 'Upit je uspjesno dodan' });
    }
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});

app.put('/korisnik', (req, res) => {
  if (req.session.loggedIn) {
    const { ime, prezime, username, password } = req.body;
    const korisnici = require('./data/korisnici.json');

    const userIndex = korisnici.findIndex(user => user.username === req.session.username);

    if (ime) {
      korisnici[userIndex].ime = ime;
    }
    if (prezime) {
      korisnici[userIndex].prezime = prezime;
    }
    if (username) {
      korisnici[userIndex].username = username;
    }
    if (password) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).json({ greska: 'Greška prilikom heširanja passworda' });
        } else {
          korisnici[userIndex].password = hash;
        }
      });
    }

    fs.writeFile('./data/korisnici.json', JSON.stringify(korisnici, null, 2), err => {
      if (err) {
        res.status(500).json({ greska: 'Greška prilikom ažuriranja podataka korisnika' });
        return;
      }
      res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    });
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});

app.get('/nekretnine', (req, res) => {
  let nekretnine = require('./data/nekretnine.json');

  res.status(200).json({ nekretnine });
});

app.get('/isloggedin', function (req, res) {
  if (req.session.loggedIn == true) {
    res.send(req.session.loggedIn);
  } else {
    res.send(false);
  }
});

app.post('/marketing/nekretnine', (req, res) => {
  const { nizNekretnina } = req.body;
  console.log(nizNekretnina);
  res.status(200).send();
});

app.post('/marketing/nekretnina/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).send();
});

app.post('/marketing/osvjezi', (req, res) => {
  const { nizNekretnina } = req.body;
  res.status(200).json(nizNekretnina);
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(publicPath, 'html', `${page}.html`);

  fs.access(filePath, fs.constants.F_OK, err => {
    if (err) {
      res.status(404).send('Not Found');
    } else {
      res.sendFile(filePath);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
