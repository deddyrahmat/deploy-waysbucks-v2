'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionProduct, 
        {as: 'products', foreignKey: 'transactionId'}
      );//tidak bisa pake alias


      // Transaction.hasOne(models.TransactionProduct, 
      //   {as: 'products', foreignKey: 'transactionId'}
      // );//tidak bisa pake alias


      Transaction.belongsTo(models.User,{
        as : "user"
      });
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    posCode: DataTypes.STRING,
    attachment: DataTypes.STRING,
    status: DataTypes.STRING,
    income: DataTypes.INTEGER,
    cloudinary_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};