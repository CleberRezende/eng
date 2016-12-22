const express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/carroRoute.js')(app);

app.listen(3000, () => {
    console.log('Server Localhost:3000');
});