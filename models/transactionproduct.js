'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionProduct.belongsTo(models.Transaction,{
        as : "transaction", foreignKey: 'transactionId'
      });


      TransactionProduct.belongsTo(models.Product,{
        as : "product", foreignKey: 'productId'
      });

      // TransactionProduct.belongsToMany(models.Product, { through: 'percobaan', foreignKey: 'productId' })
      TransactionProduct.hasMany(models.TransactionToping,{
        as : "topings", foreignKey: 'id'
      });
    }
  };
  TransactionProduct.init({
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionProduct',
  });
  return TransactionProduct;
};