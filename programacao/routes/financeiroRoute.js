const financeiro = require('../programacao/financeiro/financeiroController.js');

module.exports = function(app){

    app.route('/api/financeiro/')
        .get(financeiro.selecionar);

    app.route('/api/financeiro/:id')
        .post(financeiro.criar)
        .put(financeiro.editar)
        .delete(financeiro.deletar)
        .get(financeiro.buscar);

};