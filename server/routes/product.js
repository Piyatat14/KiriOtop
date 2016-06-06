var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "admin",
		database: "kiri_otop"
	});

connection.connect();
	
exports.recommendProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id LIMIT 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.salableProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product.product_view, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id ORDER BY product.product_rating DESC, product.product_view DESC LIMIT 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.newProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product.product_view, product.release_date, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id ORDER BY product.release_date DESC LIMIT 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.recommendAllProduct = function(req, res, next) {
	var dataOffset = req.query.offset;
	if(dataOffset == undefined){
		dataOffset = 0;
	}
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product.product_view, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id LIMIT "+dataOffset+", 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.salableAllProduct = function(req, res, next) {
	var dataOffset = req.query.offset;
	if(dataOffset == undefined){
		dataOffset = 0;
	}
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product.product_view, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id ORDER BY product.product_rating DESC, product.product_view DESC LIMIT "+dataOffset+", 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.newAllProduct = function(req, res, next) {
	var dataOffset = req.query.offset;
	if(dataOffset == undefined){
		dataOffset = 0;
	}
	strQuery = "SELECT product.product_id, product.profile_id, product.product_name, product.product_price, product.product_rating, product.product_view, product.release_date, product_image.image, user_profile.first_name FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id GROUP BY product.product_id ORDER BY product.release_date ASC LIMIT "+dataOffset+", 10";
	connection.query(strQuery, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getDetailProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.group_id, product.product_user_id, product.product_name, product.product_detail, product.product_price, product.product_rating, product.product_view, product.product_amount, product.product_stock, product.release_date, product_image.image, user_profile.profile_id, user_profile.first_name, user_group.group_id, user_group.group_name, user_group.group_id, user_group.address_location, user_group.address_lat, user_group.address_lng, user_group.tel_no FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id JOIN user_profile ON product.profile_id = user_profile.profile_id JOIN user_group ON product.group_id = user_group.group_id WHERE product.product_id=?";
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

exports.getProduct = function(req, res, next) {
	strQuery = "SELECT product.product_id, product.profile_id, product.group_id, product.product_user_id, product.product_name, product.product_price, product.product_rating, product.product_view, product.product_amount, product.release_date, product_image.image FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id WHERE product.profile_id=? AND product.product_status='คงเหลือ' GROUP BY product.product_id";
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

exports.insertProduct = function(req, res, next) {
	var productData = {
		profile_id : req.body.idProfile,
		group_id : req.body.idGroup,
		product_user_id : req.body.productId,
		product_name : req.body.productName,
		product_detail : req.body.productOfDetail,
		product_category : req.body.categoryText,
		product_price : req.body.productPrice,
		product_rating : '0',
		product_view : '0',
		product_status : 'คงเหลือ',
		product_amount : req.body.productAmount,
		product_stock : req.body.productStock,
		release_date : req.body.dateRelease
	}
	strQuery = "INSERT INTO product SET ?";
	connection.query(strQuery, productData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertImageProduct = function(req, res) {
	var imageUserGroupData = {
		product_id : req.body.product_id,
		image: req.body.image
	}
	strQuery = "INSERT INTO product_image SET ?";
	connection.query(strQuery, imageUserGroupData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.editProduct = function(req, res) {
	strQuery = "SELECT product.product_id, product.profile_id, product.group_id, product.product_user_id, product.product_name, product.product_detail, product.product_price, product.product_category, product.product_rating, product.product_view, product.product_amount, product.product_stock, product.release_date, product_image.image FROM product LEFT JOIN product_image ON product.product_id = product_image.product_id WHERE product.profile_id=? AND product.product_id=?";
	connection.query(strQuery, [req.query.pId, req.query.productId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.editProductImageDelete = function(req, res) {
	strQuery = "DELETE FROM product_image WHERE product_id=?";
	connection.query(strQuery, [req.query.pId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.updateProduct = function(req, res) {
	var updateProductData = {
		profile_id : req.body.idProfile,
		group_id : req.body.idGroup,
		product_user_id : req.body.productId,
		product_name : req.body.productName,
		product_detail : req.body.productOfDetail,
		product_category : req.body.categoryText,
		product_price : req.body.productPrice,
		product_stock : req.body.productStock,
		product_amount : req.body.productAmount
	}
	strQuery = "UPDATE product SET ? WHERE product_id=?";
	connection.query(strQuery, [updateProductData, req.body.primaryProduct], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.insertImageProduct = function(req, res) {
	var imageProducts = {
		product_id : req.body.product_id,
		image: req.body.image
	}
	strQuery = "INSERT INTO product_image SET ?";
	connection.query(strQuery, imageProducts, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.buildOrderId = function(req, res) {
	strQuery = "SELECT order_id FROM order_buyer ORDER BY order_id DESC LIMIT 1";
	connection.query(strQuery, [req.query.prodId, req.query.profId, req.query.gId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertOrderBuyer = function(req, res) {
	var orderData = {
		product_id : req.body.productId,
		profile_id : req.body.idProfile,
		group_id : req.body.groupId,
		order_id : req.body.orderId,
		order_amount : req.body.orderAmount,
		date_of_within : req.body.dateWithIn,
		buyer_status_name : 'รอการยืนยัน',
		product_order_price : '1',
		order_date : req.body.orderDate
		
	}
	strQuery = "INSERT INTO order_buyer SET ?";
	connection.query(strQuery, orderData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.insertOrderSeller = function(req, res) {
	var orderData = {
		order_buyer_id : req.body.sId,
		profile_id : req.body.profId,
		seller_status_name : 'รอการยืนยัน'
	}
	strQuery = "INSERT INTO order_seller SET ?";
	connection.query(strQuery, orderData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.getRatingProduct = function(req, res) {
	var dataOffset = req.query.offset;
	var maxLimit = req.query.limit;
	if(dataOffset == undefined && maxLimit == undefined){
		dataOffset = 0;
		maxLimit = 3;
	}
	strQuery = "SELECT user_product_rating.profile_id, user_product_rating.rating, user_product_rating.comment, user_product_rating.comment_date, user_profile.first_name, user_profile.last_name, user_profile.user_image FROM user_product_rating JOIN user_profile ON user_product_rating.profile_id = user_profile.profile_id WHERE user_product_rating.product_id=? LIMIT "+dataOffset+", "+maxLimit;
	connection.query(strQuery, req.query.pId, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
			console.log(rows);
		}
	});
};

exports.getViewProfile = function(req, res) {
	strQuery = "SELECT profile_id, first_name, last_name, address, tel_no, user_image FROM user_profile WHERE profile_id=?";
	connection.query(strQuery, req.query.profId, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getViewUserGroup = function(req, res) {
	strQuery = "SELECT user_group.group_id, user_group.group_name, user_group.address_location, user_group.tel_no FROM user_group LEFT JOIN user_group_image ON user_group.group_id = user_group_image.group_id WHERE user_group.group_id=?";
	connection.query(strQuery, req.query.gId, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.checkRatingProduct = function(req, res) {
	strQuery = "SELECT order_buyer.order_buyer_id, user_profile.first_name, user_profile.last_name, user_profile.user_image FROM order_buyer LEFT JOIN user_profile ON order_buyer.profile_id = user_profile.profile_id WHERE order_buyer.buyer_status_name='ได้รับของ' AND order_buyer.product_id=? AND order_buyer.profile_id=?";
	connection.query(strQuery, [req.query.pId, req.query.profId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.getOnlyOneRatingProduct = function(req, res) {
	strQuery = "SELECT user_product_rating.user_product_rating_id, user_product_rating.profile_id, user_product_rating.rating, user_product_rating.comment, user_product_rating.comment_date, user_profile.first_name, user_profile.last_name, user_profile.user_image FROM user_product_rating JOIN user_profile ON user_product_rating.profile_id = user_profile.profile_id WHERE user_product_rating.product_id=? AND user_product_rating.profile_id=? LIMIT 1";
	connection.query(strQuery, [req.query.pId, req.query.profId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.deleteOnlyOneRatingComment = function(req, res) {
	strQuery = "DELETE FROM user_product_rating WHERE user_product_rating_id=?";
	connection.query(strQuery, [req.query.ratId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.editOnlyOneRatingComment = function(req, res) {
	var ratData = {
		rating : req.body.rating,
		comment : req.body.tComment,
		comment_date : req.body.rDate
	}
	strQuery = "UPDATE user_product_rating SET ? WHERE user_product_rating_id=?";
	connection.query(strQuery, [ratData, req.body.ratId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.checkBeforeDelete = function(req, res) {
	strQuery = "SELECT product.product_id FROM product JOIN order_buyer ON product.product_id = order_buyer.product_id WHERE order_buyer.buyer_status_name<>'ได้รับของ' AND product.product_id=?";
	connection.query(strQuery, [req.query.prodId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.deleteProduct = function(req, res) {
	var stat = {
		product_status : "หมด"
	}
	strQuery = "UPDATE product SET ? WHERE product_id=?";
	connection.query(strQuery, [stat, req.body.prodId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.getAverageRating = function(req, res) {
	strQuery = "SELECT rating FROM user_product_rating WHERE product_id=?";
	connection.query(strQuery, [req.query.pId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send(rows);
		}
	});
};

exports.increaseViewer = function(req, res) {
	var productId = req.query.pId
	strQuery = "SELECT product_view FROM product WHERE product_id=?";
	connection.query(strQuery, [productId], function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}else {
			rows[0].product_view++;
			var increase = {
				product_view : rows[0].product_view
			};
			strQuery2 = "UPDATE product SET ? WHERE product_id=?";
			connection.query(strQuery2, [increase, productId], function(err, rows) {
				if(err) {
					console.log(err);
					throw err;
				}else {
					res.send(increase);
				}
			});
		}
	});
};