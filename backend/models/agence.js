'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agence.belongsTo(models.Ville, {
        foreignKey: 'villeId',
        as: 'ville',
      });
      Agence.hasMany(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateurs',
      });
    }
  }
  Agence.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Nom de l\'agence ne peut pas être vide',
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Cette adresse email existe déjà',
      }
    },
    telephone: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Ce numéro de téléphone existe déjà',
      }
    },
    adresse: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agence',
  });
  return Agence;
};