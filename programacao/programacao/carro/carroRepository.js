const sql = require('mssql'),
    config = require('../conectarBanco/config.js'),
    Promise = require('promise');

module.exports = {
    criarCarro,
    criarOpcional,
    criarOpcionalCarro,
    editarCarro,
    editarOpcionalCarro,
    deletarCarro,
    deletarOpcional,
    selecionarCarro,
    buscar
};





function criarCarro(transaction, req, callback) {
    new sql.Request(transaction)
        .input('MARCA', req.body.marca)
        .input('MODELO', req.body.modelo)
        .input('COR', req.body.cor)
        .input('ANO', req.body.ano)
        .input('PRECO', req.body.preco)
        .execute('SP_CRIAR_CARRO', function (err, recordset, returnValue_idCarro) {
            if (err)
                callback(500, { informacao: 'Erro Ao Inserir Carro' }, null);
            else
                callback(null, { informacao: 'Carro Criado Com Sucesso' }, returnValue_idCarro);
        });
}












function criarOpcional(transaction, req, idCarro, callback) {
    new sql.Request(transaction)
        .input('IDCARRO', idCarro)
        .input('OPC_DESCRICAO', req.body.opcional)
        .execute('SP_CRIAR_OPCINAL', function (err, dados, returnValue_idOpcional) {
            if (err)
                callback(500, { informacao: 'Erro Ao Inserir Opcionais' });
            else
                callback(null, { informacao: 'Opcionais Criado Com Sucesso' }, returnValue_idOpcional);
        });
}












function criarOpcionalCarro(transaction, opcional, idCarro, callback) {
    new sql.Request(transaction)
        .input('IDCARRO', idCarro)
        .input('IDOPCIONAL', opcional)
        .execute('SP_CRIAR_OPCINAL_CARRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Criar criar_opcional_carro - carroRepository' });
            else
                callback(null, { informacao: 'Tabela Opcional_Carro Cadastrado Com Sucesso' });
        });
}














function editarCarro(transaction, req, callback) {
    new sql.Request(transaction)
        .input('ID', req.params.id)
        .input('MARCA', req.body.marca)
        .input('MODELO', req.body.modelo)
        .input('COR', req.body.cor)
        .input('ANO', req.body.ano)
        .input('PRECO', req.body.preco)
        .execute('SP_EDITAR_CARRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Carro' });
            else
                callback(null, { informacao: 'Carro Editado Com Sucesso' });
        });
}










function editarOpcionalCarro(transaction, req, opcional, callback) {
    new sql.Request(transaction)
        .input('IDCARRO', req.params.id)
        .input('IDOPCIONAL', opcional)
        .execute('SP_CRIAR_OPCINAL_CARRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Editar Opcional' });
            else
                callback(null, { informacao: 'Opcionais Carro Editado Com Sucesso' });
        });
}









function deletarCarro(transaction, id, callback) {
    new sql.Request(transaction)
        .input('ID', id)
        .execute('SP_DELETAR_CARRO', function (err) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Carro' });
            else
                callback(null, { informacao: 'Carro Deletado Com Sucesso' });
        });
}











function deletarOpcional(transaction, id, callback) {
    new sql.Request(transaction)
        .input('ID', id)
        .execute('SP_DELETAR_OPCINAL_CARRO', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Deletar Opcionais' });
            else
                callback(null, { informacao: 'Carro Opcionais Deletados Com Sucesso' });
        });
}












function selecionarCarro(query, callback) {
    sql.connect(config).then(function () {
        new sql.Request()
            .input('MARCA', query.marca)
            .input('MODELO', query.modelo)
            .input('COR', query.cor)
            .input('ANO', query.ano)
            .input('PRECO', query.preco)
            .input('DESCRICAO', query.descricao)
            .execute('SP_PROCURAR_CARRO', function (err, dados) {
                if (err)
                    callback(500, { informacao: 'Erro Ao Buscar Carro' });
                else
                    callback(null, { informacao: 'Carro Buscado Com Sucesso' });
            });
    });
}














function buscar(params, callback) {
    sql.connect(config).then(function () {
        new sql.Request()
            .input('ID', params.id)
            .execute('SP_BUSCAR_CARRO', function (err, dados) {
                if (err)
                    callback(500, { informacao: 'Erro Ao Deletar Opcionais' });
                else
                    callback(null, { informacao: 'Carro Opcionais Deletados Com Sucesso' });
            });
    });
}