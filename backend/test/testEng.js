//region Funcionalidade.: Departamento
describe('3 - Iniciando teste funcionalidade.: Departamento', function () {
    before(function () {
        idOption = 4;
        route = 'departamento';
    });
    after(function () {
        idItem = null;
        console.log(divisor);
    });
    it('[3.1] chamada GET - Listar todos', function (done) {
        superagent.get(localtest + route)
            .set({
                'Authentication': tokenUser,
                'Option': idOption
            })
            .send({
                'pagina': 0,
                'linhas': 0
            })
            .end(function (err, res) {
                res.status.should.be.equalOneOf(200, 204);
                if (res.status === 200)
                    idItem = res.body.result[0].idDepartamento;
                done();
            });
    });
    it('[3.2] chamada GET - Listar para DropDown', function (done) {
        superagent.get(localtest + route + 'DropDown')
            .set({
                'Authentication': tokenUser
            })
            .end(function (err, res) {
                res.status.should.be.equalOneOf(200, 204);
                done();
            });
    });
    it('[3.3] chamada GET - Listar por ID', function (done) {
        if (!idItem) {
            this.skip();
        }
        superagent.get(localtest + route + '/' + idItem)
            .set({
                'Authentication': tokenUser,
                'Option': idOption
            })
            .end(function (err, res) {
                res.status.should.be.equalOneOf(200, 204);
                done();
            });
    });
    it('[3.4] chamada POST - Inserir', function (done) {
        superagent.post(localtest + route)
            .set({
                'Content-Type': 'application/json',
                'Authentication': tokenUser,
                'Option': idOption
            })
            .send({
                'nomeDepartamento': 'Departamento Teste TDD'
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                idItem = res.headers.location.split('/');
                idItem = idItem[2];
                done();
            });
    });
    it('[3.5] chamada PUT - Atualizar', function (done) {
        superagent.put(localtest + route + '/' + idItem)
            .set({
                'Content-Type': 'application/json',
                'Authentication': tokenUser,
                'Option': idOption
            })
            .send({
                'nomeDepartamento': 'Departamento Teste Atualizado TDD'
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });
    it('[3.6] chamada PUT - Alterar Status', function (done) {
        superagent.put(localtest + route + 'Status/' + idItem)
            .set({
                'Content-Type': 'application/json',
                'Authentication': tokenUser,
                'Option': idOption
            })
            .send({
                'statusDepartamento': 'I',
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });
    it('[3.7] chamada DELETE - Excluir', function (done) {
        superagent.delete(localtest + route + '/' + idItem)
            .set({
                'Content-Type': 'application/json',
                'Authentication': tokenUser,
                'Option': idOption
            })
            .end(function (err, res) {
                res.status.should.be.equal(200);
                done();
            });
    });
});
//endregion


/*
idmetodo - idfuncionalidade - metodo - rota - verbo - requerchecagem
 59	16	acionar	/public/ping	get	N
 62	17	inserirOperadora	/operadora	post	S
 61	17	listarOperadora	/operadora	get	S
 63	17	listarOperadoraPorId	/operadora/:idOperadora	get	S
 64	17	atualizarOperadora	/operadora/:idOperadora	put	S
 19	4	excluirCluster	/cluster/:idCluster	delete	S
 7	3	login	/public/login	post	N
 51	3	listarDadosLogon	/public/login/:login	get	N
 52	3	refazLogin	/refazLogin	get	N
 54	15	listarFuncionario	/funcionario	get	S
 55	15	inserirFuncionario	/funcionario	post	S


*/