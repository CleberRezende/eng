const carro = require('../programacao/carro/carroController.js');

module.exports = function(app){

    app.route('/api/carro')
        .post(carro.criar)          
        .get(carro.selecionar);

    app.route('/api/carro/:id')
        .put(carro.editar)
        .delete(carro.deletar)
        .get(carro.buscar);

};