/**
 * Created by MAKS on 06.07.2017.
 */
'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path')

// Set up the express app
const app = express();

const organization = require(__dirname + '/server/controllers/orgController');
const usersController = require(__dirname + '/server/controllers/usersController');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/views'))

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

//routing to main views
app.get('/organizations', function (req, res, next) {
    organization.list(req, res)
});
app.get('/users', function (req, res, next) {
    usersController.list(req, res)
});
app.get('/roles', function (req, res, next) {
    res.render('roles')
});
app.get('/roots', function (req, res, next) {
    res.render('roots')
});
//---------------Routing for Organization Controller--------------------------------------
app.get('/createNewOrganization', function (req, res, next) {
    organization.create(req, res)
});
app.get('/updateOrganization', function (req, res, next) {
    organization.update(req, res)
});
app.get('/deleteOrganization', function (req, res, next) {
    organization.destroy(req, res)
});
app.get('/findOrganization', function (req, res, next) {
    organization.retrieve(req, res)
});

app.get('/getAllOrganizations', function (req, res, next) {
    organization.list(req, res)
});
app.get('/getLookupOrganizations', function (req, res, next) {
    organization.listRaw(req, res)
});

app.get('/blockOrganization', function (req, res, next) {
    organization.update(req, res)
});
//------------Routing for userController---------------------
app.get('/createUser', function (req, res, next) {
    usersController.create(req, res)
});
app.get('/updateUser', function (req, res, next) {
    usersController.update(req, res)
});
app.get('/deleteUser', function (req, res, next) {
    usersController.destroy(req, res)
});
app.get('/findUser', function (req, res, next) {
    usersController.retrieve(req, res)
});

app.get('/getAllUsers', function (req, res, next) {
    usersController.list(req, res)
});
//------------------------------------------------------------
module.exports = app;
