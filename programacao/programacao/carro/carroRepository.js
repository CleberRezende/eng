const sql = require('mssql'),
    config = require('../conectarBanco/config.js');

module.exports = {
    criarCarro,
    criarOpcional,
    editarCarro,
    editarOpcional,
    deletarCarro,
    deletarOpcional,
    selecionarCarro,
    buscarCarro
};





function criarCarro(transaction, req, callback) {
    new sql.Request(transaction)
        .input('MARCA', req.body.marca)
        .input('MODELO', req.body.modelo)
        .input('COR', req.body.cor)
        .input('ANO', req.body.ano)
        .input('PRECO', req.body.preco)
        .execute('SP_INSERIR_CARRO', function (err, recordset, returnValue) {
            if (err)
                callback(500, { informacao: 'Erro Ao Inserir Carro' }, null);
            else
                callback(null, { informacao: 'Carro Criado Com Sucesso' }, returnValue);
        });
}









function criarOpcional(transaction, req, id, callback) {
    new sql.Request(transaction)
        .input('nome_da_váriavel', id)
        .input('nome_do_opcional', req.body.nome_opcional)
        .execute('nome_da_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Inserir Opcionais' });
            else
                callback(null, { informacao: 'Opcionais Criado Com Sucesso' });
        });
}









function editarCarro(transaction, req, callback) {
    new sql.Request(transaction)
        .input('nome_da_váriavel', req.params.id)
        .input('nome_do_carro', req.body.nome_carro)
        .execute('nome_da_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Carro' });
            else
                callback(null, { informacao: 'Carro Editado Com Sucesso' });
        });
}










function editarOpcional(transaction, req, callback) {
    new sql.Request(transaction)
        .input('nome_da_váriavel', req.params.id)
        .input('nome_do_opcional', req.body.nome_opcional)
        .execute('nome_da_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Opcional' });
            else
                callback(null, { informacao: 'Opcionais Carro Editado Com Sucesso' });
        });
}









function deletarCarro(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Carro' });
            else
                callback(null, { informacao: 'Carro Deletado Com Sucesso' });
        });
}









function deletarOpcional(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .input('nome_proc', function (err) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Opcionais' });
            else
                callback(null, { informacao: 'Carro Opcionais Deletados Com Sucesso' });
        });
}









function selecionarCarro(req, callback) {
    new sql.Request()
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Selecionar Carros' });
            else
                callback(null, { informacao: 'Carros Selecionados Com Sucesso' });
        });
}









function buscarCarro(req, callback) {
    new sql.Request()
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Buscar Carro' });
            else
                callback(null, { informacao: 'Carro Buscado Com Sucesso' });
        });
}