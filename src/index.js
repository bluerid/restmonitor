//BASE SETUP///
//===========//
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const bearsRoutes = require('./app/routes/bears');
var port = process.env.PORT || 8080;

app.use('/api', bearsRoutes(app));
app.listen(port);
