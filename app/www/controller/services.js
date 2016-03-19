angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://10.0.3.2:8100";
	};
})

.factory('Authen', function($cookieStore) {
	var _user = $cookieStore.get('starter.sessionUser');
	var setUser = function(user) {
		_user = user;
		$cookieStore.put('starter.sessionUser', _user);
	}

	return {
		setUser : setUser,
		isLoggedIn : function() {
			return _user ? true : false;
		},
		getUser : function() {
			return _user;
		},
		logout : function() {
			$cookieStore.remove('starter.sessionUser');
			_user = null;
		}
	}
})

//save file to LocalStorage for get URi render show image.
.factory('FileService', function() {
	var images;
	var IMAGE_STORAGE_KEY = 'images';

	function getImage() {

		var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);

		if(img) {
			images = JSON.parse(img);
		}else {
			images = "";
		}
		console.log('getImage: '+images);
		return images;
	};

	function addImage(img) {
		images = img;
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
	}

	return {
		storeImage: addImage,
		images: getImage
	}
})

//service of images
.factory('ImageService', function($cordovaCamera, $q, $cordovaFile, FileService) {
	function optionsForType(type) {
		var source;

		switch (type) {
			case 0:
				source = Camera.PictureSourceType.CAMERA;
				break;
			case 1:
				source = Camera.PictureSourceType.PHOTOLIBRARY;
				break;
		}

		return {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: source,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
	};

	function saveMedia(type) {
		//working on background
		return $q(function(reslove, reject) {
			var options = optionsForType(type);

			$cordovaCamera.getPicture(options).then(function(imageUrl) {
				console.log(imageUrl);
				var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
				var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
				var newName = name;
				console.log('new name: '+newName);
				$cordovaFileTransfer.download(fileUri, cordova.file.dataDirectory + 'my-image.jpg', {}, true)
					.then(function(fileEntry)
	                    {
	                        $scope.images.imageUri = fileEntry.nativeURL;
	                    },
	                    function (error)
	                    {
	                        console.log(error);
	                    }
	                );
			});
		})
	}

	return {
			handleMediaDialog: saveMedia
	}
});