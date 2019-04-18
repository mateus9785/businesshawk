var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
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