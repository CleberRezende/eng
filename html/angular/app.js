
angular.module('app', ['ngMessages']);

angular.module('app').controller('carroCtrl', carroCtrl);
carroCtrl.$inject = ['$scope'];

angular.module('app').controller('apiHttpCtrl', apiHttpCtrl);
// apiHttp.$inject = ['$scope'];

function carroCtrl($scope) {

// Opções de Cores do Carro
    $scope.cores = [
        "Azul",
        "Branco",
        "Prata",
        "Preto",
        "Vermelho"
    ];

// Opções de Marcas de Carro
    $scope.marcas = [
        "Chevrolet",
        "Fiat",
        "Ford",
        "Honda",
        "Volkswagen"
    ];

// Opções de Opcionais de Carro
    $scope.opcionaisCarro = [
        "Ar Condicionado",
        "Alarme",
        "Vidro Elétrico",
        "Trava",
        "Roda Liga",
        "Farol de Milha",
        "Banco de Couro",
        "Freio Abs",
        "Automático",
        "Mecânico",
        "Opcional 01",
        "Opcional 02"
    ];

// Opções de Ano de Carro
    $scope.anoVeiculo = [];
    $scope.calcularAnoVeiculo = function () {
        var ano = 2000;
        var hoje = new Date();
        var anoAtual = hoje.getFullYear();
        for (i = ano; i <= anoAtual; i++) {
            $scope.anoVeiculo.push(angular.copy(i));
        }
    };
    $scope.calcularAnoVeiculo();
} // carroCtrl($scope)


function apiHttpCtrl($http){
    var api = this;
    const url = 'http://localhost:3000/api/cadastrar-carro' + carro;
    const method = 'POST';
    $http({
        url: url,
        method: method 
    })

    .success(function(data){
        console.log('Dados: ' + data);
    })

    .error(function(err){
        console.log('Erro: ' + err);
    })

} // apiHttpCtrl($http)

