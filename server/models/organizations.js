'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organizations = sequelize.define('Organizations', {
    id:{type:DataTypes.BIGINT, primaryKey: true},
    organization: DataTypes.STRING,
    parent: DataTypes.BIGINT,
    active: DataTypes.BOOLEAN,
    agreement: DataTypes.STRING,
    agreementDate: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    contact: DataTypes.STRING,
    inventQty:  DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Organizations;
};