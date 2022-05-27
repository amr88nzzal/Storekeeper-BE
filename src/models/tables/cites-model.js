'use strict';

const citySchema = (sequelize, DataTypes) => {
    const model = sequelize.define('cites', {
      cityName: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
    return model
}
  module.exports = citySchema;