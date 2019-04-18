module.exports=function(application){

    application.get('/login', function(req, res){
        application.app.controllers.entrada.login(application,req,res);
    });

    application.post('/login/verifica', function (req, res) {
        application.app.controllers.entrada.loginVerifica(application,req,res);
    })
}