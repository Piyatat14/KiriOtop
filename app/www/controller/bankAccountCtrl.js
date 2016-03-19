angular.module('starter.bankAccountCtrl', [])

	.controller('bankCtrl', function($scope, $http, urlService, Authen, $ionicModal){
		$scope.bankData = {};

		$scope.getDataBanks = function() {
			$http
				.get(urlService.getBaseUrl() + '/getBanks', {params: {bId: '1'}})
				.success(function(response) {
					$scope.allBanks = response;
					console.log($scope.allBanks);
				})
		}
		$scope.getDataBanks();

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/addBankAccount.html', {
			scope: $scope
	  	}).then(function(modal) {
	    	$scope.modal = modal;
	  	});

		// Triggered in the login modal to close it
	 	$scope.closeBankAccount = function() {
	    	$scope.modal.hide();
	  	};

		// Open the login modal
		$scope.openBankAccount = function(bank_id) {
			$scope.bank_account_id = bank_id;
			for(var i=0; i<$scope.allBanks.length; i++){
				if($scope.allBanks[i].logo_bank_id == bank_id){
					$scope.bankData.bookId = $scope.allBanks[i].book_bank_id;
					$scope.bankData.bankName = $scope.allBanks[i].logo_bank_name;
					$scope.bankData.bankAccount = $scope.allBanks[i].book_bank_account;
					$scope.bankData.accountName = $scope.allBanks[i].book_bank_name;
					$scope.bankData.bankBranch = $scope.allBanks[i].book_bank_branch;
				}
			}
			$scope.modal.show();
			// $scope.bankData.bankAccountId = bank_id;
			// $scope.bankData.userData = Authen.getUser();
			// $http
			// .post(urlService.getBaseUrl() + '/getUserBankAccount', $scope.bankData)
			// .success(function(response) {

			// })
			// $scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doBankAccount = function(bank_id) {
			$scope.bankData.bank_logo_id = bank_id;
			if($scope.bankData.bookId == null){
				$http
					.post(urlService.getBaseUrl() + '/insertBankAccounts', $scope.bankData)
					.success(function(response) {
						$scope.modal.hide();
						$scope.getDataBanks();
					})
			}else{
				$http
					.put(urlService.getBaseUrl() + '/updateBankAccounts', $scope.bankData)
					.success(function(response) {
						$scope.modal.hide();
						$scope.getDataBanks();
					})
			}
		};

		$scope.logout = function() {

		};
	});
	// $scope.getBankAccountById = function($scope, $http){
		
	// }