'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ville extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ville.belongsTo(models.Pays, {
        foreignKey: 'paysId',
        as: 'pays',
      });

      Ville.hasMany(models.Appartement, {
        foreignKey: 'appartementId',
        as: 'appartements',
      });

      Ville.hasMany(models.Agence, {
        foreignKey: 'agenceId',
        as: 'agences',
      });
    }
  }
  Ville.init({
    nom:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Nom de la ville ne peut pas être vide',
      }
    },
  }, {
    sequelize,
    modelName: 'Ville',
  });
  return Ville;
};