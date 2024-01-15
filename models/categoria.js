'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.financa,{foreignKey: "categoria_id"});
    }
  }
  categoria.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoria',
  });
  return categoria;
};