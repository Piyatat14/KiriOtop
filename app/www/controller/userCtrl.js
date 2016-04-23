angular.module('starter.userCtrl', [])


.controller('LoginCtrl', function($scope, $http, $ionicPopup, $ionicModal, $timeout, Authen, Users, urlService, $state, $ionicHistory, $crypto) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	//save user data
	$scope.dataUser;

	// Form data for the login modal
	$scope.loginData = {};

	$ionicHistory.nextViewOptions({
		disableBack: true
	});
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

	//check email is valid for show error in view page.
	$scope.checkEmail = true;

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		//$scope.loginData.encrypted = $crypto.encrypt($scope.loginData.password);
		$http
		.post(urlService.getBaseUrl() + '/findUsers', $scope.loginData)
		.success(function(response) {
			if(response == "ERROR") {
				$ionicPopup.alert({
					title: 'การเข้าสู่ระบบผิดพลาด',
					template: "ไม่พบชื่อผู้ใช้ กรุณาตรวจสอบอีกครั้ง",
					okText: 'ตกลง',
					okType: 'button-assertive'
				});
			}else {
				var loginPass = null;
				//If password in database not server assign.
				if(response[0].password.length > 8) {
					//Decryption password for check valid.
					loginPass = $crypto.decrypt(response[0].password);
				}else {										//Password is server generate in case forget password.
					loginPass = response[0].password;
;				}

				if(loginPass == $scope.loginData.password) {
					//login success Authen set user detail.
					Authen.setUser({
						userID : response[0].user_id,
						email : response[0].email
					});
					$scope.dataUser = Authen.getUser();

					//get profile_id each user.
					$http.post(urlService.getBaseUrl() + '/findProfileUsers', $scope.dataUser)
						.success(function(res) {
							//if profile_id for user is have.But not have Users.getUserData equal undefined
							if(res !== 'ERROR' && Users.getUserData() === undefined) {
								//set cookie for user about profile data.
								Users.setUserData({
									profileID: res[0].profile_id
								});
							}
						}
					);

					$scope.closeLogin();
					$state.go('app.product', {}, {reload:true});
				}else {
					$ionicPopup.alert({
						title: 'การเข้าสู่ระบบผิดพลาด',
						template: "รหัสผ่านผิดพลาด กรุณาตรวจสอบอีกครั้ง",
						okText: 'ตกลง',
						okType: 'button-assertive'
					});
				}
			}
		}).error(function(err) {
			console.log('Error: ' + err);
		})
	};

	$scope.logout = function() {
		Authen.logout();
		Users.removeUserData();
		$state.go('app.product', {}, {reload:true});
		$scope.dataUser = Authen.getUser();
		console.log(Authen.getUser());
	};

	$scope.sendPassword = function(email) {
		$scope.checkEmail = {};
		//If email is valid.
		if(email !== undefined && email !== "") {
			$scope.checkEmail.status = true;
			$scope.checkEmail.username = email;
			//Check email have in app.
			$http.post(urlService.getBaseUrl() + '/findUsers', $scope.checkEmail)
			.success(function(res) {
				if(res != "ERROR") {
					$http.post(urlService.getBaseUrl() + '/sendPasswords', {'email' : email}).success(function(response) {
						if(response == "SUCCESS") {
							$ionicPopup.alert({
								'title' : 'ส่งรหัสผ่านเรียบร้อยแล้ว',
								'template' : 'กรุณารอรับอีเมล์จากระบบ',
								'okText' : 'ตกลง'
							}).then(function(res) {
								console.log('Send E-mail complete.');
							});
						}
					}).error(function(err) {
						console.log(err);
					})
				}else {							//Email not found.
					$ionicPopup.alert({
						title: 'ผิดพลาด',
						template: 'ไม่พบอีเมล์ดังกล่าว กรุณาตรวจสอบอีกครั้ง',
						okText: 'ตกลง',
						okType: 'button-assertive'
					});
				}
			}).error(function(err) {
				console.log(err);
				$ionicPopup.alert({
						title: 'ผิดพลาด',
						template: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
						okText: 'ตกลง',
						okType: 'button-assertive'
					});
			});
		}else {
			$scope.checkEmail.status = false;
		}
	};

})

.controller('registerCtrl', function($scope, $http, $ionicPopup, urlService, $ionicHistory, $state, $crypto) {
	$ionicHistory.nextViewOptions({
		disableBack: true
	});
	$scope.registerData = {};
	$scope.insertRegis = function() {
		if($scope.registerData.password != $scope.registerData.rePassword){
			$ionicPopup.alert({
				title: 'สมัครสมาชิกผิดพลาด',
				template: 'รหัสผ่านไม่ตรงกัน..กรุณากรอกใหม่',
				okText: 'ตกลง',
				okType: 'button-assertive'
			});
		}else{
			const regisPass = $crypto.encrypt($scope.registerData.password);
			$scope.registerData.encryptPass = regisPass;
			console.log('in regis : '+regisPass);

			$http
			.post(urlService.getBaseUrl() + '/checkRegister', $scope.registerData)
			.success(function(response) {
				if(response == "Success"){
					$http
					.post(urlService.getBaseUrl() + '/insertRegister', $scope.registerData)
					.success(function(response) {
						$state.go('app.product', {}, {reload:true});
						$scope.login();
					})
				}else{
					$ionicPopup.alert({
						title: 'สมัครสมาชิกผิดพลาด',
						template: response,
						okText: 'ตกลง',
						okType: 'button-assertive'
					});
				}
			})
		}
	};
})

.controller('ProfileCtrl', function($scope, $state, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, Users, urlService, $ionicActionSheet, $ionicHistory) {
	//this controller must login.
	$ionicPlatform.ready(function() {

		//object for Authen.
		var userDetail = Authen.getUser();

		//object for user data after view call this controller.
		var profileUser = Users.getUserData();

		//object for image.
		$scope.images = { 
			imageUri: '', 
			filename: ''							//This key is user must change image profile only.
		};

		//object for data user profile.
		$scope.profileData = {
			sell: 0,
			firstname: '',
			imageName: '',							//This key is image name send from after upload success.
			userID: ''
		};

		//if profileUser is have in database. get data show on profile view.
		if(profileUser !== undefined) {
			//get profile_id each user.
			$http.post(urlService.getBaseUrl() + '/findProfileUsers', userDetail)
				.success(function(res) {
					//if profile_id for user is have.But not have Users.getUserData equal undefined.
					if(res !== 'ERROR') {
						$scope.profileData.firstname = res[0].first_name;
						$scope.profileData.lastname = res[0].last_name;
						$scope.profileData.address = res[0].address;
						$scope.profileData.tel = res[0].tel_no;
						$scope.profileData.sell = res[0].can_sell;
						$scope.images.imageUri = urlService.getBaseUrl() + /img/ + res[0].user_image;
						//get image from database for check If user is change image.
						$scope.images.filename = res[0].user_image;
						$scope.profileData.imageName = res[0].user_image;
					}
				}
			);
		}

		$scope.preAddDataProfile = function() {
			console.log('In PreAddData : ' + $scope.profileData.imageName);
			//if image ready to uploads server and images is change by user.
			if($scope.images.imageUri != '' && $scope.profileData.imageName != $scope.images.filename) {
				upload($scope.images.imageUri, $scope.images.filename);
				console.log("URI In preAddDataProfile : " + $scope.images.imageUri);
				console.log("Filename In preAddDataProfile : " + $scope.images.filename);
			}else {
				addDataProfile();
			}
		}

		$scope.addMedia = function() {
			$scope.hideSheet = $ionicActionSheet.show({
				buttons: [
					{text: 'Take Photo'},
					{text: 'Photo from library'}
				],
				titleText: 'Add images',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					if(index == 0) {
						$scope.hideSheet();
						takePicture();
					}else if(index == 1) {
						$scope.hideSheet();
						selectImage();
					}
				}
			});
		}

		//function upload image to server.
		upload = function(imageURI, filename) {
			var options = new FileUploadOptions();
			options.fileKey = 'image';
			options.fileName = $scope.images.filename;
			options.mimeType = 'image/jpg';
			options.chunkedMode = false;
			options.params = {'directory' : 'uploads/img', 'fileName' : $scope.images.filename, 'userID' : userDetail.userID};
			
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
				function(res) {
					//response filename image from destination uploads/img folder at server.
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
					$scope.profileData.imageName = res.response;
					addDataProfile();
				}, function(error) {
					alert("ไม่สามารถทำการอัพโหลดรูปภาพของคุณได้");
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options
			);
		}

		//function take picture.
		takePicture = function () {
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                correctOrientation: true,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.CAMERA,
            };

            navigator.camera.getPicture(function (imageURI) {
            	dowloadImgIntoPackage(imageURI);
            }, function(error) {
            	console.log(error);
            }, options);
        }

        //function select image in device.
        selectImage = function() {
        	var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1000,
                targetHeight: 1000,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageUri) {
            	dowloadImgIntoPackage(imageUri); 
            }, function(error) {
                console.log(error);
            });
        }

        //function dowload image from device to app package for preview image into view.
        dowloadImgIntoPackage = function(imageUriSource) {
        	console.log('imageUri: ' + imageUriSource);
        	//substring for choosed image in gallary after file name is xxxx(.jpg)
        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
        	$scope.images.filename = filename;
        	console.log('Filename: ' + $scope.images.filename);
        	//dowload image from device to app package because URI of image in device not working in preview.
            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + $scope.images.filename, {}, true)
                .then(function(fileEntry) {
            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
                    $scope.images.imageUri = fileEntry.nativeURL;
                    console.log('THEN: ' + $scope.images.imageUri);
                }, function (error) {
                    console.log(error);
                }
            );
        }

        addDataProfile = function() {
        	//assign object to profileUser. In case update data profile but no exit profile.html
			profileUser = Users.getUserData();
			if(profileUser !== undefined) {
				console.log('now : ' + profileUser.profileID);
			}else {
				console.log('now : ' + profileUser);
			}

        	//userID must have.
        	if(userDetail !== undefined) {
        		//get userID save value to $scope.profileData.userID.
        		$scope.profileData.userID = userDetail.userID;
        	}

        	//if profileUser != undefined show that user needed update profile data.
        	if(profileUser !== undefined) {
        		console.log('update');
        		$scope.profileData.profileID = profileUser.profileID;
        		//update user profile data into database.
        		$http.post(urlService.getBaseUrl() + '/updateProfileUsers', $scope.profileData)
        		.success(function(response) {
        			alert("อัพเดทข้อมูลสำเร็จ");
        			console.log("response database : " + response);
        			$state.go('app.profile', {}, {reload: true});
        		}).error(function(err) {
        			console.log(err);
        			alert("[ผิดพลาด] ไม่สามารถอัพเดทข้อมูลได้");
        		})
        	}else {
        		console.log('insert');
        		//save user profile data into database.
	        	$http.post(urlService.getBaseUrl() + '/insertProfileUsers', $scope.profileData)
	        	.success(function(response) {
	        		//save cookie profile_id each user.
	        		Users.setUserData({
	        			profileID: response.profileID
	        		});
	        		alert("บันทึกข้อมูลสำเร็จ");
	        		console.log("response database : " + response);
	        		$state.go('app.profile', {}, {reload: true});
	        	}).error(function(err) {
	        		console.log(err);
	        		alert("[ผิดพลาด] ไม่สามารถบันทึกข้อมูลได้");
	        	});
        	}	
        }
	})
})

.controller('editPasswordCtrl', function($scope, $state, $http, Authen, urlService, $ionicPopup, $crypto) {
	var user = Authen.getUser(); 

	//data for change password.
	$scope.data = {
		userID: user.userID
	};

	$scope.checkPassword = function() {
		//new password not same.
		if($scope.data.newPass !== $scope.data.newPassConfirm) {
			$ionicPopup.alert({
				title: 'ผิดพลาด',
				template: 'รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง',
				okText: 'ตกลง',
				okType: 'button-assertive'
			});
		}else {						//password is same.
			//password less than 6 digits.
			if($scope.data.newPass.length < 6) {
				$ionicPopup.alert({
					title: 'ผิดพลาด',
					template: 'รหัสผ่านน้อยกว่า 6 ตัวอักษร กรุณาตรวจสอบอีกครั้ง',
					okText: 'ตกลง',
					okType: 'button-assertive'
				});
			}else {
				var confirm = $ionicPopup.confirm({
					title: 'เปลี่ยนรหัสผ่าน',
					template: 'คุณยืนยันการเปลี่ยนแปลงรหัสผ่าน',
					cancelText: 'ยกเลิก',
					okText: 'ตกลง'
				});

				confirm.then(function(res) {
					//If confirm is OK.
					if(res) {
						var encrypted = $crypto.encrypt($scope.data.newPass);

						if(encrypted !== undefined) {
							$scope.data.encryptPass = encrypted;
						}

						$http.get(urlService.getBaseUrl() + '/checkPasswords', {params: {userId: $scope.data.userID}})
						.success(function(res) {
							//If get result is have data.
							if(res.password != "") {
								var oldPass = null;
								
								if(res.password.length > 8) {
									//Decrypt password from database for check user insert old password.
									oldPass = $crypto.decrypt(res.password);
								}else {
									//In case forget password.
									oldPass = res.password;
								}

								//Check password old in database and user insert.
								if(oldPass == $scope.data.oldPass) {
									$http.post(urlService.getBaseUrl() + '/editPasswords', $scope.data)
									.success(function(res) {
										$ionicPopup.alert({
											title: 'สำเร็จ',
											template: 'คุณได้ทำการเปลี่ยนแปลงรหัสผ่านเรียบร้อยแล้ว',
											okText: 'ตกลง'
										}).then(function(res) {
											$state.go('app.editPassword', {}, {reload: true});
										});
									}).error(function(err) {
										console.log(err);
										$ionicPopup.alert({
											title: 'ผิดพลาด',
											template: 'ไม่สามารถทำการเปลี่ยนแปลงรหัสผ่านได้ กรุณาติดต่อผู้ดูแล',
											okText: 'ตกลง',
											okType: 'button-assertive'
										});
									});
								}else {
									$ionicPopup.alert({
										title: 'ผิดพลาด',
										template: 'รหัสผ่านเดิมไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
										okText: 'ตกลง',
										okType: 'button-assertive'
									});
								}
							}

						}).error(function(err) {
							console.log(err);
							$ionicPopup.alert({
								title: 'ผิดพลาด',
								template: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแล',
								okText: 'ตกลง',
								okType: 'button-assertive'
							});
						});
					}
				});
			}
		}
	}

});