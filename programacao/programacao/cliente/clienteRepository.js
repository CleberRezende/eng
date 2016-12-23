const sql = require('mssql'),
    config = require('../conectarBanco/config.js');

module.exports = {
    criarCliente,
    criarEndereco,
    criarTelefone,
    editarCliente,
    editarEndereco,
    editarTelefone,
    deletarCliente,
    deletarEndereco,
    deletarTelefone,
    selecionarCliente,
    buscarCliente
};





function criarCliente(transaction, req, callback) {
    new sql.Request(transaction)
        .input('nome_váriavel', req.body.nome)
        .execute('nome_proc', function (err, returnValue) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Cliente' }, null);
            else
                callback(null, { informacao: 'Erro Ao Criar Cliente' }, returnValue);
        });
}






function criarEndereco(transaction, id, req, callback) {
    new sql.Request(transaction)
        .input('nome_váriavel', req.body.nome)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Criado Com Sucesso' });
        });
}






function criarTelefone(transaction, id, req, callback) {
    new sql.Request(transaction)
        .input('nome_váriavel', req.body.telefone)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Criado Com Sucesso' });
        });
}






function editarCliente(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Cliente' });
            else
                callback(null, { informacao: 'Cliente Criado Com Sucesso' });
        });
}





function editarEndereco(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Editado Com Sucesso' });
        });
}






function editarTelefone(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Editado Com Sucesso' });
        });
}





function deletarCliente(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Excluir Cliente' });
            else
                callback(null, { informacao: 'Cliente Excluido Com Sucesso' });
        });
}






function deletarEndereco(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Deletado Com Sucesso' });
        });
}







function deletarTelefone(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Deletado Com Sucesso' });
        });
}






function selecionarCliente(req, callback) {
    new sql.Request()
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao selecionar Cliente' });
            else
                callback(null, { informacao: 'Cliente Selecionado Com Sucesso' });
        });
}







function buscarCliente(req, callback) {
    new sql.Request()
        .input('ID', req.params.id)
        .execute('nome_proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Buscar Cliente' });
            else
                callback(null, { informacao: 'Cliente Buscado Com Sucesso' });
        });
}