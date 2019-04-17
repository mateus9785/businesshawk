var express = require('express');
var consign=require('consign');//faz as rotas a partir dos diretorios
var bodyParser=require('body-parser');
var expressValidator=require('express-validator');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
//express.static informa o local de todos os arquivos estaticos
app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(app);

module.exports = app;