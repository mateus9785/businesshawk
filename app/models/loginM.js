function loginM(connection){
    this._connection=connection;
}

loginM.prototype.fazerlogin=function(entrada,callback){
    this._connection.query('SELECT email,senha FROM usuario WHERE email = $1 AND senha = $2',
    [entrada.email,entrada.senha],function (err, data) {
            console.log(data.rows);
            if(err) {
                console.log('err:', err);
                return callback(err, data);
            }
            callback(null, data);
        });
}

module.exports = function(){
    return loginM;
}