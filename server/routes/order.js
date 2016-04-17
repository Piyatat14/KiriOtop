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
	strQuery = "SELECT order_buyer.order_buyer_id, order_buyer.product_id, order_buyer.profile_id, order_buyer.order_id, order_buyer.order_amount, order_buyer.date_of_within, order_buyer.buyer_status_name, order_buyer.order_date, product.product_name, product.product_price, product_image.image, user_profile.first_name FROM order_buyer JOIN product ON order_buyer.product_id = product.product_id JOIN product_image ON order_buyer.product_id = product_image.product_id JOIN user_profile ON order_buyer.profile_id = user_profile.profile_id GROUP BY order_buyer.product_id";
	connection.query(strQuery, req.query.pfId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.updateStatusConfirm = function(req, res, next) {
	var status = {
		buyer_status_name : 'รอสินค้า'
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

exports.updateStatusGot = function(req, res, next) {
	var status = {
		buyer_status_name : 'ได้รับของ'
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

exports.updateStatusCancel = function(req, res, next) {
	var status = {
		buyer_status_name : 'ยกเลิกรายการ'
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
		buyer_status_name : req.body.aStatus,
		order_log_date : req.body.ldate
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