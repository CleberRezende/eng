const carro = require('../core/carro/carroController.js');

module.exports = function (app) {

    app.route('/api/carro/')
        .get(carro.selecionar)
        .post(carro.criar);

    app.route('/api/carro/:id')
        .put(carro.editar)
        .delete(carro.deletar)
        .get(carro.buscar);

}; 