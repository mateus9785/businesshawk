var a, b, pontos = [], Xmin = undefined, Xmax = undefined, Y = undefined, Ymax = undefined;

$("#cElem").keypress(function (e) {
  var chr = String.fromCharCode(e.which);
  if ("0123456789.-".indexOf(chr) < 0)
    return false;
});
$("#idx,#idy").keypress(function (e) {
  var chr = String.fromCharCode(e.which);
  if ("0123456789.-".indexOf(chr) < 0)
    return false;
});
$("#cVetor1,#cVetor2").keypress(function (e) {
  var chr = String.fromCharCode(e.which);
  if ("0123456789;.-".indexOf(chr) < 0)
    return false;
});
$("#varios").keypress(function () {
  if ($(this).val().length == 2)
    return false;
});

$("#idx").keyup(function () {
  if (!$("#idx").val())
    return false;
  var x = parseFloat($('#idx').val());
  $('#idy').val(ResolveEquacao(x, false));
});

$("#idy").keyup(function () {
  if (!$("#idy").val())
    return false;
  var y = parseFloat($('#idy').val());
  $('#idx').val(ResolveEquacao(y, true));
});

$("#calcular").click(function () {
  var x = $('#cVetor1').val().split(';');
  var y = $('#cVetor2').val().split(';');
  var xySoma = 0, xSoma = 0, ySoma = 0, x2Soma = 0, y2Soma = 0
  for (var i in x) {
    if (i == 0) {
      Xmin = parseInt(x[i]);
      Xmax = parseInt(x[i]);
      Ymin = parseInt(y[i]);
      Ymax = parseInt(y[i]);
    }
    if (parseInt(x[i]) > Xmax)
      Xmax = parseInt(x[i]);
    if (parseInt(x[i]) < Xmin)
      Xmin = parseInt(x[i]);
    if (parseInt(y[i]) > Ymax)
      Ymax = parseInt(y[i]);
    if (parseInt(y[i]) < Ymin)
      Ymin = parseInt(y[i]);

    pontos.push([parseInt(x[i]), parseInt(y[i])])
    xySoma += parseInt(x[i]) * parseInt(y[i]);
    xSoma += parseInt(x[i]);
    ySoma += parseInt(y[i]);
    x2Soma += Math.pow(parseInt(x[i]), 2);
    y2Soma += Math.pow(parseInt(y[i]), 2);
  }
  var n = x.length;
  var r = ((n * xySoma) - (xSoma * ySoma)) / Math.sqrt((n * x2Soma - Math.pow(xSoma, 2)) * (n * y2Soma - Math.pow(ySoma, 2)));
  if (0.6 < r && r <= 1) {
    console.log('forte' + r);
  }
  else if (0.3 < r && r < 0.6) {
    console.log('fraca' + r);
  }
  else if (0 <= r && r < 0.3) {
    console.log('insignificante' + r);
  }
  else {
    console.log('Há algo errado' + r);
  }
  a = (n * xySoma - xSoma * ySoma) / (n * x2Soma - Math.pow(xSoma, 2));
  b = (ySoma / n) - a * (xSoma / n);
  $('#a').text(a.toFixed(2) + ' * ');
  $('#b').text(' + ' + b.toFixed(2) + ' =  ');
  Reta();
  document.getElementById('formula-dinamica').style.display = "block";
});

function adicionar() {
  if(!validacao("validacaoAdicionar"))
    return;
  var arquivoConteudoCampo;
  if (getRadioValor('tipo') == 'ent1') {
    arquivoConteudoCampo = document.getElementById('cVetor1');
  }
  else {
    arquivoConteudoCampo = document.getElementById('cVetor2');
  }
  var vezes = document.getElementById('varios').value;
  var elemento = document.getElementById('cElem').value;
  for (var i = 0; i < vezes; i++) {
    if (!arquivoConteudoCampo.value) {
      arquivoConteudoCampo.value = elemento;
    } else {
      arquivoConteudoCampo.value += ";" + elemento;
    };
  }
  $('#varios,#cElem').val("");
}

function getRadioValor(name) {
  var rads = document.getElementsByName(name);

  for (var i = 0; i < rads.length; i++) {
    if (rads[i].checked) {
      return rads[i].value;
    }
  }
  return null;
}

function Reta() {
  Highcharts.chart('grafico', {
    xAxis: {
      min: Xmin - 1,
      max: Xmax + 1
    },
    yAxis: {
      min: Ymin,
      max: Ymax
    },
    title: {
      text: 'Gráfico Correlação e Regressão'
    },
    series: [{
      type: 'line',
      name: 'Reta Regressão',
      data: [
        [Xmin, ResolveEquacao(Xmin, false)],
        [Xmax, ResolveEquacao(Xmax, false)]
      ],
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false
    }, {
      type: 'scatter',
      name: 'Pontos',
      data: pontos,
      marker: {
        radius: 4
      }
    }]
  });
}

function ResolveEquacao(variavel, retornaX) {
  if (retornaX) {
    return (variavel - b) / a;
  }
  else {
    return a * variavel + b;
  }
}

function baixar(){
  if(!$("#cVetor1").val() || !$("#cVetor2").val()){
    Mensagem('Não há informação para download','atencao');
    return;
  }
  var texto = $("#cVetor1").val()+"\n"+$("#cVetor2").val();
  download(texto);
}

function carregar(texto){
  var textoValido=texto.split("\n");
  $("#cVetor1").val(textoValido[0]);
  $("#cVetor2").val(textoValido[1]);
}