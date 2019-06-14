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
//VALIDACAO
function validacao(idForm){
    var erro = false;
    if(idForm[0]!="#"){
        idForm="#"+idForm;
    }
    $(idForm+" .validacao").each(function() {
        if(!$(this).val()){
            $(this).css('border-color','red');
            Mensagem("Há campos obrigatório que não foram preenchidos",'atencao');
            erro = true;
            return;
        }
        else{
            $(this).css('border-color','');
        }
    });
    return erro? true : false;
}

function validaUpload(entrada){
    var elementos=entrada.split(";");
    if(!isNaN(elementos.first)){
        if(elementos.forEach(isNaN)){
            Mensagem("Não é possível entrar com números e palavras simultaneamente");
            return false;
        }
    }
    return true;
}

function retiraVazios(elementos){
    var compr = elementos.length;
    for(var i=0;i<compr;i++)
        if(elementos[i]=="")
            elementos=elementos.splice(i,1);
    return elementos;
}

function validacaoEmail(idEmail) {
    if(idEmail[0]!="#")
        idEmail="#"+idEmail;
    var email = $(idEmail).val();
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(email)){
        Mensagem("Seu email está inválido","atencao");
        $(idEmail).css('border-color','red');
        return true;
    }
    $(idEmail).css('border-color','green');
    return false;
}

function validaSenha(idSenha){
    if(idSenha[0]!="#")
        idSenha="#"+idSenha;
    var senha = $(idSenha).val();
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(!regex.test(senha)){
        Mensagem("Sua senha deve conter 8 caracteres sendo no mínimo um especial,número e letra maiúscula","atencao");
        $(idSenha).css('border-color','red');
        return true;
    }
    $(idSenha).css('border-color','green');
    return false ;
}

function validaNome(idNome){
    if(idNome[0]!="#")
        idNome="#"+idNome;
    var nome = $(idNome).val();
    regex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if(!regex.test(nome)){
        Mensagem("Digite seu nome completo","atencao");
        $(idNome).css('border-color','red');
        return true;
    }
    $(idNome).css('border-color','green');
    return false ;
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
function SetCookie(nome,model){
    document.cookie = nome+"="+Encripta(JSON.stringify(model));
}

function AddCookie(nome,model){
    var dados=GetCookie();
    dados.push(model);
    document.cookie = nome+"="+Encripta(JSON.stringify(dados));
}
function GetCookie(){
    var cookie = document.cookie;
    if(!cookie)
        return [];
    dadosEncrip = cookie.split("=")[1];
    return JSON.parse(Descripta(dadosEncrip));
}