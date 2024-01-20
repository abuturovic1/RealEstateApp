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
    const Upit = sequelize.define("Upit", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tekst_upita: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        korisnik_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nekretnina_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return Upit;
}
