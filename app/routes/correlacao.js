module.exports=function(application){
    application.get('/regressao', function(req, res){
        res.render('regressao/correlacao');
    });
}