'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Utilisateur.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
      Utilisateur.belongsTo(models.Agence, {
        foreignKey: 'agenceId',
        as: 'agence',
      });

      Utilisateur.hasMany(models.Appartement, {
        foreignKey: 'appartementId',
        as: 'appartements',
      });

      Utilisateur.hasMany(models.Reservation, {
        foreignKey: 'reservationId',
        as: 'reservations',
      });

    }
  }
  Utilisateur.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Nom de l\'utilisateur ne peut pas être vide',
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
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Mot de passe ne peut pas être vide',
      },
    }
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};