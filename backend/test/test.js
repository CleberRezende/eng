const assert = require('assert'),
    http = require('http'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    should = require('should');

let idProvisorio;

var server = require('../server.js');
var request = require("request");
var caminho = 'http://localhost:3000';


describe("  Teste API...: CarroAPI", function () {

    var divisor = ' -------------------------------------------------------';

    before(function () {
        console.log('');
        console.log(divisor);
    });

    // Begin - Subindo Servidor
    describe("Servidor", function () {
        after(function () {
            console.log(divisor);
        });

        it('1 - Subindo servidor', function (done) {
            //this.timeout(server());
            this.timeout(5000);

            server();
            setTimeout(function () {
                console.log('');
                done();
            }, 800);
        });
    });
    // End - Subindo Servidor

    describe('2 - Iniciando teste funcionalidade.: Carro', function () {

        it('[2.1] chamada GET - Listar todos carros', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/carro/',
                headers: {'content-type': 'application/json'},
                json: true
            };
            request(options, function (error, response, body) {
                // console.log(response);
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

                idProvisorio = body.id;

                done();
            });
        }); // FIM it[2.2]

        it('[2.3] chamada PUT - Atualizar', function (done) {
            var options = {
                method: 'PUT',
                url: caminho + '/api/carro/' + idProvisorio,
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
                url: caminho + '/api/carro/' + idProvisorio,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[2.4]

        it('[2.5] chamada DELETE - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/carro/' + idProvisorio,
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[2.5]
    }); // FIM describe[2]

    describe('3 - Iniciando teste funcionalidade.: Cliente', function () {
        before(function () {
            console.log('');
            console.log(divisor);
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
                url: caminho + '/api/carro/50',
                headers: {'content-type': 'application/json'},
                body: {
                    nome: 'Cliente Test',
                    cpf: '11.111.111-11',
                    sexo: 'Masculino',
                    rua: 'Rua test 01',
                    bairro: 'Bairro Test',
                    cep: '14401-001',
                    complemento: 'Ap 01',
                    telefone: '3701-0001'
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[3.2]

        it('[3.3] chamada PUT - Atualizar', function (done) {
            var options = {
                method: 'PUT',
                url: caminho + '/api/carro/50',
                headers: {'content-type': 'application/json'},
                body: {
                    nome: 'Cliente Test PUT',
                    cpf: '11.111.111-001',
                    sexo: 'Feminino',
                    rua: 'Rua test 011',
                    bairro: 'Bairro Test 01',
                    cep: '14401-011',
                    complemento: 'Ap 0111',
                    telefone: '3701-0111'
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
                url: caminho + '/api/carro/50',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[3.4]

        it('[3.5] chamada DELETE - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/carro/50',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[3.5]
    }); // FIM describe[3]

    describe('4 - Iniciando teste funcionalidade.: Financeiro', function () {
        before(function () {
            console.log('');
            console.log(divisor);
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

        it('[4.2] chamda POST Adicionar novo financeiro', function (done) {
            var options = {
                method: 'POST',
                url: caminho + '/api/financeiro/',
                headers: {'content-type': 'application/json'},
                body: {
                    valorParcela: '',
                    parcelas: '',
                    percentual: '',
                    vencimento: ''
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
                url: caminho + '/api/financeiro/:id',
                headers: {'content-type': 'application/json'},
                body: {
                    valorParcela: '',
                    parcelas: '',
                    percentual: '',
                    vencimento: ''
                },
                json: true
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM PUT


        it('[4.4] chamada GET :id - Buscar cliente expecifico', function (done) {
            var options = {
                method: 'GET',
                url: caminho + '/api/financeiro/:id',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[4.4]

        it('[4.5] chamada DELETE - Excluir', function (done) {
            var options = {
                method: 'DELETE',
                url: caminho + '/api/financeiro/:id',
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                response.statusCode.should.be.equal(200);
                done();
            });
        }); // FIM it[4.5]
    }); // FIM describe[4]

    //region Finalizando Testes
    describe('Conclusão', function () {
        it('Finalizando teste', function (done) {
            this.timeout(300);
            setTimeout(function () {
                done();
            }, 150);
            console.log(divisor);
        });
    });
    //endregion

}); // FIM Teste API

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


