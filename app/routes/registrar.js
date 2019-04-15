var nodemailer = require('../../modulos/email.js');

module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        res.render('cadastro/registrar');
    });

    application.get('/cadastro/concluido', function (req, res) {
        res.render('cadastro/concluido');
    });

    application.post('/cadastro/salvar', function (req, res) {
        var cadastrando = req.body;

        var connection = application.config.dbConnection();
        var registrarModel = application.app.models.registrarModel;

        registrarModel.salvarRegistrar(cadastrando, connection, function (error, result) {
            nodemailer(cadastrando);
            res.redirect('/cadastro/concluido');
        });
    });
}
