



// Validação dos Campos Input 
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












// Função para personalizar input de Valor do Veículo (1000,00)
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
            }; // FIM var _formatValorCarro
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatValorCarro(ctrl.$viewValue));
                ctrl.$render();
            }); // FIM element.bind("keyup" ...
        } // FIM Link
    }; // FIM RETURN
});// FIM angular.module('app').directive('validarValor' ...
