
angular.module('route', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/index.html', {             // http://localhost:3000/api/
                templateUrl: 'view/indexTest.html',
                controller: 'routeCtrl',
                controllerAs: 'routeCtrl'
            }) // FIM .when('/')

            .when('/carros.html', {             // http://localhost:3000/api/carro/
                templateUrl: 'view/carroCadastrar.html',
                controller: 'routeCtrl',
                controlerAs: 'routeCtrl'
            }) // FIM .when('/carros.html')

            .otherwise({
                redirecTo: '/index'
            });
    }); // FIM .config(function($routeProvider)





