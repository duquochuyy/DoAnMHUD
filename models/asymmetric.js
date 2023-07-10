'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asymmetric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asymmetric.init({
    publicKey: DataTypes.TEXT,
    privateKey: DataTypes.TEXT,
    valueOfn: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Asymmetric',
  });
  return Asymmetric;
};