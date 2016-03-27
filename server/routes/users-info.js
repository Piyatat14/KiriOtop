var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "1234",
		database : "kiri_otop"
	});

connection.connect();

var multer = require('multer');
	
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
	strQuery = "SELECT user_id, email FROM user_info WHERE email=?";
	connection.query(strQuery, req.body.email, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			if(rows != ""){
				res.send("ชื่อผู้ใช้ซ้ำ..กรุณากรอกใหม่");
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
		user_status : "User"
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

exports.addImage = function(req, res) {
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/img');
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname + '-' + Date.now() + '.jpg'); //Appending mimeType.
		}
	});

	var upload = multer({ storage: storage }).single('image');

	upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      res.send('Error: ' + err.message);
    }
    // Everything went fine
	console.log(req.body);
	console.log(req.file);
	res.status(204).end();
  })
	
};













