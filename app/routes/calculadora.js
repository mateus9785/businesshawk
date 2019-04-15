module.exports=function(application){

    application.get('/probabilidade', function(req, res){
        // var connection=application.config.dbConnection();
        // var registrarModel=application.app.models.registrarModel;

        // registrarModel.getRegistrar(connection,function(error,result){
        //     console.log(result);
        //     res.send(result);
        // });
        res.render('probabilidade/calculadora');
    });
}