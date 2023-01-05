'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'userId',
        as: 'users',
      });

    }
  }
  Role.init({
    libelle: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Libellé ne peut pas être vide',
      },
      unique: {
        args: true,
        msg: 'Ce rôle existe déjà',
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};