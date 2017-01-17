const Repository = require('./financeiroRepository.js'),
    CalculoFinanceiro = require('./financeiroCalculo.js'),
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


// CalculoFinanceiro.calcular(req, function(valorParcela))
// conn = connect(config).then(
//     transaction = new sql.Transaction(conn));


function criar(req, res) {
    CalculoFinanceiro.calcular(req, function (valorParcela, percentual) {
        if (valorParcela) {
            Repository.criarFinanceiro(req, valorParcela, percentual, function (err, dados, idFinanceiro) {
                if (err)
                    res.status(err).json(dados);
                else
                    res.status(200).json(idFinanceiro);
            });
        }
    }); // CalculoFinanceiro
} // FIM CRIAR








function editar(req, res) {
    CalculoFinanceiro.calcular(req, function (valorParcela, percentual) {
        if (valorParcela) {
            Repository.editarFinanceiro(req, valorParcela, percentual, function (err, dados) {
                if (err)
                    res.status(err).json(dados);
                else
                    res.status(200).json(dados);
            });
        }
    }); // CalculoFinanceiro
}








function deletar(req, res) {
    Repository.deletarFinanceiro(req, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}







function selecionar(req, res) {
    Repository.selecionarFinanceiro(req, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}









function buscar(req, res) {
    Repository.buscarFinanceiro(req, function (err, informacao, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}