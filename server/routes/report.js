var mysql = require('mysql'),
	strQuery = "",
	connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "1234",
		database : "kiri_otop"
	});

connection.connect();
	
exports.insertReportProduct = function(req, res) {
	var reportProductData = {
		user_id : '1',
		product_id : req.body.idGroup,
		log_comment : req.body.productId,
		log_date : req.body.productName,
	}
	strQuery = "INSERT INTO admin_log SET ?";
	connection.query(strQuery, [reportProductData], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};