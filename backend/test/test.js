const assert = require('assert'),
    http = require('http'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    should = require('should');

let idCarro,
    idCliente,
    idFinanceiro;

var server = require('../server.js');
var request = require("request");
var caminho = 'http://localhost:3000';
var divisor = ' --------------------------------------------------------';

console.log(divisor);
console.log(" ------------   INICIANDO TESTES API CARRO   ------------");
describe("  Teste API...: CarroAPI", function () {
    console.log(divisor);

    // before(function () {
    //     // console.log('\n');
    //     // console.log(divisor);
    // });

    //  -- INICIANDO SERVIDOR API CARRO - LOCALHOST:3000  --------------------------------------------------------------
    describe("INICIANDO SERVIDOR", function () {
        before(function () {
            console.log(divisor);
        });
        after(function () {
            console.log(divisor);
        });

        it('1 - Servidor localhost:3000', function (done) {
            this.timeout(5000);

            server();
            setTimeout(function () {
                done();
            }, 2000);
        });
    });

    //  -- INICIANDO TESTE API CARRO - CRUD CARRO  ---------------------------------------------------------------------
    describe('2 - Iniciando teste funcionalidade.: Carro', function () {
        before(function () {
            console.log('');
        });

        it('[2.1] chamada GET - Listar todos carros', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/carro/',
                headers: {'content-type': 'application/json'},
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });

        }); // FIM it[2.1]

        it('[2.2] chamada POST - Inserir novo carro', function (done) {
            var options = {
                method: 'POST',
                url: caminho + '/api/carro/',
                headers: {'content-type': 'application/json'},
                body: {
                    marca: 'Fiat',
                    modelo: 'Uno 1.4',
                    cor: 'Vermelho',
                    ano: '2016',
                    preco: '18444',
                    opcionais: [
                        {opcional: 7},
                        {opcional: 8},
                        {opcional: 12}
                    ]
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                idCarro = body.id;
                done();
            });
        }); // FIM it[2.2]

        it('[2.3] chamada PUT - Atualizar', function (done) {
            var options = {
                method: 'PUT',
                url: caminho + '/api/carro/' + idCarro,
                headers: {'content-type': 'application/json'},
                body: {
                    marca: 'Fiat',
                    modelo: 'Uno 1.4',
                    cor: 'Preto',
                    ano: '2015',
                    preco: '21111',
                    opcionais: [
                        {opcional: 5},
                        {opcional: 7},
                        {opcional: 8},
                        {opcional: 12}
                    ]
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[2.3]

        it('[2.4] chamada GET :id - Buscar carro expecifico', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/carro/' + idCarro,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
                console.log(divisor);
            });
        }); // FIM it[2.4]

    }); // FIM describe[2]

    // -- INICIANDO TESTE API CARRO - CRUD CLIENTE  --------------------------------------------------------------------
    describe('3 - Iniciando teste funcionalidade.: Cliente', function () {
        before(function () {
            console.log('');
        });

        it('[3.1] chamada GET - Listar todos clientes', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/carro/',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[3.1]

        it('[3.2] chamada POST - Adicionar novo cliente', function (done) {
            var options = {
                method: 'POST',
                url: caminho + '/api/cliente/' + idCarro,
                headers: {'content-type': 'application/json'},
                body: {
                    nome: 'Dona Test',
                    cpf: '372.000.999-99',
                    sexo: 'FEMININO',
                    rua: 'Rua Da Dona Test',
                    bairro: 'Bairro Da Dona Test',
                    cep: '14000-999',
                    complemento: 'Complemento Da Dona Test',
                    telefone: '3404-9999'
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                idCliente = body.id;
                done();
            });
        }); // FIM it[3.2]

        it('[3.3] chamada PUT - Atualizar', function (done) {
            var options = {
                method: 'PUT',
                url: caminho + '/api/cliente/' + idCliente,
                headers: {'content-type': 'application/json'},
                body: {
                    nome: 'Edit Test',
                    cpf: '372.000.999-99',
                    sexo: 'MASCULINO',
                    rua: 'Rua Da Edit Test',
                    bairro: 'Bairro Da Edit Test',
                    cep: '14000-999',
                    complemento: 'Complemento Edit Test 000',
                    telefone: '3404-0000'
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[3.3]

        it('[3.4] chamada GET :id - Buscar cliente expecifico', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/carro/' + idCliente,
                headers: {'content-type': 'application/json'},
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
                console.log(divisor);
            });
        }); // FIM it[3.4]

    }); // FIM describe[3]

    // -- INICIANDO TESTE API CARRO - CRUD FINANCEIRO  -----------------------------------------------------------------
    describe('4 - Iniciando teste funcionalidade.: Financeiro', function () {
        before(function () {
            console.log('');
            // console.log(divisor);
        });

        it('[4.1] chamada GET - Listar todos financeiros', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/financeiro/',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[4.1]

        it('[4.2] chamada POST Adicionar novo financeiro', function (done) {
            var options = {
                method: 'POST',
                url: caminho + '/api/financeiro/' + idCliente,
                headers: {'content-type': 'application/json'},
                body: {
                    parcelas: 60,
                    preco: "100000",
                    entrada: "10000",
                    vencimento: "15"
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[4.2]

        it('[4.3] chamada PUT - Atualizar', function (done) {
            var options = {
                method: 'PUT',
                url: caminho + '/api/financeiro/' + idCliente,
                headers: {'content-type': 'application/json'},
                body: {
                    parcelas: 12,
                    preco: '100000',
                    entrada: '40000',
                    vencimento: '15'
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[4.3]

        it('[4.4] chamada GET :id - Buscar cliente expecifico', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/financeiro/' + idCliente,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
                console.log(divisor);
            });
        }); // FIM it[4.4]

    }); // FIM describe[4]

    // -- INICIANDO TESTE API DE DELETE: FINANCEIRO, CLIENTE, CARRO  ---------------------------------------------------
    describe('5 - Iniciando teste funcionalidade DELETE.:', function () {
        it('[5.1] chamada DELETE Financeiro - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/financeiro/' + idCliente,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[5.1]

        it('[5.2] chamada DELETE Cliente - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/cliente/' + idCliente,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[5.2]

        it('[5.3] chamada DELETE Carro - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/carro/' + idCarro,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
                console.log(divisor);
                console.log('    ID Carro.......: ', idCarro);
                console.log('    ID Cliente.....: ', idCliente);
                console.log(divisor);
            });
        }); // FIM it[5.3]

    });

//  -- FINALIZANDO TESTE API CARRO - CRUD CARRO  -----------------------------------------------------------------------
    describe('Conclusão', function () {
        it('Finalizando teste', function (done) {
            this.timeout(300);
            setTimeout(function () {
                done();
            }, 150);
        });
        after(function () {
            console.log(divisor);
            console.log(" ------------   TESTES API CARRO CONCLUIDO   ------------");
            console.log(divisor);
        });
    });
//endregion

})
; // FIM Teste API

/*
 {
 "marca":"Fiat",
 "modelo":"Uno 1.4",
 "cor":"Marrom",
 "ano":"2016",
 "preco":"18001",

 "opcionais":[
 {"opcional":7},
 {"opcional":8},
 {"opcional":12}
 ]

 {
 "nome":"Cliente Test",
 "cpf":"11.111.111-11",
 "sexo":"Masculino",

 "rua":"Rua test 01",
 "bairro":"Bairro Test",
 "cep":"14401-001",
 "complemento":"Ap 01",

 "telefone":"3701-0001"
 }


 }*/


