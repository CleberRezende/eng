const Repository = require('./carroRepository'),
    sql = require('mssql'),
    config = require('../conectarBacon/config.js'),
    waterfall = require('waterfall');

module.exports = {
    criar,
    editar,
    deletar,
    selecionar,
    buscar,
};

function criar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
        function (callback) {
            transaction.begin(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function (callback) {
            Repository.criar(req, transaction, function (err, id, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

        function

    ], function (err, dados) {
        if (err) {
            transaction.rollback(function (erro) {
                console.log('Erro Rollback: ' + erro);
                res.status(err).json(dados);
            });
        }
        else{
            res.status(200).json(dados);
        }
    });// FIM waterfall
}