module.exports=function(application){
    application.get('/about', function(req, res){
        res.render('about/about');
    });
}