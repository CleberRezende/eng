const cliente = require('../core/cliente/clienteController.js');

module.exports = function (app) {

    app.route('/api/cliente/')
        .get(cliente.selecionar)

    app.route('/api/cliente/:id')
        .post(cliente.criar)
        .put(cliente.editar)
        .delete(cliente.deletar)
        .get(cliente.buscar);

};