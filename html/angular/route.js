
angular.module('route', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/index.html', {
                templateUrl: 'view/indexTest.html',
                controller: 'routeCtrl',
                controllerAs: 'routeCtrl'
            }) // FIM .when('/')

            .when('/carros.html',{
                templateUrl: 'view/carroCadastrar.html',
                controller: 'routeCtrl',
                controlerAs: 'routeCtrl'
            }) // FIM .when('/carros.html')

            .otherwise({
                redirecTo: '/index'
            });
    }); // FIM .config(function($routeProvider)
