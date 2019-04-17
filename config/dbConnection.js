const { Pool } = require('pg');

var connPostgres = function(){
    console.log('A conecção com o BD foi estabelecida');
    return new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'estatistica',
        password: '171010231',
        port: 5432
    });
}

module.exports = function(){
    console.log('A conecção com o módulo foi estabelecida');
    return connPostgres;
}