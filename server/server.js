// grab the packages we need
var express = require('express'),
	bodyParser = require('body-parser'),
    users = require('./routes/users-info'),
    products = require('./routes/product'),
    app = express(),
	directory = "../app";

app.use(express.static(directory + "/www"));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
app.set('port', process.env.PORT || 8100);

//get all attribute of product
app.get('/products', products.getProduct);
//Where and get user and password
app.post('/findUsers', users.findUser);
//Check Email Register
app.post('/checkRegister', users.checkRegis);
//Insert Register
app.post('/insertRegister', users.insertRegis);


app.listen(app.get('port'), function() {
	// start the server
	console.log('Server started! At http://localhost:' + app.get('port'));
});