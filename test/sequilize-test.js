/**
 * Created by MAKS on 18.07.2017.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:java@127.0.0.1:3306/smartcooler', {dialect: 'mysql'});
var DataTypes = require('sequelize/lib/data-types');
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

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

const Users = sequelize.define('Users', {
    recid:{type:DataTypes.BIGINT, primaryKey: true},
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    orgid: DataTypes.BIGINT,
    roleid: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
}, {
    classMethods: {
        associate: function(models) {

        }
    }
});

Users.belongsTo(Organizations, {as: 'org'});
/*Organizations.findAll().then(organizations => {
    console.log(organizations)
})*/

Users.findAll(

    {   attributes: ['recid','user', 'orgid'],
        include: [
        {model: Organizations, as: 'org'}
    ]}
).then(users => {
    console.log(users)
})
