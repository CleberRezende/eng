const Repository = require('./carroRepository'),
    sql = require('mssql'),
    config = require('../conectarBanco/config.js'),
    waterfall = require('async-waterfall');

// var transaction,
//     conn;

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
        function(callback) {
            transaction.begin(function(err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function(callback) {
            Repository.criarCarro(transaction, req, function(err, dados, idCarro) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, idCarro);
            });
        },

        function(idCarro, callback) {
            let promises = req.body.opcionais.map(opcional => new Promise((resolve, reject) => {
                Repository.criarOpcionalCarro(transaction, opcional.opcional, idCarro, function(err, dados) {
                    if (err)
                        reject(dados);
                    else
                        resolve(null);

                }); // FIM Repository.criarOpcionalCarro
            })); // FIM LET PROMISSES


            Promise.all(promises).then(() => {
                callback(null, null, idCarro);
            }, (err) => {
                callback(500, dados);
            }

            );

        } // FIM FUNCTION

    ], function(err, dados, idCarro) {
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
                    //console.log('Carro e Opcional Cadastrado Com Sucesso: ');
                    res.status(200).json({id: idCarro});
            });
        }
    });// FIM WATERFALL
} // FIM FUNCTION CRIAR








function editar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
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
            Repository.editarCarro(transaction, req, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function(dados, callback) {
            Repository.deletarOpcional(transaction, req.params.id, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function(dados, callback) {
            let promises = req.body.opcionais.map(opcional => new Promise((resolve, reject) => {
                Repository.editarOpcionalCarro(transaction, req, opcional.opcional, function(err, dados) {
                    if (err)
                        reject(dados);
                    else
                        resolve(null);

                }); // FIM Repository.criarOpcionalCarro
            })); // FIM LET PROMISSES


            Promise.all(promises).then(() => {
                callback(null);
            }, (err) => {
                callback(500, dados);
            }

            );

        }

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
    }
    );// FIM WATERFALL EDITAR 
}// FIM FUNCTION EDITAR









function deletar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
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
            Repository.deletarOpcional(transaction, req.params.id, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function(dados, callback) {
            Repository.deletarCarro(transaction, req.params.id, function(err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

    ], function(err, dados) {
        if (err) {
            transaction.rollback(function(erro) {
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
            transaction.commit(function(erro) {
                if (erro) {
                    console.log('Erro Commit: ' + erro);
                    res.status(500).json(dados);
                }
                else {
                    //console.log('Commit OK');
                    res.status(200).json(dados);
                }
            });
        }

    }); // FIM WATERFALL
} // FIM FUNCTION DELETAR








function selecionar(req, res) {
    Repository.selecionarCarro(req.query, function(err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    }); // Repository
}// FIM FUNCTION SELECIONAR









function buscar(req, res) {
    Repository.buscar(req.params, function(err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    }); // Repository
} // FIM FUNCTION BUSCAR