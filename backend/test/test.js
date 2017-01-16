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
                        cor: 'Marrom2',
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
                console.log("ID " , idProvisorio);
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

        // describe('3 - Iniciando teste funcionalidade.: Cliente', function () {
        //     console.log(divisor);
        // }); // FIM [3]

        //region Finalizando Testes
        // describe('Conclusão', function () {
        //     it('Finalizando teste', function (done) {
        //         this.timeout(300);
        //         setTimeout(function () {
        //             done();
        //         }, 150);
        //         console.log(divisor);
        //     });
        // });
        // //endregion

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
 }*/
