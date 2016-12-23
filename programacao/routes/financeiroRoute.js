const financeiro = require('../programacao/financeiro/financeiroController.js');

module.exports = function(app){

    app.route('/api/financeiro/')
        .post(financeiro.criar)
        .get(financeiro.selecionar);

    app.route('api/financeiro/:id')
        .put(financeiro.editar)
        .delete(financeiro.deletar)
        .get(financeiro.buscar);

};