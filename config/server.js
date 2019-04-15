var express = require('express');
var consign=require('consign');//faz as rotas a partir dos diretorios
var bodyParser=require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended:true}));

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(app);

module.exports = app;