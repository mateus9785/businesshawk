module.exports=function(application){
    application.get('/analise', function(req, res){
        // var connection=application.config.dbConnection();
        // var registrarModel=application.app.models.registrarModel;

        // registrarModel.getRegistrar(connection,function(error,result){
        //     console.log(result);
        //     res.send(result);
        // });
        res.render('analise/estatistica');
    });
}