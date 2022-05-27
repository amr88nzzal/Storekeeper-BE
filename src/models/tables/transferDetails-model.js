'use strict';

const transferDetailsSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('transferDetails', {
      trxId: { type: DataTypes.STRING, allowNull: false },
      trxItemID: { type: DataTypes.INTEGER, allowNull: false },
      trxItemQty: { type: DataTypes.FLOAT,defaultValue:1 },
      trxItemRemark: { type: DataTypes.STRING},
    });
    return model
}
  module.exports = transferDetailsSchema;