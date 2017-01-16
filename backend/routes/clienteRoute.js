const cliente = require('../core/cliente/clienteController.js');

module.exports = function (app) {

    app.route('/api/cliente/')
        .get(cliente.selecionar)
        // .post(cliente.criar)

    app.route('/api/cliente/:id')
        .put(cliente.editar)
        .delete(cliente.deletar)
        .get(cliente.buscar);

};