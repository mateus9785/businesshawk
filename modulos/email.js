var nodemailer = require('nodemailer');

module.exports=function(cadastrando){
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'mateusoliveira9785@outlook.com',
            pass: 'camila41'
        }
    });

    var mailOptions = {
        from: 'mateusoliveira9785@outlook.com',
        to: cadastrando.email,
        subject: 'Bussiness Hawk - Confirmação de Cadastro',
        text: 'Seu cadastro foi efetuado com sucesso,click no link abaixo para habilitar sua conta http://localhost:3001/analise'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
