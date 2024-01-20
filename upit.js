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
        upitId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tekstUpita: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        korisnikId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return Upit;
}
