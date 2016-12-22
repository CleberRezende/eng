const
    Repository = require('./carroRepository'),
    sql = require('mssql'),
    config = require('../conectarBanco/config.js'),
    waterfall = require('waterfall');

var transaction,
    conn;

module.exports = {
    criar,
    editar,
    deletar,
    selecionar,
    buscar,
};

function criar(req, res) {

    conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
        function(callback) {
            transaction.begin(function(err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function(callback) {
            Repository.criarCarro(transaction, req, function(err, id, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

        function(id, req, callback) {
            Repository.criarOpcionais(transaction, req, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

    ], function(err, dados) {
        if (err) {
            transaction.rollback(function(erro) {
                if (erro)
                    console.log('Erro Rollback: ' + erro);
                else
                    res.status(err).json(dados);
            });
        }
        else {
            transaction.commit(function(erro) {
                if (erro)
                    console.log('Erro Commited: ' + erro);
                else
                    res.status(200).json(dados);
            });
        }
    });// FIM WATERFALL
} // FIM FUNCTION CRIAR

function editar(req, res) {
    conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
        function(callback) {
            transaction.begin(function(err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function(callback) {
            Repository.editarCarro(transaction, req, id, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

    ], function(err, dados) {
        transaction.rollback
        transaction.commit
    }

    )// FIM WATERFALL EDITAR 


}// FIM FUNCTION EDITAR