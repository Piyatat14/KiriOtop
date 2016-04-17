var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "kiri_otop"
	});

connection.connect();

var multer = require('multer');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
	
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

exports.findProfileUser = function(req, res) {
	strQuery = "SELECT profile_id, first_name, last_name, address, tel_no, user_image, can_sell FROM user_profile WHERE user_id=? LIMIT 1";
	connection.query(strQuery, req.body.userID, function(err, rows) {
		if(err) {
			console.log('err');
			throw err;
		}else {										//not error at get data.
			if(rows != '') {						//get data success.
				console.log(rows);
				res.send(rows);
			}else {
				res.send('ERROR');
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
			console.log("Filename in server : " + file.originalname);
			cb(null, req.body.userID + '-' + file.originalname + '-' + Date.now() + '.jpg'); //Appending mimeType.
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
	res.send(req.file.filename);				//return filename destination in folder uploads/img in server.
	res.status(204).end();
  })
	
};

exports.insertProfileUser = function(req, res) {
	var profileData = {
		user_id: req.body.userID,
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		address: req.body.address,
		tel_no: req.body.tel,
		user_image: req.body.imageName,
		can_sell: req.body.sell
	}
	strQuery = "INSERT INTO user_profile SET ?";
	connection.query(strQuery, profileData, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}
		
		var data = {
			profileID: rows.insertId,
			text: 'SUCCESS'
		} 
		//send profile_id after insert data.
		res.send(data);
	})
};

exports.updateProfileUser = function(req, res) {
	var profileData = {
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		address: req.body.address,
		tel_no: req.body.tel,
		user_image: req.body.imageName,
		can_sell: req.body.sell
	}
	strQuery = "UPDATE user_profile SET ? WHERE profile_id = ?";
	connection.query(strQuery, [profileData, req.body.profileID], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send('SUCCESS');
		}
	});
};

exports.sendPassword = function(req, res) {
	generateCryp(function(err, data) {
		if(err) {
			throw err;
		}
		strQuery = "UPDATE user_info SET password = ? WHERE email = ?";
		connection.query(strQuery, [data, req.body.email], function(err, rows) {
			if(err) {
				console.log(err);
				throw err;
			}else {
				//If update password user succes.
				//If have data. Server send generate password to email user.
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: 'kiriotop.server@gmail.com',
						pass: 'p@ss@dmin9999'
					}
				});

				var mailOption = {
					from: 'สมาชิก KiriOtop App <kiriotop.server@gmail.com>',
					to: req.body.email,
					subject: 'รหัสผ่านนี้เป็นเพียงรหัสผ่านชั่วคราวเท่านั้น',
					text: 'สวัสดีสมาชิก : ' + req.body.email + ' คุณได้ดำเนินการร้องขอเปลี่ยนรหัสผ่าน  อีเมล์ของคุณคือ : ' + req.body.email + ' รหัสผ่านของคุณคือ : ' + data + ' หลังจากเข้าสู่ระบบเรียบร้อยแล้ว กรุณาทำการเปลี่ยนรหัสผ่านโดยทันที ขอขอบคุณที่ไว้วางใจในการแก้ปัญหาของเรา ผู้ดูแล Kiri-Otop หากมีข้อสงสัยหรือสอบถามข้อมูลเพิ่มเติม กรุณาติดต่อ : kiriotop.server@gmail.com',
					html: '<p>สวัสดีสมาชิก : ' + req.body.email +'</p><p>คุณได้ดำเนินการร้องขอเปลี่ยนรหัสผ่าน</p><ul><li>อีเมล์ของคุณคือ : ' + req.body.email + '</li><li>รหัสผ่านของคุณคือ : ' + data + '</li></ul><p>หลังจากเข้าสู่ระบบเรียบร้อยแล้ว กรุณาเปลี่ยนรหัสผ่านโดยทันที</p><br /><br /><br /><p>ขอขอบคุณที่ไว้วางใจในการแก้ปัญหาของเรา</p><p>&nbsp;&nbsp;ผู้ดูแล Kiri-Otop</p><center><p>หากมีข้อสงสัยหรือสอบถามข้อมูลเพิ่มเติม กรุณาติดต่อ : kiriotop.server@gmail.com</p></center>'
				}

				transporter.sendMail(mailOption, function(error, info) {
					if(error) {
						console.log(error);
						throw error;
					}else {
						console.log("save password in database and send e-mail success.");
						res.send("SUCCESS");
					}
				});
			}
		});
	});
};

//function generate data 8 digits.
function generateCryp(callback) {								//call back function.
	//Random Password for send temp password to user in case recovery.
	crypto.randomBytes(4, function(err, buffer) {				//1 byte = 2 digits, 4 byte = 8 digits.
		if(err) {
			throw err;
		}
		console.log("In generate : " + buffer.toString('hex'));
		callback(null, buffer.toString('hex'));
	})
}













