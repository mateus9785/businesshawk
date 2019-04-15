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


// var Client=require('pg').Client;
 
// const client = new Client({
//         host : process.env.PGHOST || "ec2-50-19-127-115.compute-1.amazonaws.com",
//         user : process.env.PGUSER || "hosvkwkbrddrcp",
//         password : process.env.PGPASSWORD || "3fa65a5c58f711e14894ca31ce3a7ec9641b7321761091ba707a36c01d5fb28a",
//         database : process.env.PGDATABASE || "d72g724h506vhi"
//     });

// client.connect()
// .then(() => { console.log('connected')})
// .catch((err) => {console.log(err)});