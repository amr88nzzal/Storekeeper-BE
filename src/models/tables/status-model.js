'use strict';

const statusSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('status', {
      statusName: { type: DataTypes.STRING, allowNull: false, unique: true },
      statusACL: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
    return model
}
  module.exports = statusSchema;