

var express = require('express'),
bodyParser = require('body-parser'),
multiParty = require('connect-multiparty'),
fs = require('fs'),
cors = require('cors');
ObjectID = require('mongodb').ObjectId,
consign = require('consign');


var app = express();




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));
app.use(multiParty());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Acess-Control-Allow-Headers", "content-type");
    res.setHeader("Acess-Control-Allow-Credentials", true);
    
    next();
});

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

var connection = app.config.dbConnection();



module.exports = app;