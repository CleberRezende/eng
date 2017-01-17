const sql = require('mssql'),
    config = require('../conectarBanco/config.js');

module.exports = {
    criarFinanceiro,
    editarFinanceiro,
    deletarFinanceiro,
    selecionarFinanceiro,
    buscarFinanceiro,
};


function criarFinanceiro(req, valorParcela, percentual, callback) {
    sql.connect(config).then(function () { // var conn = sql.connect(config)
        new sql.Request()
            .input('VALOR', valorParcela)
            .input('PARCELAS', req.body.parcelas)
            .input('PERCENTUAL', percentual)
            .input('VENCIMENTO', req.body.vencimento)
            .input('ID', req.params.id)
            .execute('SP_CRIAR_FINANCEIRO', function (err, dados, returnValue) {
                if (err)
                    callback(500, {informacao: 'Erro Ao Criar Financeiro'}, null);
                else
                    callback(null, {informacao: 'Financeiro Criado Com Sucesso'}, returnValue);
            });
    });
}


function editarFinanceiro(req, valorParcela, percentual, callback) {
    sql.connect(config).then(function () { // var conn = sql.connect(config)
        new sql.Request()
            .input('ID', req.params.id)
            .input('VALOR', valorParcela)
            .input('PARCELAS', req.body.parcelas)
            .input('PERCENTUAL', percentual)
            .input('VENCIMENTO', req.body.vencimento)
            .execute('SP_EDITAR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, {informacao: 'Erro Ao Criar Financeiro'});
                else
                    callback(null, {informacao: 'Financeiro Criado Com Sucesso'});
            });
    });
}


function deletarFinanceiro(req, callback) {
    var conn = sql.connect(config).then(function () {
        new sql.Request()
            .input('ID', req.params.id)
            .execute('SP_EXCLUIR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, {informacao: 'Erro Ao Deletar Financeiro'});
                else
                    callback(null, {informacao: 'Financeiro Deletado Com Sucesso'});
            });
    });
}


function selecionarFinanceiro(req, callback) {
    sql.connect(config).then(function () { // var conn = sql.connect(config)
        new sql.Request()
            .execute('SP_SELECIONAR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, {informacao: 'Erro Ao Selecionar Financeiro'});
                else
                    callback(null, dados);
            });
    });
}


function buscarFinanceiro(req, callback) {
    sql.connect(config).then(function () { // var conn = sql.connect(config)
        new sql.Request()
            .input('ID', req.params.id)
            .execute('SP_BUSCAR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, {informacao: 'Erro Ao Buscar Financeiro'});

                else
                    callback(null, {informacao: 'Financeiro Buscado Com Sucesso'}, dados);
            });
    });
}