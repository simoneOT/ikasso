'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appartement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appartement.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur',
      });

      Appartement.belongsTo(models.Categorie, {
        foreignKey: 'categorieId',
        as: 'categorie',
      });

      Appartement.belongsTo(models.Ville, {
        foreignKey: 'villeId',
        as: 'ville',
      });

      Appartement.hasMany(models.AppartementImage, {
        foreignKey: 'appartementImageId',
        as: 'appartementImages',
      });

      Appartement.hasMany(models.Reservation, {
        foreignKey: 'reservationId',
        as: 'reservations',
      });
    }
  }
  Appartement.init({
    description: DataTypes.STRING,
    prix: DataTypes.STRING,
    adresse: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appartement',
  });
  return Appartement;
};