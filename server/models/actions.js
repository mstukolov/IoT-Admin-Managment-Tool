/**
 * Created by MAKS on 03.08.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Actions = sequelize.define('Actions', {
        id:{type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        action: DataTypes.STRING,
        object: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Actions;
};