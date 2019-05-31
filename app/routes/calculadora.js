module.exports=function(application){
    application.get('/probabilidade', function(req, res){
        res.render('probabilidade/calculadora');
    });
}