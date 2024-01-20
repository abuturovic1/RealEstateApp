const {
    Sequelize,
    DataTypes
} = require("sequelize");
const sequelize = new Sequelize(
    'wt24',
    'root',
    'password', {
    host: 'localhost',
    dialect: 'mysql'
}
);
module.exports = function (sequelize) {
    const Korisnik = sequelize.define("Korisnik", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ime: {
            type: DataTypes.STRING,

        },
        prezime: {
            type: DataTypes.STRING,

        },
        username: {
            type: DataTypes.STRING,
            unique: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Korisnik;
}
