var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "kiri_otop"
	});

connection.connect();
	
exports.getOrderBuyer = function(req, res, next) {
	strQuery = "SELECT order_buyer.order_buyer_id, order_buyer.product_id, order_buyer.profile_id, order_buyer.order_id, order_buyer.order_amount, order_buyer.date_of_within, order_buyer.buyer_status_name, order_buyer.order_date, product.product_name, product.product_price, product_image.image, user_profile.first_name FROM order_buyer JOIN product ON order_buyer.product_id = product.product_id LEFT JOIN product_image ON order_buyer.product_id = product_image.product_id JOIN user_profile ON order_buyer.profile_id = user_profile.profile_id GROUP BY order_buyer.product_id";
	connection.query(strQuery, req.query.pfId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.updateStatusAll = function(req, res, next) {
	var status = {
		buyer_status_name : req.body.statusOrder
	}
	strQuery = "UPDATE order_buyer SET ? WHERE order_buyer_id=?";
	connection.query(strQuery, [status, req.body.orderId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.insertOrderDetail = function(req, res, next) {
	var statusNDate = {
		order_buyer_id : req.body.orderId,
		order_before_status : req.body.bStatus,
		order_after_status : req.body.aStatus,
		order_log_date : req.body.logDate,
		profile_id : req.body.pId
	}
	strQuery = "INSERT INTO order_log SET ?";
	connection.query(strQuery, statusNDate, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.getOrderLog = function(req, res, next) {
	strQuery = "SELECT order_log.order_log_id, order_log.order_buyer_id, order_log.order_before_status, order_log.order_after_status, order_log.order_log_date, user_profile.first_name FROM order_log JOIN user_profile ON order_log.profile_id = user_profile.profile_id WHERE order_log.order_buyer_id=?";
	//JOIN order_buyer ON order_log.order_buyer_id = order_buyer.order_buyer_id
	connection.query(strQuery, req.query.orderId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getOrderSeller = function(req, res, next) {
	strQuery = "SELECT user_group.group_id, order_buyer.order_buyer_id, order_buyer.product_id, order_buyer.profile_id, order_buyer.order_id, order_buyer.order_amount, order_buyer.date_of_within, order_buyer.buyer_status_name, order_buyer.order_date, product.product_name, product.product_price, product_image.image, user_profile.first_name FROM user_group JOIN order_buyer ON user_group.group_id = order_buyer.group_id JOIN product ON order_buyer.product_id = product.product_id LEFT JOIN product_image ON order_buyer.product_id = product_image.product_id JOIN user_profile ON order_buyer.profile_id = user_profile.profile_id WHERE user_group.profile_id=? GROUP BY order_buyer.product_id";
	connection.query(strQuery, req.query.pfId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getBankInOrder = function(req, res, next) {
	strQuery = "SELECT book_bank.book_bank_id, book_bank.book_bank_account, logo_bank.logo_bank_name FROM book_bank JOIN logo_bank ON book_bank.logo_bank_id = logo_bank.logo_bank_id WHERE book_bank.profile_id=?";
	connection.query(strQuery, req.query.profId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertRatingComment = function(req, res, next) {
	var ratingData = {
		product_id : req.body.prodId,
		profile_id : req.body.pId,
		rating : req.body.rating,
		comment : req.body.tComment,
		comment_date : req.body.rDate,
	}
	strQuery = "INSERT INTO user_product_rating SET ?";
	connection.query(strQuery, ratingData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};