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

// Set up the express app
const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
    }
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
