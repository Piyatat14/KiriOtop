angular.module('starter.userCtrl', [])

.controller('LoginCtrl', function($scope, $http, $ionicPopup, $ionicModal, $timeout, Authen, $state) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
  	}).then(function(modal) {
    	$scope.modal = modal;
  	});

	// Triggered in the login modal to close it
 	$scope.closeLogin = function() {
    	$scope.modal.hide();
  	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log($scope.loginData);
		$http
		.post('/findUsers', $scope.loginData)
		.success(function(response) {
			if(response == "ชื่อผู้ใช้หรือรหัสผ่านผิด..กรุณากรอกใหม่" || response == "ไม่พบชื่อผู้ใช้และรหัสผ่าน..กรุณากรอกใหม่"){
				var popup = $ionicPopup.alert({
					title: 'การเข้าสู่ระบบผิดพลาด',
					subTitle: response
				});
			}else{
				Authen.setUser({
					userID : response[0].user_id,
					email : response[0].email
				});
				$scope.closeLogin();
				$state.go('app.playlists');
			}
		})
	};

	$scope.logout = function() {
		Authen.logout();
		$state.go('app.playlists');
		console.log(Authen.getUser());
	};

})

.controller('registerCtrl', function($scope, $http, $ionicPopup) {
	$scope.registerData = {};
	$scope.insertRegis = function() {
		if($scope.registerData.password != $scope.registerData.rePassword){
			$ionicPopup.alert({
				title: 'สมัครสมาชิกผิดพลาด',
				subTitle: 'รหัสผ่านไม่ตรงกัน..กรุณากรอกใหม่'
			});
		}else{
			$http
			.post('/checkRegister', $scope.registerData)
			.success(function(response) {
				if(response == "Success"){
					$http
					.post('/insertRegister', $scope.registerData)
					.success(function(response) {
						$scope.login();
					})
				}else{
					$ionicPopup.alert({
						title: 'สมัครสมาชิกผิดพลาด',
						subTitle: response
					});
				}
			})
		}
	};
})