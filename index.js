var app=require('./config/server');//chama módulo server que retorna APP
var port = process.env.PORT || 3000
app.listen(port,function(){
    console.log('Servidor ON');
});