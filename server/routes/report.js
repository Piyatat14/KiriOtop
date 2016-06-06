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
	
exports.insertReportProduct = function(req, res) {
	var reportProductData = {
		user_id : req.body.userID,
		product_id : req.body.productId,
		admin_id : '1',
		log_comment : req.body.reportProduct,
		log_date : req.body.logDate,
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