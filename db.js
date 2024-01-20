const {
    Sequelize
} = require("sequelize");

const sequelize = new Sequelize(
    'wt24',
    'root',
    'password', {
    host: 'localhost',
    dialect: 'mysql'
}
);

//Testiranje konekcije
sequelize.authenticate()
    .then(() => {
        console.log('Konekcija uspostavljena.');
    })
    .catch(err => {
        console.error('Nemoguce spojiti se sa bazom:', err);
    });

module.exports = sequelize;
