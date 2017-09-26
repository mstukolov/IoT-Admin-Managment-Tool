/**
 * Created by MAKS on 11.08.2017.
 */
var Sequelize = require('sequelize');
var sequelize =
    new Sequelize('mysql://admin:OPSGTCFHRBHCWYOV@sl-us-south-1-portal.4.dblayer.com:19500/compose', {dialect: 'mysql'});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelize.query('CALL tmpLoad(NULL);').then(function(response){
    console.log('Success: ' + response);
}).error(function(err){
    console.log('Fail: ' + response);
});