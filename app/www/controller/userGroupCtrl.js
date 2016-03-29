angular.module('starter.userGroupCtrl', [])


.controller('modalImageView', function($scope, $http, $ionicModal) {
	$scope.showModalImage = function(index) {
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
		$scope.modal.remove()
	};
})


.controller('ImageUserGroupCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, ImageService, FileService, urlService, $ionicActionSheet) {

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
		                	$scope.images.filename = filename;
		                	console.log('extension: ' + $scope.images.extension);
		                	console.log('Filename: ' + $scope.images.filename);
		                	upload(imageUri, filename);   
		                        $cordovaFileTransfer.download(imageUri, cordova.file.dataDirectory + $scope.images.filename, {}, true)
		                        .then(function(fileEntry) {
		                                $scope.images.imageUri.push({
		                                	path: fileEntry.nativeURL
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
			    buttonClicked: function(index) {
					if(index == 0){
						var index = $scope.images.imageUri.indexOf(image);
						$scope.images.imageUri.splice(index, 1);
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
			options.params = {'directory' : 'uploads/img', 'fileName' : filename};
			
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),

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
})