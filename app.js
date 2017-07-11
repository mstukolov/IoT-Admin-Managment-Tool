/**
 * Created by MAKS on 06.07.2017.
 */
'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

const organization = require(__dirname + '/server/controllers/orgController');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

app.get('/hello', (req, res) => res.status(200).send({
    message: 'Hello from NodeJS and MAKS',
}));

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

module.exports = app;
