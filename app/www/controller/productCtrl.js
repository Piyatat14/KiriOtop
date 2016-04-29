angular.module('starter.productCtrl', ['ionic.rating', 'ionic.closePopup'])

	.controller('ProductCtrl', function($scope, $http, urlService) { //$ionicHistory,
		// $ionicHistory.nextViewOptions({
		// 	disableBack: true
		// });
		$http
			.get(urlService.getBaseUrl() + '/recommendProducts')
			.success(function(response) {
				$scope.recommendData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.recommendData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.recommendData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
				}
			})
		$http
			.get(urlService.getBaseUrl() + '/salableProducts')
			.success(function(response) {
				$scope.salableData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.salableData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.salableData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
				}
			})
		$http
			.get(urlService.getBaseUrl() + '/newProducts')
			.success(function(response) {
				$scope.newsData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.newsData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.newsData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
				}
			})
	})

	.controller('kindProductCtrl', function($scope, $http, urlService, $stateParams) {
		var textPath = '';
		var countOffset = 0;
		$scope.productData = [];
		$scope.moreDataCanBeLoaded = true;
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

		$scope.loadMore = function(){
			$http
			.get(urlService.getBaseUrl() + '/' + textPath, {params: {offset: countOffset}})
			.success(function(response) {
				console.log(response);
				if(response == ''){
					$scope.moreDataCanBeLoaded = false;
				}
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						response[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						response[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
					$scope.productData.push(response[i]);
				}
				countOffset = countOffset+10;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			})
		}
	})

	.controller('detailProductCtrl', function($scope, $http, urlService, $stateParams, $ionicPopup, $timeout, Authen, Users, $filter, $ionicModal, IonicClosePopupService, googleMapsMarkAndDirec) {
		$scope.forReportData = {};
		$scope.forOrderBuyer = {};
		$scope.forImageDetail = [];
		$scope.ratingComment = {};
		$scope.productdata = {};
		$scope.profileData = {};
		if(angular.isUndefined(Authen.getUser())){
			$scope.forReportData.userID = null;
		}else{
			$scope.forReportData.userID = Authen.getUser().userID;
		}

		var profileUser = Users.getUserData();

		$http
			.get(urlService.getBaseUrl() + '/getDetailProducts', {params: {pId : $stateParams.idProduct}})
			.success(function(response) {
				$scope.productdata.idProfile = response[0].profile_id;
				$scope.productdata.idGroup = response[0].group_id;
				$scope.productdata.idProduct = response[0].product_id;
				$scope.productdata.nameProduct = response[0].product_name;
				$scope.productdata.nameOwned = response[0].first_name;
				$scope.productdata.address = response[0].address_location;
				$scope.productdata.lat = response[0].address_lat;
				$scope.productdata.lng = response[0].address_lng;
				$scope.productdata.detailProduct = response[0].product_detail;
				$scope.productdata.viewProduct = response[0].product_view;
				$scope.productdata.ratingProduct = response[0].product_rating;
				$scope.productdata.amountProduct = response[0].product_amount;
				$scope.productdata.nameGroup = response[0].group_name;
				$scope.productdata.telNo = response[0].tel_no;
				$scope.imgLength = response.length;
				for(var i=0; i<$scope.imgLength; i++){
					if(response[i].image == null){
						$scope.forImageDetail.push({
							image : urlService.getBaseUrl() + /img/ + 'nullProduct.jpg'
						});
					}else{
						$scope.forImageDetail.push({
							image : urlService.getBaseUrl() + /img/ + response[i].image
						});
					}
				}
			})
		
		$http
			.get(urlService.getBaseUrl() + '/getRatingProducts', {params: {pId : $stateParams.idProduct}})
			.success(function(response) {
				$scope.ratingComment = response;
				$scope.ratComLength = $scope.ratingComment.length;
				for(var i=0; i<$scope.ratComLength; i++){
					if(response[i].user_image == null){
						$scope.ratingComment[i].user_image = urlService.getBaseUrl() + /img/ + 'null.png';
					}else{
						$scope.ratingComment[i].user_image = urlService.getBaseUrl() + /img/ + response[i].user_image;
					}
				}
				console.log($scope.ratingComment);
			})

		$scope.reportProduct = function() {
			var myPopup = $ionicPopup.show({
			    template: '<input type="text" ng-model="forReportData.reportProduct">',
			    title: 'รายงานสินค้า',
			    subTitle: 'กรุณาใส่หมายเหตุที่รายงานสินค้านี้',
			    scope: $scope,
			    buttons: [
			    	{ text: 'ยกเลิก' },
			    	{
				        text: '<b>ส่งรายงาน</b>',
				        type: 'button-assertive',
				        onTap: function(e) {
				        	$scope.forReportData.productId = $scope.productdata.idProduct;
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
				        		document.location.href = "tel:" + $scope.productdata.telNo;
				        	}
						}
					]
			});
		};

		$scope.buyProduct = function() {
			$scope.forOrderBuyer.productId = $scope.productdata.idProduct;
			$scope.forOrderBuyer.groupId = $scope.productdata.idGroup;
			$scope.forOrderBuyer.orderDate = $filter('date')(new Date(), 'yyyy-MM-dd');
			$scope.forOrderBuyer.idProfile = profileUser.profileID;
			if($scope.productdata.detailProduct == 'สต็อกสินค้า'){
				$scope.forOrderBuyer.dateWithIn = '0000-00-00'
				var buyPopup = $ionicPopup.show({
					template: 'จำนวนที่คุณต้องการ<input type="number" ng-model="forOrderBuyer.orderAmount" max="{{productdata.amountProduct}}">',
				    title: 'สั่งซื้อสินค้านี้',
				    subTitle: 'สินค้ามีจำนวน :' + $scope.productdata.amountProduct,
				    scope: $scope,
					buttons: [
						{text: 'ยกเลิก'},
						{
							text: '<b>สั่งซื้อ</b>',
				        	type: 'button-positive',
				        	onTap: function(e){
				        		$http
								.get(urlService.getBaseUrl() + '/buildOrderIds', {params: {prodId : $scope.forOrderBuyer.productId, profId : profileUser.profileID, gId : $scope.productdata.idGroup}})
								.success(function(response) {
									var runOrder;
									if(response == ''){
										runOrder = '1001';
									}else{
										response[0].order_id++;
										runOrder = response[0].order_id;
									}
									$scope.forOrderBuyer.orderId = runOrder;
									$http
									.post(urlService.getBaseUrl() + '/insertOrderBuyers', $scope.forOrderBuyer)
									.success(function(response) {
										var idOrderSeller = response.insertId;
										$http
										.post(urlService.getBaseUrl() + '/insertOrderSellers', {sId : idOrderSeller})
										.success(function(response) {
											$ionicPopup.alert({
												title: 'ทำการสั่งซื้อเสร็จเรียบร้อย',
												template: 'ตรวจสอบสถานะสินค้าได้ที่ประวัติการซื้อ'
											});
										})
									})
								})
				        	}
						}
					]
				});
			}else{
				var buyPopup = $ionicPopup.show({
					template: 'จำนวนที่คุณต้องการ<input type="text" ng-model="forOrderBuyer.orderAmount" max="{{productdata.amountProduct}}"><br/> ภายในวันที่<sub style="color:red;">*ไม่รวมระยะเวลาขนส่งสินค้า</sub><label class="item item-input"><input type="date" ng-model="forOrderBuyer.dateWithIn"></label>',
				    title: 'สั่งซื้อสินค้านี้',
				    scope: $scope,
					buttons: [
						{text: 'ยกเลิก'},
						{
							text: '<b>สั่งซื้อ</b>',
				        	type: 'button-positive',
				        	onTap: function(e){
				        		$http
								.get(urlService.getBaseUrl() + '/buildOrderIds', {params: {prodId : $scope.forOrderBuyer.productId, profId : profileUser.profileID, gId : $scope.productdata.idGroup}})
								.success(function(response) {
									var runOrder;
									if(response == ''){
										runOrder = '001';
									}else{
										response[0].order_id++;
										runOrder = response[0].order_id;
									}
									$scope.forOrderBuyer.orderId = runOrder;
								})
				        		$http
								.post(urlService.getBaseUrl() + '/insertOrderBuyers', $scope.forOrderBuyer)
								.success(function(response) {
									
								})
				        	}
						}
					]
				});
			}
		};

		$scope.loadProfile = function() {
			$http
			.get(urlService.getBaseUrl() + '/getViewProfiles', {params: {profId : $scope.productdata.idProfile}})
			.success(function(response){
				$scope.profileData = response;
				if($scope.profileData[0].user_image == null){
					$scope.profileData[0].user_image = urlService.getBaseUrl() + /img/ + 'null.png';
				}else{
					$scope.profileData[0].user_image = urlService.getBaseUrl() + /img/ + $scope.profileData[0].user_image;
				}
				showProfiles();
			})
		}

		var showProfiles = function(){
			var showProfile = $ionicPopup.show({
				title: 'ข้อมูลส่วนตัว',
				templateUrl: 'templates/showProfile.html',
				scope: $scope
			});
			IonicClosePopupService.register(showProfile);
		}

		$scope.loadUserGroup = function(){
			$http
			.get(urlService.getBaseUrl() + '/getViewUserGroups', {params: {gId : $scope.productdata.idGroup}})
			.success(function(response){
				console.log(response);
				$scope.userGroupData = response;
				for(var i=0; i<response.length; i++){
					if($scope.userGroupData[i].image == null){
					$scope.userGroupData[i].image = urlService.getBaseUrl() + /img/ + 'null.png';
					}else{
						$scope.userGroupData[i].image = urlService.getBaseUrl() + /img/ + $scope.userGroupData[i].image;
					}
				}
				showUserGroups();
			})
		}

		var showUserGroups = function(){
			var showUserGroup = $ionicPopup.show({
				title: 'ข้อมูลเครือข่าย',
				templateUrl: 'templates/showUserGroup.html',
				scope: $scope
			});
			IonicClosePopupService.register(showUserGroup);
		}

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

		$ionicModal.fromTemplateUrl('templates/markMapGoogle.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.mapModal = modal;
		});
		$scope.loadLocation = function(lat, lng, add){
			googleMapsMarkAndDirec.loadMap().then(function(){
				var myLatLng = {lat: lat, lng: lng};
				var map = new google.maps.Map(document.getElementById('map_canvas'), {
					center: myLatLng,
					zoom: 20,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					title: add
				});
			})
			$scope.mapModal.show();
		}

		$scope.closeMaps = function() {
			$scope.mapModal.hide();
		};

		$scope.$on('$destroy', function() {
		    $scope.mapModal.remove();
		});

		$ionicModal.fromTemplateUrl('templates/directionMapGoogle.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.direcMap = modal;
		});

		$scope.loadDirection = function(){
			googleMapsMarkAndDirec.loadMap().then(function(){
				navigator.geolocation.getCurrentPosition(function(pos) {
					console.log(pos);
					//$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				}, function(error) {
					alert('Unable to get location: ' + error.message);
				});		
			})
			$scope.direcMap.show();
		}

		$scope.closeDirecMaps = function() {
			$scope.direcMap.hide();
		};

		$scope.$on('$destroy', function() {
		    $scope.direcMap.remove();
		});

	})

	.controller('showProductCtrl', function($http, $scope, $stateParams, urlService, Authen, Users) {
		var profileData = {};
		var idProfile;
		profileData.profileID = '';
		profileData = Users.getUserData();
		if(profileData == undefined){
			idProfile = '0';
		}else{
			idProfile = profileData.profileID;
		}
		$http
			.get(urlService.getBaseUrl() + '/getProducts', {params: {pId: idProfile}})
			.success(function(response) {
				$scope.productData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.productData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.productData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
				}
			})
	})

	.controller('addProductCtrl', function($scope, $state, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, Users, urlService, $ionicActionSheet, $filter) {

		var userID = Authen.getUser().userID;
		//object for user data after view call this controller.
		var profileUser = Users.getUserData();

		$scope.products = {};
		$scope.products.categoryText = 'อาหาร';
		$scope.products.productStock = 'สต็อกสินค้า';

		$ionicPlatform.ready(function() {
			$scope.images = [];
			$scope.realImageName = [];

			$http
				.get(urlService.getBaseUrl() + '/getUserGroupForProducts', {params: {pId: profileUser.profileID}})
				.success(function(response) {
					$scope.userGroupData = response;
				})

			$scope.preInsertProduct = function() {
				//if image ready to uploads server.
				if($scope.images.length > 0) {
					for(var i=0; i<$scope.images.length; i++){
						upload($scope.images[i].imageUri, $scope.images[i].filename);
					}
				}else {
					insertProducts();
				}
			};

			$scope.addMedia = function() {
				$scope.hideSheet = $ionicActionSheet.show({
					buttons: [
						{text: 'Photo from library'}
					],
					titleText: 'Add images',
					cancelText: 'Cancel',
					buttonClicked: function(index) {
						if(index == 0) {
							$scope.hideSheet();
							selectImage();
						}
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
				options.params = {'directory' : 'uploads/img', 'fileName' : filename, 'userID' : userID};
				var ft = new FileTransfer();
				ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
					function(res) {
						//response filename image from destination uploads/img folder at server.
						console.log("Code = " + res.responseCode);
						console.log("Response = " + res.response);
						console.log("Sent = " + res.bytesSent);
						$scope.realImageName.push({
							realNameImg: res.response
						});
						if($scope.images.length == $scope.realImageName.length){
							insertProducts();
						}
					}, function(error) {
						alert("ไม่สามารถทำการอัพโหลดรูปภาพของคุณได้");
					    console.log("upload error source " + error.source);
					    console.log("upload error target " + error.target);
					}, options
				);
			};

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
	        };

	        dowloadImgIntoPackage = function(imageUriSource) {
	        	console.log('imageUri: ' + imageUriSource);
	        	//substring for choosed image in gallary after file name is xxxx(.jpg)
	        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
	        	//$scope.images.filename = filename;
	        	//console.log('Filename: ' + $scope.images.filename);
	        	//dowload image from device to app package because URI of image in device not working in preview.
	            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + filename, {}, true)
	                .then(function(fileEntry) {
	            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
	            		$scope.images.push({
							imageUri: fileEntry.nativeURL,
							filename: filename
						});
						console.log($scope.images);
						$scope.imgLength = $scope.images.length;
	                    // $scope.images.imageUri = fileEntry.nativeURL;
	                    // console.log('THEN: ' + $scope.images.imageUri);
	                }, function (error) {
	                    console.log(error);
	                }
	            );
	        };

			$scope.deletePicture = function(image){
				var hideSheet = $ionicActionSheet.show({
					titleText: 'Picture',
				    destructiveText: 'Delete',
				    cancelText: 'Cancel',
				    destructiveButtonClicked: function() {
						var index = $scope.images.indexOf(image);
						$scope.images.splice(index, 1);
						$scope.imgLength = $scope.images.length;
						return true;
				    }
				});
			};

			insertProducts = function(){
				if($scope.products.productStock == 'ไม่สต็อกสินค้า'){
					$scope.products.productAmount = '0';
				}
				$scope.products.dateRelease = $filter('date')(new Date(), 'yyyy-MM-dd');
				$scope.products.idProfile = profileUser.profileID;
				$http
				.post(urlService.getBaseUrl() + '/insertProducts', $scope.products)
				.success(function(response) {
					var forImageData = {};
					if($scope.images.length > 0){
						for(var i=0; i<$scope.images.length; i++){
							forImageData = {
								group_id: response.insertId,
								image: $scope.realImageName[i].realNameImg
							}
							$http
							.post(urlService.getBaseUrl() + '/insertImageProducts', forImageData)
							.success(function(response) {
								$state.go('app.showProducts', {}, {reload:true});
							})
						}
					}else{
						$state.go('app.showProducts', {}, {reload:true});
					}
				})
			};
		});
	})

	.controller('editProductCtrl', function($scope, $state, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, Users, urlService, $ionicActionSheet, $stateParams) {
		
		var userID = Authen.getUser().userID;
		//object for user data after view call this controller.
		var profileUser = Users.getUserData();

		$scope.products = {};

		$ionicPlatform.ready(function() {
			$scope.images = [];
			$scope.realImageName = [];

			$http
				.get(urlService.getBaseUrl() + '/getUserGroupForProducts', {params: {pId: profileUser.profileID}})
				.success(function(response) {
					$scope.userGroupData = response;
				})
			
			$http
				.get(urlService.getBaseUrl() + '/editProducts', {params: {pId: profileUser.profileID, productId: $stateParams.productId}})
				.success(function(response) {
					$scope.products.primaryProduct = response[0].product_id;
					$scope.products.productId = response[0].product_user_id;
					$scope.products.productName = response[0].product_name;
					$scope.products.productStock = response[0].product_detail;
					$scope.products.productPrice = response[0].product_price;
					$scope.products.productAmount = response[0].product_amount;
					$scope.products.categoryText = response[0].product_category;
					$scope.products.idGroup = response[0].group_id;
					$scope.imgLength = response.length;
					for(var i=0; i<$scope.imgLength; i++){
						if(response[i].image != null){
							$scope.images.push({
								product_id: response[i].product_id,
								imageUri: urlService.getBaseUrl() + /img/ + response[i].image,
			                	filename: response[i].image
			                });
						}
					}
				})

			$scope.preUpdateProduct = function() {
				//if image ready to uploads server.
				if($scope.images.length > 0) {
					for(var i=0; i<$scope.images.length; i++){
						if($scope.images[i].product_id == undefined){
							upload($scope.images[i].imageUri, $scope.images[i].filename);
						}else{
							$scope.realImageName.push({
								realNameImg: $scope.images[i].filename
							});
							if($scope.images.length == $scope.realImageName.length){
								updateProduct();
							}
						}
					}
				}else {
					updateProduct();
				}
			};

			$scope.addMedia = function() {
				$scope.hideSheet = $ionicActionSheet.show({
					buttons: [
						{text: 'Photo from library'}
					],
					titleText: 'Add images',
					cancelText: 'Cancel',
					buttonClicked: function(index) {
						if(index == 0) {
							$scope.hideSheet();
							selectImage();
						}
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
				options.params = {'directory' : 'uploads/img', 'fileName' : filename, 'userID' : userID};
				var ft = new FileTransfer();
				ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
					function(res) {
						//response filename image from destination uploads/img folder at server.
						console.log("Code = " + res.responseCode);
						console.log("Response = " + res.response);
						console.log("Sent = " + res.bytesSent);
						$scope.realImageName.push({
							realNameImg: res.response
						});
						if($scope.images.length == $scope.realImageName.length){
							updateProduct();
						}
					}, function(error) {
						alert("ไม่สามารถทำการอัพโหลดรูปภาพของคุณได้");
					    console.log("upload error source " + error.source);
					    console.log("upload error target " + error.target);
					}, options
				);
			};

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
	        };

	        dowloadImgIntoPackage = function(imageUriSource) {
	        	console.log('imageUri: ' + imageUriSource);
	        	//substring for choosed image in gallary after file name is xxxx(.jpg)
	        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
	        	//$scope.images.filename = filename;
	        	//console.log('Filename: ' + $scope.images.filename);
	        	//dowload image from device to app package because URI of image in device not working in preview.
	            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + filename, {}, true)
	                .then(function(fileEntry) {
	            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
	            		$scope.images.push({
							imageUri: fileEntry.nativeURL,
							filename: filename
						});
						console.log($scope.images);
						$scope.imgLength = $scope.images.length;
	                    // $scope.images.imageUri = fileEntry.nativeURL;
	                    // console.log('THEN: ' + $scope.images.imageUri);
	                }, function (error) {
	                    console.log(error);
	                }
	            );
	        };

			$scope.deletePicture = function(image){
				var hideSheet = $ionicActionSheet.show({
					titleText: 'Picture',
				    destructiveText: 'Delete',
				    cancelText: 'Cancel',
				    destructiveButtonClicked: function() {
						var index = $scope.images.indexOf(image);
						$scope.images.splice(index, 1);
						$scope.imgLength = $scope.images.length;
						return true;
				    }
				});
			};

			updateProduct = function(){
				if($scope.products.productStock == 'ไม่สต็อกสินค้า'){
					$scope.products.productAmount = '0';
				}
				$scope.products.idProfile = profileUser.profileID;
				$http
				.delete(urlService.getBaseUrl() + '/editProductImageDeletes', {params: {pId: $scope.products.primaryProduct}})
				.success(function(response) {
					var forImageData = {};
					$http
					.put(urlService.getBaseUrl() + '/updateProducts', $scope.products)
					.success(function(response) {
						if($scope.images.length > 0){
							for(var i=0; i<$scope.images.length; i++){
								forImageData = {
									product_id: $scope.products.primaryProduct,
									image: $scope.realImageName[i].realNameImg
								}
								$http
									.post(urlService.getBaseUrl() + '/insertImageProducts', forImageData)
									.success(function(response) {
										$state.go('app.showProducts', {}, {reload:true});
									})
							}
						}else{
							$state.go('app.showProducts', {}, {reload:true});
						}
					})
				})
			};
		});
	})