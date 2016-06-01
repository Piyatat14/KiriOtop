var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "kiri_otop"
	});

connection.connect();
	
exports.getReportProduct = function(req, res, next) {
	strQuery = "SELECT admin_log.product_id, admin_log.log_comment, admin_log.log_date, user_profile.user_id, user_profile.first_name, user_profile.last_name, user_info.email, user_info.user_status FROM admin_log LEFT JOIN product ON admin_log.product_id = product.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id JOIN user_info ON admin_log.user_id = user_info.user_id";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.updateBanUser = function(req, res, next) {
	console.log(req.body.userId);
	strQuery = "UPDATE user_info SET user_status=? WHERE user_id=?";
	connection.query(strQuery, ['ไม่สามารถใช้งานได้', req.body.userId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.updateUnbanUser = function(req, res, next) {
	strQuery = "UPDATE user_info SET user_status=? WHERE user_id=?";
	connection.query(strQuery, ['ใช้งานได้', req.body.userId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.findUserAdmin = function(req, res, next) {
	var users = req.body.user;
	var passs = req.body.pass;
	strQuery = "SELECT admin_id, username, password FROM admin_info WHERE username=? AND password=? LIMIT 1";
	connection.query(strQuery, [users, passs], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			if(rows != ''){
				if(users !== rows[0].username){
					res.send('user wrong');
				}else if(passs !== rows[0].password){
					res.send('pass wrong');
				}else{
					res.send(rows);
				}
			}else{
				res.send('not found');
			}
		}
	});
};