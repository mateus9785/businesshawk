var position = false;
function toggleSidemenu() {
    var sidemenu = document.getElementById("sidemenu");

    if (position == false) {
        sidemenu.style.transform = "translateX(40px)"
        position = true;

    } else {
        sidemenu.style.transform = "translateX(-30px)"
        position = false;
    }
}

$("[href='/']").click(function(){
    sessionStorage.clear();
});

// $( document ).ready(function() {
//     var nome=sessionStorage.getItem("usuario");
//     if(nome==null)
//         window.location.href = "https://businesshawk.herokuapp.com";
//     $(".BoasVindas").html(`Olá, ${nome}`);
//     $("#agradecer").html(`Seja Bem Vindo, ${nome}`);
//   });