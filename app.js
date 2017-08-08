/**
 * Created by MAKS on 06.07.2017.
 */
'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path')
var moment = require('moment');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Set up the express app
const app = express();


function checkAuth (req, res, next) {
    //console.log('checkAuth ' + req.url);

    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if (req.url === '/organizations' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }
    /*if (req.url === '/users' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }*/
    if (req.url === '/roles' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }
    if (req.url === '/devices' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }
    if (req.url === '/available-monitor' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }

    next();
}

//Auth app setup


app.use(checkAuth);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

//------------------------------------


    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('view options', { layout: false });
    app.use(express.static(__dirname + '/views'))



//Фильтры EJS
app.locals.setCurrentDateFormat = function(date) {
    return moment(new Date(date), 'DD.MM.YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm');
}

require('./routes.js')(app);

module.exports = app;
