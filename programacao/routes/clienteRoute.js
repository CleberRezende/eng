const cliente = require('../programacao/cliente/clienteController.js');

module.exports = function (app) {

    app.route('/api/cliente/')
        .post(cliente.criar)
        .get(cliente.selecionar);

    app.route('/api/cliente/:id')
        .put(cliente.editar)
        .delete(cliente.deletar)
        .get(cliente.buscar);

};