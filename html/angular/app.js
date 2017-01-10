
angular.module('app', ['ngMessages', 'ngRoute']);

angular.module('app').controller('carroCtrl', carroCtrl);


carroCtrl.$inject = ['$scope'];

function carroCtrl($scope) {

    $scope.ocorrencias = [];

    $scope.urls = [
        { url: 'view/index.html' },
        { url: 'view/footer.html' }
    ];


    $scope.cadastrarZumbi = function (ocorrencia) {
        $scope.ocorrencias.push(angular.copy(ocorrencia));
    };

    $scope.cores = [
        "Azul",
        "Branco",
        "Prata",
        "Preto",
        "Vermelho"
    ];

    $scope.marcas = [
        "Chevrolet",
        "Fiat",
        "Ford",
        "Honda",
        "Volkswagen"
    ];

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


    $scope.anoVeiculo = [];

    $scope.calcularAnoVeiculo = function () {
        var ano = 2000;
        var hoje = new Date();
        var anoAtual = hoje.getFullYear();
        for (i = ano; i <= anoAtual; i++) {
            // if (ano <= anoAtual) {
            $scope.anoVeiculo.push(angular.copy(i));
            // }
        }

    };

    $scope.calcularAnoVeiculo();

}


angular.module('app').directive('appBlur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $element.on('blur', function () {
                if (ngModel.$invalid && ngModel.$dirty) {
                    $element.addClass('error');
                }
                else {
                    $element.removeClass('error');
                }
            }); // FIM $element.on
        } // FIM Link
    }; // FIM RETURN
}); // FIM angular.module('app').directive('ngBlur' ...



angular.module('app').directive('validarValor', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            var _formatValorCarro = function (valor) {
                if (valor.length > 2) {
                    var valorFormatado = valor.replace(",", "");
                    total = valor.length;
                    final = total - 3;
                    console.log("final" + final);
                    resultado = (valorFormatado.substring(0, final) + "," + valorFormatado.substring(final, total));
                    return resultado;
                }
                else {
                    return valor;
                }
            };

            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatValorCarro(ctrl.$viewValue));
                ctrl.$render();
            });

        } // FIM Link
    }; // FIM RETURN
});// FIM angular.module('app').directive('validarValor' ...



