var app=require('./config/server');//chama módulo server que retorna APP

app.listen(5000,function(){
    console.log('Servidor ON');
});