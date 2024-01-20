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
  const Nekretnina = sequelize.define("Nekretnina", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tip_nekretnine: {
      type: DataTypes.STRING,
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kvadratura: {
      type: DataTypes.INTEGER,
    },
    cijena: {
      type: DataTypes.FLOAT,

    },
    tip_grijanja: {
      type: DataTypes.STRING,
    },
    lokacija: {
      type: DataTypes.STRING,

    },
    godina_izgradnje: {
      type: DataTypes.INTEGER,
    },
    datum_objave: {
      type: DataTypes.STRING,

    },
    opis: {
      type: DataTypes.STRING,
    }
    // ,
    // korisnikId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }
  });

  return Nekretnina;
}