var mysql = require('mysql'),
	strQuery = "",
	/*
	connection = mysql.createConnection({
		host : "us-cdbr-iron-east-03.cleardb.net",
		user : "bdbd8affec3e86",
		password : "1252ed96",
		database : "heroku_5d02e003c9e3105"
	});
	*/
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "kiri_otop"
	});

connection.connect();
	
exports.getBank = function(req, res) {
	strQuery = "SELECT logo_bank.logo_bank_id, logo_bank.logo_bank_name, book_bank.book_bank_id, book_bank.profile_id, book_bank.book_bank_account, book_bank.book_bank_name, book_bank.book_bank_branch FROM logo_bank LEFT JOIN book_bank ON logo_bank.logo_bank_id = book_bank.logo_bank_id AND book_bank.profile_id=?";
	connection.query(strQuery, [req.query.bId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			console.log("OK");
			res.send(rows);
		}
	});
};

exports.insertBankAccount = function(req, res) {
	var bankAccountData = {
		profile_id : '1',
		logo_bank_id : req.body.bank_logo_id,
		book_bank_account : req.body.bankAccount,
		book_bank_name : req.body.accountName,
		book_bank_branch : req.body.bankBranch
	}
	strQuery = "INSERT INTO book_bank SET ?";
	connection.query(strQuery, bankAccountData, function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};

exports.updateBankAccount = function(req, res) {
	var bankAccountData = {
		book_bank_account : req.body.bankAccount,
		book_bank_name : req.body.accountName,
		book_bank_branch : req.body.bankBranch
	}
	strQuery = "UPDATE book_bank SET ? WHERE book_bank_id=?";
	connection.query(strQuery, [bankAccountData, req.body.bookId], function(err, rows){
		if(err) {
			console.log(err);
			throw err;
		}else {
			res.send("Success");
		}
	});
};