'use strict';

const categorySchema = (sequelize, DataTypes) => {
    const model = sequelize.define('category', {
      categoryName: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
    return model
}
  module.exports = categorySchema;