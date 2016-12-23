const Repository = require('./clienteRepository.js'),
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
    buscar
};







function criar(req, res) {
    conn = connect(config).then(
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
            Repository.criarCliente(transaction, req, function (err, dados, id) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

        function (id, dados, callback) {
            Repository.criarEndereco(transaction, id, req, function (err, dados, id) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, id, dados);
            });
        },

        function (id, dados, callback) {
            Repository.criarTelefone(transaction, id, req, function (err, dados, id) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },


    ], function (err, dado) {
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
    }); // FIM WATERFALL
} // FIM CRIAR










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
            Repository.editarCliente(transaction, req, function (err, dados) {
                if (err)
                    callback(err, { informacao: 'Erro Ao Editar Cliente' });
                else
                    callback(null, { informacao: 'Cliente Editado Com Sucesso' });
            });
        },

        function (err, dados) {
            Repository.editarEndereco(transaction, req, function (err, dados) {
                if (err)
                    callback(err, { informacao: 'Erro Ao Editar Endereco Cliente' });
                else
                    callback(null, { informacao: 'Telefone Cliente Editado Com Sucesso' });
            });
        },

        function (err, dados) {
            Repository.editarTelefone(transaction, req, function (err, dados) {
                if (err)
                    callback(err, { informacao: 'Erro Ao Editar Telefone Cliente' });
                else
                    callback(null, { informacao: 'Telefone Cliente Editado Com Sucesso' });
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
                    res.status(200).json(dados);
            });
        }
    }); // FIM WATERFALL
}









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
            Repository.deletarCliente(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (callback) {
            Repository.deletarEndereco(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (callback) {
            Repository.deletarTelefone(transaction, req, function (err, dados) {
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
                    res.status(200).json(dados);
            });
        }
    }); // FIM WATERFALL
} // FIM DELETAR










function selecionar(req, res) {
    Repository.selecionarCliente(req, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
} // FIM SELECIONAR










function buscar(req, res) {
    Repository.buscarCliente(req, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
} // FIM BUSCAR