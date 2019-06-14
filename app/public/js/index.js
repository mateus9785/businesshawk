// $( document ).ready(function() {
//   var usuario=GetSession("_hawk");
//   if(usuario!=null)
//      window.location.href = "https://businesshawk.herokuapp.com/home";
// });

// $("#nomeCadastro").keypress(function (e) {
//   var chr = String.fromCharCode(e.which);
//   if ("abcdefghijklmnopqrstuvwxyz ".indexOf(chr) < 0)
//     return false;
// });

function cadastrar(){
  // if(validaNome("nomeCadastro"))
  //   return;
  // if(validacaoEmail("emailCadastro"))
  //   return;
  // if(validaSenha("senhaCadastro"))
  //   return;
  // if(validaSenha("repeteSenhaCadastro"))
  //   return;
  // if($("#senhaCadastro").val() != $("#repeteSenhaCadastro").val()){
  //   Mensagem("As senhas devem ser iguais","atencao");
  //   return;
  // }
  // var model = GetCookie();
  // for(var i=0;i<model.length;i++){
  //   if(model[i].email == $("#emailCadastro").val()){
  //     Mensagem("Esse Email já foi cadastrado","atencao");
  //     return;
  //   }
  // }
  // var dadosUsuario={
  //   "nome":$("#nomeCadastro").val(),
  //   "email":$("#emailCadastro").val(),
  //   "senha":$("#senhaCadastro").val(),
  //   "manter": false
  // }
  // AddCookie("_hawk",dadosUsuario);
  // $("[aria-label='Fechar']").trigger("click");
}

function logar(){
  // if(validacaoEmail("emailLogin"))
  //   return;
  // if(validaSenha("senhaLogin"))
  //   return;
  // var model = GetCookie();
  // console.log(model);
  // for(var i=0;i<model.length;i++){
  //   if(model[i].senha == $("#senhaLogin").val() && model[i].email == $("#emailLogin").val()){
  //     sessionStorage.setItem('usuario',model[i].nome);
  //     if($("#manterlogado:checked").length == 1){
  //       model[i].manter = true;
  //       SetCookie("_hawk",model);
  //     }
  //     break;
  //   }
  //   if(i==model.length-1){
  //     Mensagem("Email ou senha incorreta","atencao");
  //     return;
  //   }
  // }
  document.getElementById('formLogin').submit();
}