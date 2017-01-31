const Repository = require('./carroRepository'),
    sql = require('mssql'),
    Cliente = require('./carroDeletarCliente'),
    config = require('../conectarBanco/config.js'),
    waterfall = require('async-waterfall');

// var transaction,
//     conn;

module.exports = {
    criar,
    editar,
    deletar,
    selecionar,
    buscar,
};


function criar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
        function (callback) {
            transaction.begin(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

        function (callback) {
            Repository.criarCarro(transaction, req, function (err, dados, idCarro) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, idCarro);
            });
        },

        function (idCarro, callback) {
            let promises = req.body.opcionais.map(opcional => new Promise((resolve, reject) => {
                Repository.criarOpcionalCarro(transaction, opcional.opcional, idCarro, function (err, dados) {
                    if (err)
                        reject(dados);
                    else
                        resolve(null);

                }); // FIM Repository.criarOpcionalCarro
            })); // FIM LET PROMISSES

            Promise.all(promises).then(() => {
                    callback(null, null, idCarro);
                }, (err) => {
                    callback(500, dados);
                }
            );

        } // FIM FUNCTION

    ], function (err, dados, idCarro) {
        if (err) {
            transaction.rollback(function (erro) {
                if (erro)
                    console.log('Erro Rollback: ' + erro);
                else
                    res.status(err).json(dados);
            });
        }
        else {
            transaction.commit(function (erro) {
                if (erro)
                    console.log('Erro Commited: ' + erro);
                else
                //console.log('Carro e Opcional Cadastrado Com Sucesso: ');
                    res.status(200).json({id: idCarro});
            });
        }
    });// FIM WATERFALL
} // FIM FUNCTION CRIAR


function editar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
            function (callback) {
                transaction.begin(function (err) {
                    if (err)
                        callback(err);
                    else
                        callback(null);
                });
            },

            function (callback) {
                Repository.editarCarro(transaction, req, function (err, dados) {
                    if (err)
                        callback(err, dados);
                    else
                        callback(null, dados);
                });
            },

            function (dados, callback) {
                Repository.deletarOpcional(transaction, req.params.id, function (err, dados) {
                    if (err)
                        callback(err, dados);
                    else
                        callback(null, dados);
                });
            },

            function (dados, callback) {
                let promises = req.body.opcionais.map(opcional => new Promise((resolve, reject) => {
                    Repository.editarOpcionalCarro(transaction, req, opcional.opcional, function (err, dados) {
                        if (err)
                            reject(dados);
                        else
                            resolve(null);

                    }); // FIM Repository.criarOpcionalCarro
                })); // FIM LET PROMISSES


                Promise.all(promises).then(() => {
                        callback(null);
                    }, (err) => {
                        callback(500, dados);
                    }
                );

            }

        ], function (err, dados) {
            if (err) {
                transaction.rollback(function (erro) {
                    if (erro)
                        console.log('Erro Rollback: ' + erro);
                    else
                        res.status(err).json(dados);
                });
            }
            else {
                transaction.commit(function (erro) {
                    if (erro)
                        console.log('Erro Commited: ' + erro);
                    else
                        res.status(200).json(dados);
                });
            }
        }
    );// FIM WATERFALL EDITAR 
}// FIM FUNCTION EDITAR


function deletar(req, res) {
    var transaction;
    var conn = sql.connect(config).then(
        transaction = new sql.Transaction(conn));

    waterfall([
        function (callback) {
            transaction.begin(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null);
            });
        },

/*        function (callback) {
            Cliente.deletarCliente(req, transaction, function (resultado) {
                // if (resultado == 500)
                //     callback(err, dados);
                // else
                    callback(null);
            });
        },*/

        function (callback) {
            Repository.deletarOpcional(transaction, req.params.id, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

        function (dados, callback) {
            Repository.deletarCarro(transaction, req.params.id, function (err, dados) {
                if (err)
                    callback(err, dados);
                else
                    callback(null, dados);
            });
        },

    ], function (err, dados) {
        if (err) {
            transaction.rollback(function (erro) {
                if (erro) {
                    console.log('Erro Rollback: ' + erro);
                    res.status(err).json(dados);
                }
                else {
                    console.log('Rollback OK');
                    res.status(err).json(dados);
                }
            });
        }
        else {
            transaction.commit(function (erro) {
                if (erro) {
                    console.log('Erro Commit: ' + erro);
                    res.status(500).json(dados);
                }
                else {
                    //console.log('Commit OK');
                    res.status(200).json(dados);
                }
            });
        }

    }); // FIM WATERFALL
} // FIM FUNCTION DELETAR


function selecionar(req, res) {
    Repository.selecionarCarro(req.query, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    }); // Repository
}// FIM FUNCTION SELECIONAR


function buscar(req, res) {
    Repository.buscar(req.params, function (err, dados) {
        if (err)
            res.status(err).json(dados);
        else
            res.status(200).json(dados);
    }); // Repository
} // FIM FUNCTION BUSCAR





/*


http://expressjs.com/pt-br/guide/database-integration.html#postgres



 module.exports = {
 listarCidadeDropdown: function (params, connectionString, callBack) {
 const db = require('pg-db')(connectionString);

 db.query('SELECT * FROM Administracao.ListarCidadeDropdown($1) AS (' +
 '"idCidade" integer, ' +
 '"nomeCidade" varchar(50),' +
 '"unidadeFederacao" char(2));',
 [params.unidadeFederacao],
 function (err, rows) {
 if (err) {
 err.info = {
 httpCode: 500,
 code: 5,
 message: 'listarCidadeDropdown: ' + err.message + ' (' + err.line + ')'
 };
 } else if (rows.length === 0) {
 err = {
 info: {
 httpCode: 400,
 code: 6,
 message: ['Unidade Federação inválida']
 }
 }
 }
 callBack(err, (err ? err.info.httpCode : 200), rows);
 }
 );
 },

 listarUnidadeFederacaoDropdown: function (connectionString, callBack) {
 const db = require('pg-db')(connectionString);

 db.query('SELECT * FROM Administracao.ListarUnidadeFederacaoDropdown() AS (' +
 '"unidadeFederacao" char(2));',
 [],
 function (err, rows) {
 if (err) {
 err.info = {
 httpCode: 500,
 code: 5,
 message: 'listarUnidadeFederacaoDropdown: ' + err.message + ' (' + err.line + ')'
 };
 } else if (rows.length === 0) {
 err = {
 info: {
 httpCode: 204,
 code: 6,
 message: 'listarUnidadeFederacaoDropdown'
 }
 }
 }
 callBack(err, (err ? err.info.httpCode : 200), rows);
 }
 );
 }
 };

* */




/* INICIO POSTGRES
--------------------------------------------------------------------------------------
CREATE TABLE Seguranca.Usuario(
  cpf		VARCHAR(20) CONSTRAINT unq__USUARIO_CPF UNIQUE CONSTRAINT nn_USUARIO_CPF NOT NULL,
  senha   VARCHAR(100) CONSTRAINT nn_USUARIO_SENHA NOT NULL,
  email	VARCHAR(100) CONSTRAINT nn_USUARIO_EMAIL NOT NULL
);

CREATE SCHEMA Seguranca;

SET SEARCH_PATH = Seguranca;

CREATE OR REPLACE FUNCTION Seguranca.inserirUsuario(pCpf   VARCHAR(20),
                                                    pSenha VARCHAR(100),
                                                    pEmail VARCHAR(100))
  RETURNS JSON AS $$

DECLARE
  vRetException VARCHAR(1000);
  vReturnId     VARCHAR(20);

BEGIN

  INSERT INTO Seguranca.Usuario(
    CPF,
    SENHA,
    EMAIL
  )VALUES(
    pCpf,
    MD5(pSenha),
    pEmail) RETURNING cpf INTO vReturnId;

  RETURN '{"result": "Usuario cadastrado com sucesso!", "CPF":"' || vReturnId || '", "code":0}';

  EXCEPTION WHEN OTHERS
  THEN
    GET STACKED DIAGNOSTICS vRetException = MESSAGE_TEXT;
    RETURN '{"result": ' || to_json(vRetException) || ', "code": 500}';
END;
$$
LANGUAGE plpgsql;

SELECT * FROM Seguranca.inserirUsuario('087.831.666-89', '123321', 'wagner@engsolutions.com.br');







-----------------------------------------------------------------------------------------------------






CREATE TABLE Seguranca.Usuario(
  cpf		VARCHAR(20) CONSTRAINT unq__USUARIO_CPF UNIQUE CONSTRAINT nn_USUARIO_CPF NOT NULL,
  senha   VARCHAR(100) CONSTRAINT nn_USUARIO_SENHA NOT NULL,
  email	VARCHAR(100) CONSTRAINT nn_USUARIO_EMAIL NOT NULL
);

CREATE SCHEMA Seguranca;

SET SEARCH_PATH = Seguranca;

CREATE OR REPLACE FUNCTION Seguranca.inserirUsuario(pCpf   VARCHAR(20),
                                                    pSenha VARCHAR(100),
                                                    pEmail VARCHAR(100))
  RETURNS JSON AS $$

DECLARE
  vRetException VARCHAR(1000);
  vReturnId     VARCHAR(20);

BEGIN

  INSERT INTO Seguranca.Usuario(
    CPF,
    SENHA,
    EMAIL
  )VALUES(
    pCpf,
    MD5(pSenha),
    pEmail) RETURNING cpf INTO vReturnId;

  RETURN '{"result": "Usuario cadastrado com sucesso!", "CPF":"' || vReturnId || '", "code":0}';

  EXCEPTION WHEN OTHERS
  THEN
    GET STACKED DIAGNOSTICS vRetException = MESSAGE_TEXT;
    RETURN '{"result": ' || to_json(vRetException) || ', "code": 500}';
END;
$$
LANGUAGE plpgsql;

SELECT * FROM Seguranca.inserirUsuario('087.831.666-89', '123321', 'wagner@engsolutions.com.br');









---------------------------------------------------------------------------------------------------------





SELECT Seguranca.DeletarFuncoes('Administracao', 'ListarCdlDropdown');
CREATE OR REPLACE FUNCTION Administracao.ListarCdlDropdown(pIdGrupoCdl INTEGER,
                                                           pIdUsuario  INTEGER)
    RETURNS TABLE("idCdl" VARCHAR,
                  "razaoSocial" VARCHAR(70),
                  "nomeFantasia" VARCHAR(70)) AS $$

/*
Documentação
Arquivo Fonte.....: CDL.sql
Objetivo..........: Listar CDLs dropdown
Autor.............: Wagner Monteiro
Data..............: 05/01/2017
Ex................: SELECT * FROM Administracao.ListarCdlDropdown('3', '47');
*/


/*
BEGIN
    RETURN QUERY
    SELECT
        DISTINCT Seguranca.criptografahash(3, cdl.idCdl::VARCHAR(200)),
        cdl.razaoSocial,
        cdl.nomeFantasia
    FROM Administracao.Cdl cdl
        INNER JOIN Administracao.Unidade u
            ON u.idCdl = cdl.idCdl
        INNER JOIN Seguranca.UsuarioUnidade uu
            ON uu.idUnidade = u.idUnidade
    WHERE
        cdl.idGrupoCdl = pIdGrupoCdl
        AND CASE
            WHEN pIdUsuario IS NOT NULL
                THEN uu.idUsuario = pIdUsuario
            ELSE
                TRUE
            END;

END;
$$
LANGUAGE plpgsql;

*/

