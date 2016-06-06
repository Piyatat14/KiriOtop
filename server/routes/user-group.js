var mysql = require('mysql'),
	strQuery = "",
	/*
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "kiri_otop"
	});
	*/
	connection = mysql.createConnection({
		host: "104.199.134.131",
		port: 3306,
		user: "admin",
		password: "admin",
		database: "kiri_otop"
	});

connection.connect();

var multer = require('multer');

exports.getUserGroupForProduct = function(req, res) {
	strQuery = "SELECT group_id, group_name FROM user_group WHERE profile_id=?";
	connection.query(strQuery, [req.query.pId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getUserGroup = function(req, res) {
	strQuery = "SELECT user_group.group_id, user_group.profile_id, user_group.group_name, user_group_image.image FROM user_group LEFT JOIN user_group_image ON user_group.group_id = user_group_image.group_id WHERE user_group.profile_id=? GROUP BY user_group.group_id";
	connection.query(strQuery, [req.query.pId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertUserGroup = function(req, res) {
	var userGroupData = {
		profile_id : req.body.idProfile,
		group_name : req.body.nameGroup,
		address_location : req.body.place,
		address_lat : req.body.lat,
		address_lng : req.body.lng,
		tel_no : req.body.telephone
	}
	strQuery = "INSERT INTO user_group SET ?";
	connection.query(strQuery, userGroupData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertImageUserGroup = function(req, res) {
	var imageUserGroupData = {
		group_id : req.body.group_id,
		image: req.body.image
	}
	strQuery = "INSERT INTO user_group_image SET ?";
	connection.query(strQuery, imageUserGroupData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.editUserGroup = function(req, res) {
	strQuery = "SELECT user_group.group_id, user_group.profile_id, user_group.group_name, user_group.address_location, user_group.address_lat, user_group.address_lng, user_group.tel_no, user_group_image.group_image_id, user_group_image.image FROM user_group LEFT JOIN user_group_image ON user_group.group_id = user_group_image.group_id WHERE user_group.profile_id=? AND user_group.group_id=?";
	connection.query(strQuery, [req.query.pId, req.query.groupId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.editDeleteImage = function(req, res) {
	strQuery = "DELETE FROM user_group_image WHERE group_image_id=?";
	connection.query(strQuery, [req.query.image_id], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.editAllDeleteImage = function(req, res) {
	strQuery = "DELETE FROM user_group_image WHERE group_id=?";
	connection.query(strQuery, [req.query.group_id], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.updateUserGroup = function(req, res) {
	var updateUserGroupData = {
		profile_id : req.body.idProfile,
		group_name : req.body.nameGroup,
		address_location : req.body.placeGroup,
		address_lat : req.body.placeLat,
		address_lng : req.body.placeLng,
		tel_no : req.body.telephone
	}
	strQuery = "UPDATE user_group SET ? WHERE group_id=?";
	connection.query(strQuery, [updateUserGroupData, req.body.idGroup], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.checkDeleteUsergroup = function(req, res) {
	strQuery = "SELECT product.product_id FROM product WHERE product.group_id = ?";
	connection.query(strQuery, [req.query.grpId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.deleteUsergroup = function(req, res) {
	strQuery = "DELETE user_group.*, user_group_image.* FROM user_group LEFT JOIN user_group_image ON user_group.group_id = user_group_image.group_id WHERE user_group.group_id = ?";
	connection.query(strQuery, [req.query.grpId], function(err, rows){
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
			cb(null, file.originalname + '.jpg'); //Appending mimeType.
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













