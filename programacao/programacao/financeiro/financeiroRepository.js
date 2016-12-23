const sql = require('mssql'),
    config = require('../conectarBanco/config.js');

module.exports = {
    criarFinanceiro,
    editarFinanceiro,
    deletarFinanceiro,
    selecionarFinanceiro,
    buscarFinanceiro,
};




function criarFinanceiro(req, callback) {
    new sql.Request()
        .input('nome_váriavel', req.body.nome)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Financeiro' });
            else
                callback(null, { informacao: 'Financeiro Criado Com Sucesso' });
        });
}








function editarFinanceiro(req, callback) {
    new sql.Request()
        .input('nome_váriavel', req.body.nome)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Financeiro' });
            else
                callback(null, { informacao: 'Editar Financeiro Com Sucesso' });
        });
}








function deletarFinanceiro(req, callback) {
    new sql.Request()
        .input('nome_váriavel', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Financeiro' });
            else
                callback(null, { informacao: 'Financeiro Deletado Com Sucesso' });
        });
}








function selecionarFinanceiro(req, callback) {
    new sql.Request()
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Selecionar Financeiro' });
            else
                callback(null, { informacao: 'Financeiro Selecionado Com Sucesso' });
        });
}







function buscarFinanceiro(req, callback) {
    new sql.Request()
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Buscar Financeiro' });

            else
                callback(null, { informacao: 'Financeiro Buscado Com Sucesso' });
        });
}