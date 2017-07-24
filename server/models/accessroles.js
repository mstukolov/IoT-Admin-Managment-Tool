/**
 * Created by MAKS on 24.07.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Accessroles = sequelize.define('Accessroles', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        role: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Accessroles;
};