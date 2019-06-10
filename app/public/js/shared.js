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