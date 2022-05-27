'use strict';

const transferSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('transfer', {
      trxId: { type: DataTypes.INTEGER, unique: true },
      trxUserId: { type: DataTypes.INTEGER },
      trxFromSectionId: { type: DataTypes.INTEGER },
      trxToSectionId: { type: DataTypes.INTEGER },
      trxStatusId: { type: DataTypes.INTEGER },
      trxDate: { type: DataTypes.DATE },
      trxDueDate: { type: DataTypes.DATE },
      trxRemark: { type: DataTypes.STRING },
    });
    return model
}
  module.exports = transferSchema;