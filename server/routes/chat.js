var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '1234',
		database: 'kiri_otop'
	});

connection.connect();

exports.getDataRoomChat = function(req, res, next) {
	console.log('OK getDataRoomChat');
	res.send("Connect Database OK.");
};