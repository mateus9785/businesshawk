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
  if(0.6<r && r<1){
    console.log('forte');
  }
  else if (0.3<r && r<0.6){
    console.log('fraca');
  }
  else if (0<r && r<0.3){
    console.log('insignificante');
  }
  else{
    console.log('Há algo errado');
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