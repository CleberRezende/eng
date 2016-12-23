const Repository = require('./financeiroRepository.js'),
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






function criar(req, res) {
    // conn = connect(config).then(
    //     transaction = new sql.Transaction(conn));

    Repository.criarFinanceiro(req, function(err, dados){
        if(err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });

} // FIM CRIAR








function editar(req,res){
    Repository.editarFinanceiro(req, function(err, dados){
        if(err)
            res.status(err).json(dados);
        else    
            res.status(200).json(dados);
    });
}








function deletar(req, res){
    Repository.deletarFinanceiro(req, function(err, dados){
        if(err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}







function selecionar(req, res){
    Repository.selecionarFinanceiro(req, function(err, dados){
        if(err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}









function buscar(req, res){
    Repository.buscarFinanceiro(req, function(err, dados){
        if(err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    });
}