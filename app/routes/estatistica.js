module.exports=function(application){
    application.get('/analise', function(req, res){
        res.render('analise/estatistica');
    });
}