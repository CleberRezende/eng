module.exports = function () {

    const
        express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        request = require('request'),
        http = require('http');

    var app = express();

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


    require('./routes/carroRoute.js')(app);
    require('./routes/clienteRoute.js')(app);
    require('./routes/financeiroRoute.js')(app);

// load('models').then('controllers').then('routes').into(app);

    app.listen(3000, () => { // app.listen(3000)
        console.log('    Server Localhost:3000 server.js');
    });
}
