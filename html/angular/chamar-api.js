
// function carregarContasReceber() {
//     $http({
//         method: 'GET',
//         url: 'http://localhost:3000/api/contasReceber'
//     }).then(function successCallback(response) {
//         $scope.recebimentos = response.data.contas;
//     }, function errorCallback(error) {
//         console.log('Error carregar contas receber' + error)
//     });
// }

function cadastrarCarro($http){
    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/carro/'
    })
    .then(function successCallback(response){
        console.log('Página cadastrar carro: - ' + response);
    }, // FIM .then successCallback
    function errorCallback(error){
        console.log('Erro ao carregar página cadastrar carro');
    }); // FIM errorCallback
    // FIM $http
}











function listarCarro($http){
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/carro/'
    })
    .then(function successCallback(response){
        console.log('Página cadastrar carro: - ' + response);
    }, // FIM .then successCallback
    function errorCallback(error){
        console.log('Erro ao carregar página cadastrar carro');
    }); // FIM errorCallback
    // FIM $http
}











function editarCarro($http){
    $http({
        method: 'PUT',
        url: 'http://localhost:3000/api/carro/'
    })
    .then(function successCallback(response){
        console.log('Página cadastrar carro: - ' + response);
    }, // FIM .then successCallback
    function errorCallback(error){
        console.log('Erro ao carregar página cadastrar carro');
    }); // FIM errorCallback
    // FIM $http
}










function apagarCarro($http){
    $http({
        method: 'DELETE',
        url: 'http://localhost:3000/api/carro/'
    })
    .then(function successCallback(response){
        console.log('Página cadastrar carro: - ' + response);
    }, // FIM .then successCallback
    function errorCallback(error){
        console.log('Erro ao carregar página cadastrar carro');
    }); // FIM errorCallback
    // FIM $http
}