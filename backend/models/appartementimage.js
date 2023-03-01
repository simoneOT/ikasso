'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppartementImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppartementImage.belongsTo(models.Appartement, {
        foreignKey: 'appartementId',
        as: 'appartement',
      });
    }
  }
  AppartementImage.init({
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Image ne peut pas être vide',
      },
    }
  }, {
    sequelize,
    modelName: 'AppartementImage',
  });
  return AppartementImage;
};