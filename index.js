const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;
const saltRounds = 10;
const Sequelize = require('sequelize');
const sequelize = require('./db.js');
sequelize.authenticate().then(() => {
  console.log('Succesfully connected');
}).catch((error) => {
  console.error('Unable to connect: ', error);
});

const Korisnik = require("./korisnik.js")(sequelize);
const Nekretnina = require("./nekretnina.js")(sequelize);
const Upit = require("./upit.js")(sequelize);

// Korisnik.hasMany(Nekretnina, {
//   foreignKey: 'korisnikId',
// });
// Nekretnina.belongsTo(Korisnik, {
//   foreignKey: 'korisnikId',
// });

Korisnik.hasMany(Upit, { //korisnik moze imati vise upita
  foreignKey: {
    name: "korisnikId",
    field: "korisnikId",
    allowNull: false
  }

});
Upit.belongsTo(Korisnik, { //model upit pripada modelu korisnik
  foreignKey: {
    name: "korisnikId",
    field: "korisnikId",
    allowNull: false
  }
});
Nekretnina.hasMany(Upit, { //nekretnina ima vise upita
  foreignKey: {
    name: "id",
    field: "id",
    allowNull: false
  }
  //'upiti'
});
Upit.belongsTo(Nekretnina, { //upit pripada nekretnini
  foreignKey: {
    name: "id",
    field: "id",
    allowNull: false
  }
});
sequelize.sync({ force: true }).then(async () => {
  console.log('Table created successfully!');

  try {
    const korisnik1 = await Korisnik.create({
      // korisnikId: 1,
      ime: 'Neko',
      prezime: 'Nekic',
      username: 'username1',
      password: '$2a$10$t4YxqiFBYfhp1IDMOcOTZO4WQE9IVFZkZZPDfBy9rJXPybJYWWltS'
    });
    console.log('Inserted data for username1');

    const korisnik2 = await Korisnik.create({
      // korisnikId: 2,
      ime: 'Neko2',
      prezime: 'Nekic2',
      username: 'username2',
      password: '$2a$10$Dpc1lmPv284BQTcC3Ves9uEUe.b5B5gF8XoDiGC0cdAl1Rb0lbUIS'
    });
    console.log('Inserted data for username2');

    const nekretnina1 = await Nekretnina.create({
      // nekretninaId: 1,
      tip_nekretnine: 'Stan',
      naziv: 'Useljiv stan Sarajevo',
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: 'plin',
      lokacija: 'Novo Sarajevo',
      godina_izgradnje: 2019,
      datum_objave: '01.10.2023.',
      opis: 'Sociis natoque penatibus.',
    });
    console.log('Inserted data for Nekretnina sa id 1');

    const nekretnina2 = await Nekretnina.create({
      // nekretninaId: 2,
      tip_nekretnine: 'Poslovni prostor',
      naziv: 'Mali poslovni prostor',
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: 'struja',
      lokacija: 'Centar',
      godina_izgradnje: 2005,
      datum_objave: '20.08.2023.',
      opis: 'Magnis dis parturient montes',
    });
    console.log('Inserted data for Nekretnina sa id 2');

    await Upit.create({
      // upitId: 1,
      tekstUpita: 'Nullam eu pede mollis pretium.',
      korisnikId: korisnik1.korisnikId,
      id: nekretnina1.id,
    });
    console.log('Inserted data for Upit (korisnikId: 1, nekretninaId: 1)');

    await Upit.create({
      // upitId: 2,
      tekstUpita: 'Phasellus viverra nulla.',
      korisnikId: korisnik2.korisnikId,
      id: nekretnina1.id,
    });
    console.log('Inserted data for Upit (korisnikId: 2, nekretninaId: 1)');

    await Upit.create({
      // upitId: 3,
      tekstUpita: 'Integer tincidunt.',
      korisnikId: korisnik2.korisnikId,
      id: nekretnina2.id,
    });
    console.log('Inserted data for Upit (korisnikId: 2, nekretninaId: 2)');
  } catch (error) {
    console.error('Failed to insert data:', error.message);
  }
});

app.use(
  session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: 'true',
  })
);

// const publicPath = path.join(__dirname, 'public');

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

// app.post('/login', (req, res) => {
//   if (!req.body || !req.body.username || !req.body.password) {
//     res.status(401).json({ greska: 'Neuspješna prijava' });
//   } else {
//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//       const { username, password } = req.body;
//       let korisnici = require('./data/korisnici.json');
//       let prijava = false;

//       if (hash) {
//         for (let i = 0; i < korisnici.length; i++) {
//           if (korisnici[i].username === username) {
//             prijava = true;
//             bcrypt.compare(password, korisnici[i].password, (err, result) => {
//               if (err) {
//                 res.status(401).json({ greska: 'Neuspješna prijava' });
//               } else {
//                 if (result) {
//                   req.session.loggedIn = true;
//                   req.session.username = username;
//                   res.status(200).json({ poruka: 'Uspješna prijava', url: '/nekretnine.html' });
//                 } else {
//                   res.status(401).json({ greska: 'Neuspješna prijava' });
//                 }
//               }
//             });
//           }
//         }
//       }
//       if (!prijava) {
//         res.status(401).json({ greska: 'Neuspješna prijava' });
//       }
//       if (err) {
//         res.status(401).json({ greska: 'Neuspješna prijava' });
//       }
//     });
//   }
// });
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Korisnik.findOne({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ greska: 'Neuspješna prijava' });
      return;
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        res.status(401).json({ greska: 'Neuspješna prijava' });
      } else {
        req.session.loggedIn = true;
        req.session.username = username;
        res.status(200).json({ poruka: 'Uspješna prijava', url: '/nekretnine.html' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ greska: 'Internal server error' });
  }
});


app.post('/logout', (req, res) => {
 
  delete req.session.username;
  req.session.loggedIn = false;
  res.json({
    poruka: "Korisnik odjavljen",
    url: "/prijava.html"
  });

});
app.get('/korisnik', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const username = req.session.username;
      const user = await Korisnik.findOne({
        where: { username },
      });
      if (user) {
        res.status(200).json({
          id: user.korisnikId,
          ime: user.ime,
          prezime: user.prezime,
          username: user.username,
          password: user.password,
        });
      } else {
        res.status(404).send('Korisnik nije pronađen!');
      }
    } else {
      res.status(401).send('Neautorizovan pristup');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

// app.post('/upit', (req, res) => {
//   if (req.session.loggedIn) {
//     const { nekretnina_id, tekst_upita } = req.body;

//     const nekretnine = require('./data/nekretnine.json');

//     const nekretnina = nekretnine.find(nekretnina => nekretnina.id == nekretnina_id);

//     const username = req.session.username;

//     const korisnici = require('./data/korisnici.json');

//     const korisnikId = korisnici.find(korisnik => korisnik.username === username).id;

//     if (!nekretnina) {
//       res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
//     } else {
//       nekretnina.upiti.push({
//         korisnik_id: korisnikId,
//         tekst_upita,
//       });
//       res.status(200).json({ poruka: 'Upit je uspjesno dodan' });
//     }
//   } else {
//     res.status(401).json({ greska: 'Neautorizovan pristup' });
//   }
// });

// app.put('/korisnik', (req, res) => {
//   if (req.session.loggedIn) {
//     const { ime, prezime, username, password } = req.body;
//     const korisnici = require('./data/korisnici.json');

//     const userIndex = korisnici.findIndex(user => user.username === req.session.username);

//     if (ime) {
//       korisnici[userIndex].ime = ime;
//     }
//     if (prezime) {
//       korisnici[userIndex].prezime = prezime;
//     }
//     if (username) {
//       korisnici[userIndex].username = username;
//     }
//     if (password) {
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) {
//           res.status(500).json({ greska: 'Greška prilikom heširanja passworda' });
//         } else {
//           korisnici[userIndex].password = hash;
//         }
//       });
//     }

//     fs.writeFile('./data/korisnici.json', JSON.stringify(korisnici, null, 2), err => {
//       if (err) {
//         res.status(500).json({ greska: 'Greška prilikom ažuriranja podataka korisnika' });
//         return;
//       }
//       res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
//     });
//   } else {
//     res.status(401).json({ greska: 'Neautorizovan pristup' });
//   }
// });

// app.get('/nekretnine', (req, res) => {
//   let nekretnine = require('./data/nekretnine.json');

//   res.status(200).json({ nekretnine });
// });


app.get('/nekretnine', async (req, res) => {
   const sveNekretnine = await Nekretnina.findAll();
  //res.status(200).send({ nekretnine: sveNekretnine });
  let nekretnine = require('./data/nekretnine.json');

  const plainNekretnine = sveNekretnine.map(({ dataValues }) => dataValues);

  console.log(plainNekretnine);


  res.status(200).send({ nekretnine: plainNekretnine });
});



// app.get('/isloggedin', function (req, res) {
//   if (req.session.loggedIn == true) {
//     res.send(req.session.loggedIn);
//   } else {
//     res.send(false);
//   }
// });

// app.post('/marketing/nekretnine', (req, res) => {
//   const { nizNekretnina } = req.body;
//   console.log(nizNekretnina);
//   res.status(200).send();
// });

// app.post('/marketing/nekretnina/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   res.status(200).send();
// });

// app.post('/marketing/osvjezi', (req, res) => {
//   const { nizNekretnina } = req.body;
//   res.status(200).json(nizNekretnina);
// });

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
