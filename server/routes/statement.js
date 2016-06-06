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

exports.getProductStatement = function(req, res, next) {
	strQuery = "SELECT order_buyer.order_amount, order_buyer.order_date, product.product_name, product.product_price, user_profile.first_name, user_profile.last_name FROM order_buyer JOIN product ON order_buyer.product_id = product.product_id JOIN user_profile ON order_buyer.profile_id = user_profile.profile_id JOIN order_seller ON order_buyer.order_buyer_id = order_seller.order_buyer_id WHERE order_buyer.buyer_status_name = 'รอสินค้า' AND order_seller.profile_id = ? AND MONTH(order_buyer.order_date) = ?";
	connection.query(strQuery, [req.query.profId, req.query.dateState], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};