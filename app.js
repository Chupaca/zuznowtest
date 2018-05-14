'use strict'


/**
 * Module dependencies.
 */

var express = require('express');
var serveStatic = require('serve-static')
var engine = require('ejs-mate');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var http = require('http');
var path = require('path');


var app = express();



app.use(function (req, res, next) {
    res.setTimeout(10000);
    next();
});

app.use(function (req, res, next) {
    if (req.url.search("jquery|fonts|uikit|printhis|images|pdf|addons") > -1) {
        //86400000=one day
        res.setHeader("Cache-Control", "public, max-age=86400000");
    }
    return next();
});

app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));


app.use(methodOverride());
app.use(cookieParser());

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'public')));


function parseController(req, res, next) {
    var split = req.url.split("/");
    res.locals.controller = split.length > 1 ? split[1] : "index";
    res.locals.action = split.length > 2 ? split[2] : "index";
    next();
};



app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (err.stack) {
        console.error(err.stack);
    }
    else {
        console.error(err);
    }

    res.status(500);
    res.send('500: Internal server error');
});

app.use("/category", require("./routes/category"))
app.use("/language", require("./routes/languages"))
app.use("/actor", require("./routes/actors"))
app.use("/videostore", require("./routes/videostore"))
app.use("/", require("./routes/startpage"));




http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


process.on('uncaughtException', function (error) {
    //console.log(chalk.red(error));
    if (error.stack) {
        console.error(error.stack);
    }
    else {
        console.error(error);
    }
});

process.on('unhandledRejection', function (reason, p) {
    if (reason.stack) {
        console.error(reason.stack);
    }
    else {
        console.error(reason);
    }
});
