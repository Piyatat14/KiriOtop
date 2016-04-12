angular.module('starter.productCtrl', [])

	.controller('ProductCtrl', function($scope, $http, urlService) { //$ionicHistory,
		// $ionicHistory.nextViewOptions({
		// 	disableBack: true
		// });
		$http
			.get(urlService.getBaseUrl() + '/recommendProducts')
			.success(function(response) {
				$scope.recommendData = response;
			})
		$http
			.get(urlService.getBaseUrl() + '/salableProducts')
			.success(function(response) {
				$scope.salableData = response;
			})
		$http
			.get(urlService.getBaseUrl() + '/newProducts')
			.success(function(response) {
				$scope.newsData = response;
			})
	})

	.controller('kindProductCtrl', function($scope, $http, urlService, $stateParams) {
		var textPath = '';
		switch($stateParams.idOfKind){
			case '1' :
				$scope.setTitle = "สินค้าแนะนำ";
				textPath = 'recommendAllProducts';
				break;
			case '2' :
				$scope.setTitle = "สินค้าขายดี";
				textPath = 'salableAllProducts';
				break;
			case '3' :
				$scope.setTitle = "สินค้าใหม่";
				textPath = 'newAllProducts';
				break;
			default :
				$scope.setTitle = "สินค้า";
				break;
		}
		$http
			.get(urlService.getBaseUrl() + '/' + textPath)
			.success(function(response) {
				$scope.productData = response;
			})
	})

	.controller('detailProductCtrl', function($scope, $http, urlService, $stateParams, $ionicPopup, $timeout, Authen, $filter, $ionicModal) {
		$scope.forReportData = {};
		$scope.forOrderBuyer = {};
		if(angular.isUndefined(Authen.getUser())){
			$scope.forReportData.userID = null;
		}else{
			$scope.forReportData.userID = Authen.getUser().userID;
		}
		$scope.testImg = [
			{'src' : 'img/ionic.png'}, 
			{'src' : 'img/ionic.png'},
			{'src' : 'img/ionic.png'},
			{'src' : 'img/ionic.png'}, 
			{'src' : 'img/ionic.png'}
		];
		$http
			.get(urlService.getBaseUrl() + '/getDetailProducts', {params: {pId : $stateParams.idProduct}})
			.success(function(response) {
				$scope.idProfile = response[0].profile_id;
				$scope.idGroup = response[0].group_id;
				$scope.idProduct = response[0].product_id;
				$scope.nameProduct = response[0].product_name;
				$scope.nameOwned = response[0].first_name;
				$scope.address = response[0].address_location;
				$scope.detailProduct = response[0].product_detail;
				$scope.viewProduct = response[0].product_view;
				$scope.ratingProduct = response[0].product_rating;
				$scope.telNo = response[0].tel_no;
			})
		$scope.reportProduct = function() {
			var myPopup = $ionicPopup.show({
			    template: '<input type="text" ng-model="forReportData.reportProduct">',
			    title: 'รายงานสิค้า',
			    subTitle: 'กรุณาใส่หมายเหตุที่รายงานสินค้านี้',
			    scope: $scope,
			    buttons: [
			    	{ text: 'ยกเลิก' },
			    	{
				        text: '<b>ส่งรายงาน</b>',
				        type: 'button-assertive',
				        onTap: function(e) {
				        	$scope.forReportData.productId = $scope.idProduct;
				        	$scope.forReportData.logDate = $filter('date')(new Date(), 'yyyy-MM-dd');
				        	$http
							.post(urlService.getBaseUrl() + '/insertReportProducts', $scope.forReportData)
							.success(function(response) {
								var alertPopup = $ionicPopup.alert({
							     	title: 'รายงานสำเร็จ',
							     	template: 'ขอบคุณสำหรับการรายงาน'
							   	});
							})
			        	}
			      	}
			    ]
			});
		};

		$scope.callToOwned = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'ติดต่อเจ้าของผลิตภัณฑ์',
				template: 'คุณต้องการติดต่อกับเจ้าของภัณฑ์ ?',
				buttons: [
						{text: 'ยกเลิก'},
						{
							text: '<b>ติดต่อ</b>',
				        	type: 'button-balanced',
				        	onTap: function(e){
				        		document.location.href = "tel:" + $scope.telNo;
				        	}
						}
					]
			});
		};

		$scope.buyProduct = function() {
			$scope.forOrderBuyer.productId = $scope.idProduct;
			$scope.forOrderBuyer.groupId = $scope.idGroup;
			$scope.forOrderBuyer.orderDate = $filter('date')(new Date(), 'yyyy-MM-dd');
			var buyPopup = $ionicPopup.confirm({
				title: 'สั่งซื้อสินค้านี้',
				template: 'คุณต้องสั่งซื้อสินค้าชิ้นนี้ ?',
				buttons: [
						{text: 'ยกเลิก'},
						{
							text: '<b>สั่งซื้อ</b>',
				        	type: 'button-positive',
				        	onTap: function(e){
				        		$http
								.get(urlService.getBaseUrl() + '/buildOrderIds', {params: {prodId : $scope.forOrderBuyer.productId, profId : '1', gId : $scope.idGroup}})
								.success(function(response) {
									var runOrder;
									if(response == ''){
										runOrder = '001';
									}else{
										response[0].order_id++;
										runOrder = response[0].order_id;
									}
									$scope.forOrderBuyer.orderId = runOrder;
									//$scope.idProduct + $scope.forOrderBuyer.groupId + '1' + runOrder
								})
				        		$http
								.post(urlService.getBaseUrl() + '/insertOrderBuyers', $scope.forReportData)
								.success(function(response) {
									
								})
				        	}
						}
					]
			});
		};

		$scope.showImages = function(index) {
			$scope.activeSlide = index;
			$scope.showModal('templates/showImageFull.html');
		}
	 
		$scope.showModal = function(templateUrl) {
			$ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show();
			});
		}
	 
		// Close the modal
		$scope.closeModal = function() {
			$scope.modal.hide();
			$scope.modal.remove();
		};

	})

	.controller('showProductCtrl', function($http, $scope, $stateParams, urlService, Authen) {

		$scope.getDataProducts = function() {
			$http
				.get(urlService.getBaseUrl() + '/getProducts', {params: {pId: '1'}})
				.success(function(response) {
					$scope.productData = response;
				})
		}
		$scope.getDataProducts();
	})

	.controller('addProductCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $state, $ionicPlatform, $cordovaFile, ImageService, FileService, urlService, $ionicActionSheet, Authen, $filter) {

		var userID = Authen.getUser().userID;

		$scope.products = {};
		$scope.products.categoryText = 'อาหาร';

		$ionicPlatform.ready(function() {
			$scope.images = { 
				imageUri: [], 
				filename: '',
				extension: ''
			};

			$http
				.get(urlService.getBaseUrl() + '/getUserGroupForProducts', {params: {pId: '1'}})
				.success(function(response) {
					$scope.userGroupData = response;
				})

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
			$scope.products.dateRelease = $filter('date')(new Date(), 'yyyy-MM-dd');
			$http
			.post(urlService.getBaseUrl() + '/insertProducts', $scope.products)
			.success(function(response) {
				var forImageData = {};
				if($scope.images.imageUri != null){
					for(var i=0; i<$scope.images.imageUri.length; i++){
						forImageData = {
							group_id: response.insertId,
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
		$scope.imgGroupData = {};

		$ionicPlatform.ready(function() {
			$scope.images = { 
				imageUri: [], 
				filename: '',
				extension: ''
			};

			$http
				.get(urlService.getBaseUrl() + '/getUserGroupForProducts', {params: {pId: '1'}})
				.success(function(response) {
					$scope.userGroupData = response;
				})
			
			$http
				.get(urlService.getBaseUrl() + '/editProducts', {params: {pId: '1', productId: $stateParams.productId}})
				.success(function(response) {
					console.log(response);
					$scope.products.primaryProduct = response[0].product_id;
					$scope.products.productId = response[0].product_user_id;
					$scope.products.productName = response[0].product_name;
					$scope.products.productPrice = response[0].product_price;
					$scope.products.productAmount = response[0].product_amount;
					$scope.products.categoryText = response[0].product_category;
					$scope.products.idGroup = response[0].group_id;
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

		$scope.updateProduct = function(){
			$http
			.delete(urlService.getBaseUrl() + '/editProductImageDeletes', {params: {product_id: $scope.products.primaryProduct}})
			.success(function(response) {
				var forImageData = {};
				$http
					.put(urlService.getBaseUrl() + '/updateProducts', $scope.products)
					.success(function(response) {
						if($scope.images.imageUri != null){
							for(var i=0; i<$scope.images.imageUri.length; i++){
								forImageData = {
									product_id: $scope.products.primaryProduct,
									image: userID + '-' + $scope.images.imageUri[i].fileName + '-' + Date.now()
								}
								$http
									.post(urlService.getBaseUrl() + '/insertImageProducts', forImageData)
									.success(function(response) {

									})
							}
						}
						$state.go('app.showProducts', {}, {reload:true});
					})
				//upload($scope.images.imageUri[i].path, $scope.images.imageUri[i].fileName);
			})
		};
	})