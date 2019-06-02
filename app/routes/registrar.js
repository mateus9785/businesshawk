module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        application.app.controllers.registrar.cadastro(application,req,res);
    });

    application.get('/cadastro/concluido', function (req, res) {
        application.app.controllers.registrar.cadastroConcluido(application,req,res);
    });

    application.post('/cadastro/salvar', function (req, res) {
        application.app.controllers.registrar.cadastroSalvar(application,req,res);
    });
}
