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
    var conn = sql.connect(config).then(function () {
        new sql.Request()
            .input('VALOR', valorParcela)
            .input('PARCELAS', req.body.parcelas)
            .input('PERCENTUAL', percentual)
            .input('VENCIMENTO', req.body.vencimento)
            .input('ID', req.params.id)
            .execute('SP_CRIAR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, { informacao: 'Erro Ao Criar Financeiro' });
                else
                    callback(null, { informacao: 'Financeiro Criado Com Sucesso' });
            });
    });
}








function editarFinanceiro(req, valorParcela, percentual, callback) {
    var conn = sql.connect(config).then(function () {
        new sql.Request()
            .input('ID', req.params.id)
            .input('VALOR', valorParcela)
            .input('PARCELAS', req.body.parcelas)
            .input('PERCENTUAL', percentual)
            .input('VENCIMENTO', req.body.vencimento)
            .execute('SP_EDITAR_FINANCEIRO', function (err, dados) {
                if (err)
                    callback(500, { informacao: 'Erro Ao Criar Financeiro' });
                else
                    callback(null, { informacao: 'Financeiro Criado Com Sucesso' });
            });
    });
}








function deletarFinanceiro(req, callback) {
    var conn = sql.connect(config).then(function () {
    new sql.Request()
        .input('ID', req.params.id)
        .execute('SP_EXCLUIR_FINANCEIRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Financeiro' });
            else
                callback(null, { informacao: 'Financeiro Deletado Com Sucesso' });
        });
    });
}








function selecionarFinanceiro(req, callback) {
    new sql.Request()
        .execute('SP_SELECIONAR_FINANCEIRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Selecionar Financeiro' });
            else
                callback(null, { informacao: 'Financeiro Selecionado Com Sucesso' });
        });
}







function buscarFinanceiro(req, callback) {
    new sql.Request()
        .input('ID', req.params.id)
        .execute('SP_BUSCAR_FINANCEIRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Buscar Financeiro' });

            else
                callback(null, { informacao: 'Financeiro Buscado Com Sucesso' });
        });
}