module.exports=function(application){

    application.get('/login', function(req, res){

        // var connection=application.config.dbConnection();
        // var registrarModel=application.app.models.registrarModel;

        // registrarModel.getRegistrar(connection,function(error,result){

        // });
        res.render('login/entrada');
    });
}