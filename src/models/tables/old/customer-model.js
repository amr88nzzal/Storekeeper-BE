'use strict';

const customerSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('customers', {
      customerName: { type: DataTypes.STRING, allowNull: false },
      customerLocationId: { type: DataTypes.INTEGER  }, 
      customerGPS: { type: DataTypes.STRING },
      customerPhone: { type: DataTypes.STRING },
      customerUserId: { type: DataTypes.INTEGER },
      customerPerson: { type: DataTypes.STRING },
      customerCategoryId: { type: DataTypes.INTEGER  },  
      customerRemark: { type: DataTypes.STRING },
      customerIsActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    });
    return model
}
  module.exports = customerSchema;