'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pays.hasMany(models.Ville, {
        foreignKey: 'villeId',
        as: 'villes',
      });
    }
  }
  Pays.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Nom du pays ne peut pas être vide',
      },
      unique: {
        args: true,
        msg: 'Ce pays existe déjà',
      }
    }
  }, {
    sequelize,
    modelName: 'Pays',
  });
  return Pays;
};