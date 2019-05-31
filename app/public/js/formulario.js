function coloca(){
    var nome=document.getElementById('cNome').value;
    var tipo=document.getElementById('tipo').value;
    switch (tipo) {
        case "texto":
            criaTexto(nome);
            break;
        case "numeros":
          break;
        case "select":
            break;
        case "radio":
          break;
        case "data":
          break;
        case "check":
          break;
        case "range":
          }
}

function criaTexto(nome){
    var paragrafo = document.createElement("P");
    paragrafo.value=nome;
    var input = document.createElement("INPUT");
    input.type = "text";
    var formulario = document.getElementById("formulario");
    formulario.appendChild(paragrafo);
    formulario.appendChild(input);
}