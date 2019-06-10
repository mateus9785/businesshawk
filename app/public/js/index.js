$( document ).ready(function() {
  var usuario=GetSession("_hawk");
  if(usuario!=null)
     window.location.href = "https://businesshawk.herokuapp.com/home";
});

function cadastrar(){
    if(!validacao("validacaoCadastro"))
      return;
}

function logar(){
  if(!validacao("validacaoLogin"))
    return;
  if($("#manterlogado:checked").length == 1){
    var dados=$("#emailLogin").val()+";"+$("#senhaLogin").val();
    document.cookie = "_hawk="+Encripta(dados);
  }
  sessionStorage.setItem('usuario',$("#emailLogin").val());
  document.getElementById('loginForm').submit();
}