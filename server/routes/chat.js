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
	strQuery = "SELECT room_id, product_id, group_id, profile_id FROM chat_room WHERE "
};