var a,b;
$("#calcular").click(function(){
  var x = $('#cVetor1').val().split(';');
  var y = $('#cVetor2').val().split(';');
  var xySoma = 0,xSoma = 0,ySoma = 0,x2Soma = 0,y2Soma = 0
  for(var i in x){
    xySoma +=parseInt(x[i])*parseInt(y[i]);
    xSoma += parseInt(x[i]);
    ySoma += parseInt(y[i]);
    x2Soma += Math.pow(parseInt(x[i]),2);
    y2Soma += Math.pow(parseInt(y[i]),2);
  }
  var n = x.length;
  var r = ((n*xySoma)-(xSoma*ySoma))/Math.sqrt((n*x2Soma-Math.pow(xSoma,2))*(n*y2Soma-Math.pow(ySoma,2)));
  if(0.6<r && r<=1){
    console.log('forte'+r);
  }
  else if (0.3<r && r<0.6){
    console.log('fraca'+r);
  }
  else if (0<=r && r<0.3){
    console.log('insignificante'+r);
  }
  else{
    console.log('Há algo errado'+r);
  }
  a = (n*xySoma-xSoma*ySoma)/(n*x2Soma-Math.pow(xSoma,2));
  b = (ySoma/n)-a*(xSoma/n);
});
$("#idx").change(function(){
  var x = $('#idx').val();
  $('#idy').val(a*x+b)
});
$("#idy").change(function(){
  var y = $('#idy').val();
  $('#idx').val((y-b)/a)
});

function adicionar(){
  var arquivoConteudoCampo;
  if(getRadioValor('tipo')=='ent1'){
    arquivoConteudoCampo = document.getElementById('cVetor1');
  }
  else{
    arquivoConteudoCampo = document.getElementById('cVetor2');
  }
   
  var vezes=document.getElementById('varios').value;
  var elemento=document.getElementById('cElem').value;
  if(vezes==""){
      alert('Por favor, digite o numero de vezes');
      document.getElementById('varios').focus();
  }
  else if(elemento==""){
      alert('Por favor, digite o elemento');
      document.getElementById('cElem').focus();
  }
  else{
      for(var i=0;i<vezes;i++){
          if(arquivoConteudoCampo.value==''){
              arquivoConteudoCampo.value=elemento;
          }else{
              arquivoConteudoCampo.value+=";"+elemento;
          };
      }
      document.getElementById('varios').value="";
      document.getElementById('cElem').value="";
  }
}

function getRadioValor(name){
  var rads = document.getElementsByName(name);
   
  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
    return rads[i].value;
   }
  }
  return null;
}

//UPLOAD
window.onload = function () {
  //Check the support for the File API support
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      var fileSelected = document.getElementById('cAutomatico');
      fileSelected.addEventListener('change', function (e) {
          //Set the extension for the file
          
          //Get the file object
          var fivarobeRead = fileSelected.files[0];
          //Check of the extension match
           
           var fileExtension = fivarobeRead.name.split(".");
           fileExtension=fileExtension.pop();
           
          if (fileExtension=="txt" || fileExtension=="csv") {
              //Initialize the FileReader object to read the 2file
              var fileReader = new FileReader();
              fileReader.onload = function (e) {
                  var entradas= fileReader.result.split("\n");
                  $('#cVetor1').val(entradas[0]);
                  $('#cVetor2').val(entradas[1]);
              }
              fileReader.readAsText(fivarobeRead);
          }
          else {
              alert("Por favor selecione arquivo texto");
          }

      }, false);
  }
  else {
      alert("Arquivo(s) não suportado(s)");
  }
}

function baixar(){
  var content=$('#cVetor1').val()+'\n'+$('#cVetor2').val();
  if(content==""){
      alert('Por favor, entre com as informações');
      document.getElementById('cVetor1').focus();
      return;
  }
  else{
      var filename=prompt("Digite o nome do arquivo");
      if(filename==""){
        alert('Por favor, entre com o nome');
        return;
    }
      var a = document.createElement('a');
      var blob = new Blob([content], {'type':"csv"});
      a.href = window.URL.createObjectURL(blob);
      a.download = filename+".csv";
      a.click();
  }
}