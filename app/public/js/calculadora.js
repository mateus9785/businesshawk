var valores=GetSession("ResultadoCalculos");
if(valores!=null){
  var calculo = document.getElementById('calculos');
  var paragrafo;
  for (var key in valores) {
      paragrafo = document.createElement('p');
      calculo.appendChild(paragrafo);
      paragrafo.innerText = key + " : " + valores[key];
  }
}

var app = angular.module('myApp', []);
app.controller('myCtrl1', function($scope) {
  $scope.a=0;
  $scope.b=0;
  $scope.maior=0;
  $scope.menor=0;
  $scope.maiorEnt=0;
  $scope.menorEnt=0;
  $scope.desvio = function() {
    return (((($scope.b-$scope.a)**2)/12)**0.5).toFixed(2);
  };
});

app.controller('myCtrl2', function($scope) {
  $scope.n=0;
  $scope.p=0;
  $scope.q=0;
  $scope.menor=1;
  $scope.maior=10;
  $scope.resultadoProbabilidade = function() {
    return BinomialSomaResultados($scope.n,$scope.p,$scope.q,$scope.menor,$scope.maior)
  };
});

app.controller('myCtrl3', function($scope) {
  $scope.med=0;
  $scope.dp=1;
  $scope.maior=0;
  $scope.menor=0;
  $scope.maiorEnt=1;
  $scope.menorEnt=0.5;
  $scope.probabilidade1 = function(variavel) {
    return tipo1(mudaNormal(variavel,$scope.med,$scope.dp));
  };
  $scope.probabilidade2 = function(menor,maior) {
    return tipoGrafico(mudaNormal(menor,$scope.med,$scope.dp),mudaNormal(maior,$scope.med,$scope.dp));
  };
});
