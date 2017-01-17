const Repository = require('../cliente/clienteRepository.js'),
    // sql = require('mssql'),
    // config = require('../conectarBanco/config.js'),
    waterfall = require('async-waterfall');


module.exports = {
    deletarCliente
};


function deletarCliente(req, transaction, callback) {

    waterfall([
        /*
         function (callback) {
         transaction.begin(function (err) {
         if (err)
         callback(err);
         else
         callback(null);
         });
         },*/

        function (callback) {
            Repository.deletarEndereco(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (dados, callback) {
            Repository.deletarTelefone(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (dados, callback) {
            Repository.deletarCliente(transaction, req, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        }

    ], function (err, dados) {
        if (err) {
            callback(500);
        }
        else {
            callback(200);
        }
    }); // FIM WATERFALL
} // FIM DELETAR
