function registrarM(connection){
    this._connection=connection;
}

registrarM.prototype.getRegistrar=function(callback){
    this._connection.query('select * from usuario',callback);
}

registrarM.prototype.salvarRegistrar=function(cadastrando,callback){
    console.log(cadastrando);
    this._connection.query('INSERT INTO usuario(nome,email,nascimento,senha) VALUES($1, $2, $3, $4)',
        [   
            cadastrando.nome,
            cadastrando.email,
            cadastrando.nascimento,
            cadastrando.senha
        ],function (err, data) {
            if(err) {
                console.log('err:', err);
                return callback(err, data);
            }

            callback(null, data);
        });
}

module.exports = function(){
    return registrarM;
}