module.exports=function(application){
    application.get('/pesquisa', function(req, res){
        res.render('pesquisa/formulario');
    });
}