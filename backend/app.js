const 
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// // app.set('views', __dirname, 'views');
// app.set('view engine', 'html');
// app.use(express.static("c:\\Users\\cleber\\Desktop\\carros02\\eng\\html\\view"));
// // app.use(express.static(__dirname ,  '../view' ));


require('./routes/carroRoute.js')(app);
require('./routes/clienteRoute.js')(app);
require('./routes/financeiroRoute.js')(app);

// load('models').then('controllers').then('routes').into(app);

app.listen(3000, () => {
    console.log('Server Localhost:3000');
});
