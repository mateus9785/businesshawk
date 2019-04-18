var nodemailer = require('../../modulos/email.js');

module.exports.cadastro=function(application,req,res){
    res.render('cadastro/registrar', {validacao : {},cadastro : {}});
}

module.exports.cadastroConcluido=function(application,req,res){
    res.render('cadastro/concluido');
}

module.exports.cadastroSalvar=function(application,req,res){
    var cadastrando = req.body;

    req.assert('nome','Nome é Obrigatório').notEmpty();
    req.assert('email','Email é Obrigatório').notEmpty();
    req.assert('email','Endereço inválido').isEmail();
    req.assert('nascimento','Nascimento é Obrigatório').notEmpty().isDate({format:'YYYY-MM-DD'});
    req.assert('senha','Senha é Obrigatório').notEmpty();
    req.assert('senha','Senha deve conter entre 8 e 20 caracteres').len(8,20);            

    var erros=req.validationErrors();
    console.log(erros);
    if(erros){
        console.log(erros);
        res.render('cadastro/registrar',{validacao : erros, cadastro : cadastrando});
        return;
    }

    var connection = application.config.dbConnection();
    var registrarModel = new application.app.models.registrarM(connection);

    registrarModel.verificaRegistrar(cadastrando, function (error, result) {
        console.log('entrei');
        console.log(result.rows);
        if(result.rows.length==1){
            console.log('entrei');
            res.render('cadastro/registrar',{validacao : [{msg:'Email já está cadastradoe'}], cadastro : cadastrando});
            return;
        }
        console.log('sai');
        registrarModel.salvarRegistrar(cadastrando, function (error, result) {
         // nodemailer(cadastrando);
        res.redirect('/cadastro/concluido');
     });
    });

    
}