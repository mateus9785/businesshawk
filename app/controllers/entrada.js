module.exports.login=function(application,req,res){
    res.render('login/entrada',{entrar : {},teste : {}});
}

module.exports.loginVerifica=function(application,req,res){
    var validar = req.body;

    req.assert('email','Endereço inválido').isEmail();
    req.assert('senha','Senha deve conter entre 8 e 20 caracteres').len(8,20);            

    var erros=req.validationErrors();
    console.log(erros);
    if(erros){
        console.log(erros);
        res.render('login/entrada',{entrar : validar,teste : erros});
        return;
    }

    var connection = application.config.dbConnection();
    var loginModel = new application.app.models.loginM(connection);

    loginModel.fazerlogin(validar, function (error, result) {
        console.log('Saida');
        if(result.rows.length==1){
            res.redirect('/analise');
        }
        else{
            res.render('login/entrada',{entrar : validar, teste : [{msg:'Não está cadastrado no Banco'}]});
        }            
    });
}