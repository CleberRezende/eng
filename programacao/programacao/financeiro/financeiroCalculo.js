module.exports = {

};


function calcular(req, callback) {

    let parcelas = req.body.parcelas,
        valorRestante = req.body.preco - req.body.entrada,
        valorParcela = 0,
        valorTotal = 0;

    switch (parcelas) {

        case 12:
            valorTotal = valorRestante + ((valorRestante * 20) / 100);
            valorParcela = valorTotal / 12;
            callback(valorParcela);
            break;


        case 24:
            valorTotal = valorRestante + ((valorRestante * 30) / 100);
            valorParcela = valorTotal / 24;
            callback(valorParcela);
            break;


        case 36:
            valorTotal = valorRestante + ((valorRestante * 40) / 100);
            valorParcela = valorTotal / 36;
            callback(valorParcela);
            break;


        case 48:
            valorTotal = valorRestante + ((valorRestante * 50) / 100);
            valorParcela = valorTotal / 48;
            callback(valorParcela);
            break;


        case 60:
            valorTotal = valorRestante + ((valorRestante * 50) / 100);
            valorParcela = valorTotal / 60;
            callback(valorParcela);
            break;

        default:

            break;

    }



}