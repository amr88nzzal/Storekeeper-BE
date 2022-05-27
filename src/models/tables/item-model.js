'use strict';

const itemSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('item', {
      itemCode: { type: DataTypes.STRING, allowNull: false, unique: true },
      itemName: { type: DataTypes.STRING, allowNull: false, unique: true },
      itemPrice: { type: DataTypes.FLOAT,defaultValue:0 },
      itemUnitId: { type: DataTypes.INTEGER, allowNull: false },
    });
    return model
}
  module.exports = itemSchema;