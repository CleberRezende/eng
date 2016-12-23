const Repository = require('./carroRepository'),
    sql = require('mssql'),
    config = require('../conectarBanco/config.js'),
    waterfall = require('async-waterfall');

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
        function (callback) {
            transaction.begin(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function (callback) {
            Repository.criarCarro(transaction, req, function (err, dados, id) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

        function (id, req, callback) {
            Repository.criarOpcional(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

    ], function (err, dados) {
        if (err) {
            transaction.rollback(function (erro) {
                if (erro)
                    console.log('Erro Rollback: ' + erro);
                else
                    res.status(err).json(dados);
            });
        }
        else {
            transaction.commit(function (erro) {
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
        function (callback) {
            transaction.begin(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function (callback) {
            Repository.editarCarro(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (dados, callback) {
            Repository.editarOpcional(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        }

    ], function (err, dados) {
        if (err) {
            transaction.rollback(function (erro) {
                if (erro)
                    console.log('Erro Rollback: ' + erro);
                else
                    res.status(err).json(dados);
            });
        }
        else {
            transaction.commit(function (erro) {
                if (erro)
                    console.log('Erro Commited: ' + erro);
                else
                    res.status(err).json(dados);
            });
        }
    }
    );// FIM WATERFALL EDITAR 
}// FIM FUNCTION EDITAR






function deletar(req, res) {
    conn = sql.connect(config).then(
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
            Repository.deletarCarro(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (dados, callback) {
            Repository.deletarOpcional(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

    ], function (err, dados) {
        if (err) {
            transaction.rollback(function (erro) {
                if (erro) {
                    console.log('Erro Rollback: ' + erro);
                    res.status(err).json(dados);
                }
                else {
                    console.log('Rollback OK');
                    res.status(err).json(dados);
                }
            });
        }
        else {
            transaction.commit(function (erro) {
                if (erro) {
                    console.log('Erro Commit: ' + erro);
                    res.status(500).json(dados);
                }
                else {
                    console.log('Commit OK');
                    res.status(200).json(dados);
                }
            });
        }

    }); // FIM WATERFALL
} // FIM FUNCTION DELETAR





function selecionar(req, res) {
    Repository.selecionarCarro(req, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    }); // Repository
}// FIM FUNCTION SELECIONAR






function buscar(req, res) {
    Repository.buscarCarro(req, function (erro, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
} // FIM FUNCTION BUSCAR