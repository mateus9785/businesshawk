function Mensagem(mensagem,tipo){
    switch (tipo) {
        case 'erro':
            $("#mensagens").append("<div class='mensagem alert alert-danger'>"+mensagem+"</div>")
            break;
        case 'sucesso':
            $("#mensagens").append("<div class='mensagem alert alert-success'>"+mensagem+"</div>")
            break;
        case 'atencao':
            $("#mensagens").append("<div class='mensagem alert alert-warning'>"+mensagem+"</div>")
    }
    setTimeout(function () {
        $('.mensagem').first().remove();
    }, 3500);
}

function validacao(atributo){
    var erros = true;
    $("["+atributo+"]").each(function() {
        if(!this.value){
            $(this).css('border-color','red');
            Mensagem($(this).attr(atributo),'atencao');
            erros = false;
            return;
        }   
        else{
            $(this).css('border-color','');
        }
    });
    return erros ? true : false;
}

function Encripta(dados){
    var mensagem="",l,ch,
    textoCompr=dados.length;
	ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
	for (var i=0,j=1;i<textoCompr; i++,j++){
		l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j==50)
			j=1;
		if (l>255)
			l-=256;
		mensagem+=(Caracter(l));
	}
    return mensagem;
}

function Descripta(dados){
	var mensagem="",l,ch;
	ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
	for (var i=0,j=1; i<dados.length;i++,j++){
		l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50)
			j=1;
		if (l<0)
			l+=256;
		mensagem+=(Caracter(l));
	}	
	return mensagem;
}
function Asc(String){
	return String.charCodeAt(0);
}
function Caracter(AsciiNum){
	return String.fromCharCode(AsciiNum)
}
function SetSession(nomeSession,model){
    sessionStorage.setItem(nomeSession, JSON.stringify(model));
}
function GetSession(nomeSession){
    if(sessionStorage[nomeSession]!=undefined)
        return JSON.parse(sessionStorage[nomeSession]);
    return null;
}
function SetCookie(){

}
function GetCookie(){

}