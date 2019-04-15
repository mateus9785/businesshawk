var mysql=require('mysql');
 
var connMysql = function(){
    console.log('A conecção com o BD foi estabelecida');
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'estatistica',
    });
}

module.exports = function(){
    console.log('A conecção com o módulo foi estabelecida');
    return connMysql;
}
