/**
 * Created by MAKS on 03.08.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Action_accessroles = sequelize.define('Action_accessroles', {
        id:{type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        roleid: DataTypes.BIGINT,
        actionid: DataTypes.BIGINT
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Action_accessroles;
};