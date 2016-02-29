var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "1234",
		database : "kiri_otop"
	});

connection.connect();
	
exports.findUser = function(req, res) {
	var emailUser = req.body.username;
	var passUser = req.body.password;
	strQuery = "SELECT user_id, email, password, register_date, user_status FROM user_info WHERE email=? AND password=? LIMIT 1";
	connection.query(strQuery, [emailUser, passUser], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			if(rows != ""){
				if(emailUser == rows[0].email && passUser == rows[0].password){
					console.log(rows);
					res.send(rows);
				}else{
					res.send('ชื่อผู้ใช้หรือรหัสผ่านผิด..กรุณากรอกใหม่');
				}
			}else{
				res.send('ไม่พบชื่อผู้ใช้และรหัสผ่าน..กรุณากรอกใหม่');
			}
		}
	});
};

exports.checkRegis = function(req, res) {
	var email = req.body.email;
	strQuery = "SELECT user_id, email FROM user_info WHERE email=?";
	connection.query(strQuery, email, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			if(rows != ""){
				res.send("อีเมลนี้มีผู้ใช้แล้ว..กรุณากรอกใหม่");
			}else{
				res.send("Success");
			}
		}
	});
};

exports.insertRegis = function(req, res) {
	var regisData = {
		email : req.body.email,
		password : req.body.password,
		register_date : new Date(),
		user_status : "test"
	}
	strQuery = "INSERT INTO user_info SET ?";
	connection.query(strQuery, regisData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};