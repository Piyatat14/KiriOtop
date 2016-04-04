angular.module('starter.productCtrl', [])

	.controller('ProductCtrl', function($scope, $http, $ionicHistory, urlService) {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$http.get(urlService.getBaseUrl() + '/products').then(function(resp) {
			console.log('Success', resp);
		});
		$scope.dataTest = [{
					"name" : "กระเป็า",
					"detail" : "ก็ลองดูจ่าาาาาาาาาาาาา"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				}]
		$scope.slideChanged = function(index) {
			$scope.slideIndex = index;
		};
	  // $http.get('/products')
	  //   .success(function(response) {
	  //     console.log(response);
	  //     $scope.playlists = response;
	  //   });
	})

	.controller('showProductCtrl', function($http, $scope, $stateParams, urlService, Authen) {

		$scope.getDataProducts = function() {
			$http
				.get(urlService.getBaseUrl() + '/getProducts', {params: {pId: '1'}})
				.success(function(response) {
					$scope.productData = response;
					console.log($scope.productData);
				})
		}
		$scope.getDataProducts();
	})

	.controller('addProductCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $state, $ionicPlatform, $cordovaFile, ImageService, FileService, urlService, $ionicActionSheet, Authen) {

		var userID = Authen.getUser().userID;

		$scope.products = {};
		$scope.products.category = 'อาหาร';

		$ionicPlatform.ready(function() {
			$scope.images = { 
				imageUri: [], 
				filename: '',
				extension: ''
			};

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
							console.log("Take Photo");
							takePicture();
						}else if(index == 1) {
							$scope.hideSheet();
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
			                	console.log('imageUri: ' + imageUri);
			                	
			                	//substring for choosed image in gallary after file name is xxxx.jpg?42341
			                	var filename = imageUri.substring(imageUri.lastIndexOf('/') + 1, imageUri.lastIndexOf('?'));
			                	
			                	var extension = filename.substr(filename.lastIndexOf('.') + 1);
			                	$scope.images.extension = extension;
			                	//$scope.images.filename = filename;
			                	console.log('extension: ' + $scope.images.extension);
			                	//console.log('Filename: ' + $scope.images.filename);   
		                        $cordovaFileTransfer.download(imageUri, cordova.file.dataDirectory + filename, {}, true)
		                        .then(function(fileEntry) {
		                                $scope.images.imageUri.push({
		                                	path: fileEntry.nativeURL,
		                                	fileName: userID + '-' + filename + '-' + Date.now()
		                                });
		                                $scope.imgLength = $scope.images.imageUri.length;
		                                //upload to server.
		                				      
		                                console.log('THEN: ' + $scope.images.imageUri);
		                            }, function (error) {
		                                console.log(error);
		                            }
		                        );
		                    }, function(error) {
		                        console.log(error);
		                    });
						}
					}
				});
			}

			$scope.deletePicture = function(image){
				var hideSheet = $ionicActionSheet.show({
					titleText: 'Picture',
				    destructiveText: 'Delete',
				    cancelText: 'Cancel',
				    destructiveButtonClicked: function() {
						var index = $scope.images.imageUri.indexOf(image);
						$scope.images.imageUri.splice(index, 1);
						return true;
				    }
				});
			};

			//function upload image to server.
			upload = function(imageURI, filename) {
				var options = new FileUploadOptions();
				options.fileKey = 'image';
				options.fileName = filename;
				options.mimeType = 'image/jpg';
				options.chunkedMode = false;
				options.params = {'directory' : 'uploads/img', 'fileName' : filename};
				
				var ft = new FileTransfer();
				ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/imageUserGroups'),

				function(res) {
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
				}, function(error) {
					alert("An error has occurred: Code = " + error.code);
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options)
			};

			takePicture = function (e) {
	            var options = {
	                quality: 45,
	                targetWidth: 1000,
	                targetHeight: 1000,
	                destinationType: Camera.DestinationType.FILE_URI,
	                encodingType: Camera.EncodingType.JPEG,
	                sourceType: Camera.PictureSourceType.CAMERA
	            };

	            navigator.camera.getPicture(
	                function (imageURI) {
	                    console.log(imageURI);
	                    upload(imageURI);
	                },
	                function (message) {
	                    // We typically get here because the use canceled the photo operation. Fail silently.
	                }, options);

	            return false;

	        };
		});
		
		$scope.insertProducts = function(){
			$http
			.post(urlService.getBaseUrl() + '/insertProducts', $scope.products)
			.success(function(response) {
				var forImageData = {};
				if($scope.images.imageUri != null){
					for(var i=0; i<$scope.images.imageUri.length; i++){
						forImageData = {
							product_id: response.insertId,
							image: $scope.images.imageUri[i].fileName
						}
						$http
						.post(urlService.getBaseUrl() + '/insertImageProducts', forImageData)
						.success(function(response) {

						})
						upload($scope.images.imageUri[i].path, $scope.images.imageUri[i].fileName);
					}
				}
				$state.go('app.showProducts', {}, {reload:true});
			})
		};
	})

	.controller('editProductCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $state, $ionicPlatform, $cordovaFile, ImageService, FileService, urlService, $ionicActionSheet, $stateParams, Authen, urlService) {
		
		var userID = Authen.getUser().userID;

		$scope.products = {};
		$scope.editProducts = {};
		$scope.imgGroupData = {};

		$ionicPlatform.ready(function() {
			$scope.images = { 
				imageUri: [], 
				filename: '',
				extension: ''
			};

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
							console.log("Take Photo");
							takePicture();
						}else if(index == 1) {
							$scope.hideSheet();
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
			                	console.log('imageUri: ' + imageUri);
			                	
			                	//substring for choosed image in gallary after file name is xxxx.jpg?42341
			                	var filename = imageUri.substring(imageUri.lastIndexOf('/') + 1, imageUri.lastIndexOf('?'));
			                	
			                	var extension = filename.substr(filename.lastIndexOf('.') + 1);
			                	$scope.images.extension = extension;
			                	//$scope.images.filename = filename;
			                	console.log('extension: ' + $scope.images.extension);
			                	//console.log('Filename: ' + $scope.images.filename);   
		                        $cordovaFileTransfer.download(imageUri, cordova.file.dataDirectory + filename, {}, true)
		                        .then(function(fileEntry) {
		                                $scope.images.imageUri.push({
		                                	path: fileEntry.nativeURL,
		                                	fileName: userID + '-' + filename + '-' + Date.now()
		                                });
		                                $scope.imgLength = $scope.images.imageUri.length;
		                                //upload to server.
		                				      
		                                console.log('THEN: ' + $scope.images.imageUri);
		                            }, function (error) {
		                                console.log(error);
		                            }
		                        );
		                    }, function(error) {
		                        console.log(error);
		                    });
						}
					}
				});
			}

			$scope.deletePicture = function(image){
				var hideSheet = $ionicActionSheet.show({
					titleText: 'Picture',
				    destructiveText: 'Delete',
				    cancelText: 'Cancel',
				    destructiveButtonClicked: function() {
				    	var index = $scope.images.imageUri.indexOf(image);
						$scope.images.imageUri.splice(index, 1);
						return true;
				    }
				});
			};

			//function upload image to server.
			upload = function(imageURI, filename) {
				var options = new FileUploadOptions();
				options.fileKey = 'image';
				options.fileName = filename;
				options.mimeType = 'image/jpg';
				options.chunkedMode = false;
				options.params = {'directory' : 'uploads/img', 'fileName' : filename};
				
				var ft = new FileTransfer();
				ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/imageUserGroups'),

				function(res) {
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
				}, function(error) {
					alert("An error has occurred: Code = " + error.code);
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options)
			};

			takePicture = function (e) {
	            var options = {
	                quality: 45,
	                targetWidth: 1000,
	                targetHeight: 1000,
	                destinationType: Camera.DestinationType.FILE_URI,
	                encodingType: Camera.EncodingType.JPEG,
	                sourceType: Camera.PictureSourceType.CAMERA
	            };

	            navigator.camera.getPicture(
	                function (imageURI) {
	                    console.log(imageURI);
	                    upload(imageURI);
	                },
	                function (message) {
	                    // We typically get here because the use canceled the photo operation. Fail silently.
	                }, options);

	            return false;
	        };
		});

		$http
			.get(urlService.getBaseUrl() + '/editProducts', {params: {pId: '1'}})
			.success(function(response) {
				console.log(response);
				$scope.editGroupData.primaryProduct = response[0].product_id;
				$scope.editGroupData.productId = response[0].product_user_id;
				$scope.editGroupData.productName = response[0].product_name;
				$scope.editGroupData.productPrice = response[0].productPrice;
				$scope.editGroupData.telephone = response[0].product_amount;
				$scope.editGroupData.telephone = response[0].release_date;
				$scope.imgLength = response.length;
				for(var i=0; i<$scope.imgLength; i++){
					if(response[i].image != null){
						$scope.images.imageUri.push({
							product_id: response[i].product_id,
		                	fileName: response[i].image
		                });
					}
				}
			})

		$scope.updateUserGroup = function(){
			$http
			.delete(urlService.getBaseUrl() + '/editProductImageDeletes', {params: {product_id: $scope.editGroupData.primaryProduct}})
			.success(function(response) {
				var forImageData = {};
				$http
					.put(urlService.getBaseUrl() + '/updateProducts', $scope.editGroupData)
					.success(function(response) {
						if($scope.images.imageUri != null){
							for(var i=0; i<$scope.images.imageUri.length; i++){
								forImageData = {
									product_id: $scope.editGroupData.primaryProduct,
									image: userID + '-' + $scope.images.imageUri[i].fileName + '-' + Date.now()
								}
								$http
									.post(urlService.getBaseUrl() + '/insertImageProducts', forImageData)
									.success(function(response) {

									})
							}
						}
						$state.go('app.userGroup', {}, {reload:true});
					})
				//upload($scope.images.imageUri[i].path, $scope.images.imageUri[i].fileName);
			})
		};
	})