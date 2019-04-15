var mysql=require('mysql');
 
var connMysql = function(){
    console.log('A conecção com o BD foi estabelecida');
    return mysql.createConnection({
        host : 'mysql995.umbler.com:41890',
        user : 'mateus9785',
        password : 'fatec123',
        database : 'estatistica9785',
    });
}

module.exports = function(){
    console.log('A conecção com o módulo foi estabelecida');
    return connMysql;
}
