module.exports=function(application){
    application.get('/home', function(req, res){
        res.render('home/home');
    });
}