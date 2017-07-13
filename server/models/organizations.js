'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organizations = sequelize.define('Organizations', {
    id:{type:DataTypes.BIGINT, primaryKey: true},
    organization: DataTypes.STRING,
    domen: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Organizations;
};