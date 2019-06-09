function Mensagem(mensagem,tipo){
    switch (tipo) {
        case 'erro':
            $("#mensagens").append("<div class='mensagem alert alert-danger'>"+mensagem+"</div>")
            break;
        case 'sucesso':
            $("#mensagens").append("<div class='mensagem alert alert-warning'>"+mensagem+"</div>")
            break;
        case 'atencao':
            $("#mensagens").append("<div class='mensagem alert alert-success'>"+mensagem+"</div>")
    }
    setTimeout(function () {
        $('.mensagem').first().remove();
    }, 2500);
}