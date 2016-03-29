var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "1234",
		database : "kiri_otop"
	});

connection.connect();
	
exports.getProducts = function(req, res, next) {
	strQuery = "SELECT * FROM product";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			console.log("OK");
			res.send(rows);
		}
	});
};

exports.getProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.group_id, product.product_user_id, product.product_name, product.product_price, product.product_rating, product.product_view, product.product_amount, product.release_date FROM product JOIN product_image ON product.product_id = product_image.product_id AND product.profile_id=?";
	connection.query(strQuery, [req.query.pId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			console.log("OK");
			res.send(rows);
		}
	});
};