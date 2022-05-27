'use strict';

const transactionSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('transactions', {
      trxId: { type: DataTypes.INTEGER, unique: true },
      trxUserId: { type: DataTypes.INTEGER },
      trxCustomerId: { type: DataTypes.INTEGER },
      trxLocationId: { type: DataTypes.INTEGER  }, 
      trxGPS: { type: DataTypes.STRING },
      trxStartDate: { type: DataTypes.DATE },
      trxEndDate: { type: DataTypes.DATE },
      trxRemark: { type: DataTypes.STRING },
      trxHasSales: { type: DataTypes.BOOLEAN, defaultValue: false },
      trxSalesNum: { type: DataTypes.STRING },
      trxHasReturn: { type: DataTypes.BOOLEAN, defaultValue: false },
      trxReturnNum: { type: DataTypes.STRING },
      trxHasReceipts: { type: DataTypes.BOOLEAN, defaultValue: false },
      trxReceiptsNum: { type: DataTypes.STRING },
      trxIsVisit: { type: DataTypes.BOOLEAN, defaultValue: false },
      trxIsExchange: { type: DataTypes.BOOLEAN, defaultValue: false },
    });
    return model
}
  module.exports = transactionSchema;