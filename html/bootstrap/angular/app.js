
angular.module('app', []);
angular.module('app').controller('carroCtrl', function ($scope) {

    $scope.ocorrencias = [];

    $scope.cadastrarZumbi = function (ocorrencia) {
        $scope.ocorrencias.push(angular.copy(ocorrencia));
    };

    $scope.marcas = [
        "Azul",
        "Branco",
        "Prata",
        "Preto",
        "Vermelho"
    ];

    $scope.selected = $scope.marcas[0]; 
});


angular.module('app').directive('ngBlur', function () {
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


