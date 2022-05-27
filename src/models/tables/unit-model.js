'use strict';

const unitSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('unit', {
      unitName: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
    return model
}
  module.exports = unitSchema;