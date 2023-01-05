'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur',
      });
      Reservation.belongsTo(models.Appartment, {
        foreignKey: 'appartementId',
        as: 'appartement',
      });
    }
  }
  Reservation.init({
    entree: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Date d\'entrée ne peut pas être vide',
      },
    },
    sortie: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Date de sortie ne peut pas être vide',
      },
    },
    statut: {
      type: DataTypes.STRING,
      defaultValue: 'waiting'
    }
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};