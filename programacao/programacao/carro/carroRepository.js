const
    sql = require('mssql'),
    config = require('../conectarBanco/config.js');

module.exports = {
    criarCarro,
    criarOpcionais,
    editarCarro,
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

function criarOpcionais(transaction, req, callback) {
    new sql.Request(transaction)
        .input()
        .execute('proc', function (err, dados) {
            if (err)
                callback(500, { informacao: 'Erro Ao Inserir Opcionais' });
            else
                callback(null, { informacao: 'Opcionais Criado Com Sucesso' });
        });
}

function editarCarro(transaction, req, callback){
    
}

