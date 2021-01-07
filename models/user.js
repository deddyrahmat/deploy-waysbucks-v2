'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction , { as: "transactions", foreignKey: "id" })
    }
  };
  User.init({
    avatar: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['user', 'admin']
    }),
    cloudinary_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};