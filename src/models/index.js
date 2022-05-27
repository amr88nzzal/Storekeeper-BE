'use strict';
require('dotenv').config()
//import the Sequelize & DataTypes

const Collection = require('./collection');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL || "postgresql://localhost:5432/storrkeeper";
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

let sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
//-----------------

// import schemas
const userSchema = require('./tables/users-model');
const locationSchema = require('./tables/location-model');
const citySchema = require('./tables/cites-model');
const categorySchema = require('./tables/category-model');
const customerSchema = require('./tables/customer-model');
const transactionSchema = require('./tables/transactions-model');

// make the models
const userModel = userSchema(sequelize, DataTypes);
const locationModel = locationSchema(sequelize, DataTypes);
const cityModel = citySchema(sequelize, DataTypes);
const categoryModel = categorySchema(sequelize, DataTypes);
const customerModel = customerSchema(sequelize, DataTypes);
const transactionModel = transactionSchema(sequelize, DataTypes);
// console.log("-------------", customerModel);

//---------------
//1---------city ==> location
cityModel.hasMany(locationModel, { foreignKey: 'locationCityID', sourceKey: 'id' });
locationModel.belongsTo(cityModel, { foreignKey: 'locationCityID', targetKey: 'id' });
//2---------location ==> customer
locationModel.hasMany(customerModel, { foreignKey: 'customerLocationId', sourceKey: 'id' });
customerModel.belongsTo(locationModel, { foreignKey: 'customerLocationId', targetKey: 'id' });
//3---------category ==> customer
categoryModel.hasMany(customerModel, { foreignKey: 'customerCategoryId', sourceKey: 'id' });
customerModel.belongsTo(categoryModel, { foreignKey: 'customerCategoryId', targetKey: 'id' });
//4---------user ==> customer
userModel.hasMany(customerModel, { foreignKey: 'customerUserId', sourceKey: 'id' });
customerModel.belongsTo(userModel, { foreignKey: 'customerUserId', targetKey: 'id' });
//5---------customer ==> trx
customerModel.hasMany(transactionModel, { foreignKey: 'trxCustomerId', sourceKey: 'id' });
transactionModel.belongsTo(customerModel, { foreignKey: 'trxCustomerId', targetKey: 'id' });
//6---------trx ==> user
userModel.hasMany(transactionModel, { foreignKey: 'trxUserId', sourceKey: 'id' });
transactionModel.belongsTo(userModel, { foreignKey: 'trxUserId', targetKey: 'id' });

//=== make collections ======
const userCollection = new Collection(userModel);
const cityCollection = new Collection(cityModel);
const locationCollection = new Collection(locationModel,cityModel);
const categoryCollection = new Collection(categoryModel);
const customerCollection = new Collection(customerModel,userModel,categoryModel,locationModel,cityModel);
const transactionCollection = new Collection(transactionModel,userModel,customerModel,categoryModel,locationModel,cityModel);
//--------------

module.exports = {
  db: sequelize,
  userCollection: userCollection,
  locationCollection: locationCollection,
  cityCollection: cityCollection,
  categoryCollection: categoryCollection,
  customerCollection: customerCollection,
  transactionCollection: transactionCollection
}