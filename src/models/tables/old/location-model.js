'use strict';
const locationSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('locations', {
      locationName: { type: DataTypes.STRING, allowNull: false, unique: true },
      locationCityID: { type: DataTypes.INTEGER, allowNull: false},
    });
    return model
}
  module.exports = locationSchema;