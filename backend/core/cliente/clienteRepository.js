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
        .input('NOME', req.body.nome)
        .input('CPF', req.body.cpf)
        .input('SEXO', req.body.sexo)
        .input('ID_CARRO', req.params.id)
        .execute('SP_CRIAR_CLIENTE', function (err, dados, returnValue) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Cliente' }, null);
            else
                callback(null, { informacao: 'Erro Ao Criar Cliente' }, returnValue);
        });
}






function criarEndereco(transaction, idCliente, req, callback) {
    new sql.Request(transaction)
        .input('RUA', req.body.rua)
        .input('BAIRRO', req.body.bairro)
        .input('CEP', req.body.cep)
        .input('COMPLEMENTO', req.body.complemento)
        .input('ID_CLIENTE', idCliente)
        .execute('SP_CRIAR_ENDERECO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Criado Com Sucesso' });
        });
}






function criarTelefone(transaction, idCliente, req, callback) {
    new sql.Request(transaction)
        .input('ID_CODIGO', idCliente)
        .input('TELEFONE', req.body.telefone)
        .execute('SP_CRIAR_TELEFONE', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Criado Com Sucesso' });
        });
}






function editarCliente(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .input('NOME', req.body.nome)
        .input('CPF', req.body.cpf)
        .input('SEXO', req.body.sexo)
        .execute('SP_EDITAR_CLIENTE', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Cliente' });
            else
                callback(null, { informacao: 'Cliente Criado Com Sucesso' });
        });
}





function editarEndereco(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .input('RUA', req.body.rua)
        .input('BAIRRO', req.body.bairro)
        .input('CEP', req.body.cep)
        .input('COMPLEMENTO', req.body.complemento)
        .execute('SP_EDITAR_ENDERECO', function (err) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Editado Com Sucesso' });
        });
}






function editarTelefone(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .input('TELEFONE', req.body.telefone)
        .execute('SP_EDITAR_TELEFONE', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Editado Com Sucesso' });
        });
}





function deletarCliente(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('SP_EXCLUIR_CLIENTE', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Excluir Cliente' });
            else
                callback(null, { informacao: 'Cliente Excluido Com Sucesso' });
        });
}






function deletarEndereco(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('SP_EXCLUIR_ENDERECO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Endereco Cliente' });
            else
                callback(null, { informacao: 'Endereco Cliente Deletado Com Sucesso' });
        });
}







function deletarTelefone(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .execute('SP_EXCLUIR_TELEFONE', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Telefone Cliente' });
            else
                callback(null, { informacao: 'Telefone Cliente Deletado Com Sucesso' });
        });
}






function selecionarCliente(req, callback) {

    sql.connect(config).then(function () {
        new sql.Request()
            .execute('SP_SELECIONAR_CLIENTE', function (err, dados) {
                if (err)
                    callback(500, { informacao: 'Erro Ao selecionar Cliente' });
                else
                    callback(null, { informacao: 'Cliente Selecionado Com Sucesso' });
            });
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