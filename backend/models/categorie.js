'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorie.hasMany(models.Appartement, {
        foreignKey: 'appartementId',
        as: 'appartements',
      });
    }
  }
  Categorie.init({
    libelle: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Libellé ne peut pas être vide',
      },
      unique: {
        args: true,
        msg: 'Cette catégorie d\'appartement existe déjà',
      }
    }
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};