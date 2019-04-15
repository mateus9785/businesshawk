module.exports = function(){
    this.getRegistrar = function(connection,callback){
        connection.query('select * from usuario',callback);
    }

    this.salvarRegistrar = function(cadastrando,connection,callback){
        console.log(cadastrando);
        connection.query('insert into usuario set ?',cadastrando,callback);
    }
    return this;
}